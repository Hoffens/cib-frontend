import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AdsService } from '../../services/ads.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  adsForm = new FormGroup({
    clasificacion: new FormControl('0', Validators.required),
    direccion: new FormControl('', Validators.required),
    estado: new FormControl(0, Validators.required),
    obac: new FormControl(0, Validators.required),
    fecha_hora: new FormControl('', Validators.required),
    activo: new FormControl(true),
  });

  public actualUser: any
  public listAds: any = []
  public listUsuarios: any = []
  public listClasificacion: any = []
  public listEstados: any = []
  public isLoading: boolean = true
  public showMenu: boolean = true
  public modalReference: any = null
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public errorFormulario: boolean = false
  public mostrarFail: boolean = false
  public mostrarExito: boolean = false
  public errorMsg: string = ''

  constructor(private adsService: AdsService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    this.obtenerAds()
    this.obtenerUsuarios()
    this.obtenerClasificacion()
    this.obtenerEstado()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.adsService.validarToken(token).subscribe({
        error: (e) => {
          this.route.navigate(['/404'])
        }
      })
    }
    else
    {
      this.route.navigate(['/404'])
    }
  }

  esconderMenu() {
    //this.showMenu ? this.showMenu = false : this.showMenu = true
    let sidebar = document.getElementById('sidebar')
    this.showMenu ? this.showMenu = false : this.showMenu = true
    /*
    if (this.showMenu) {
      if (sidebar != null)
          sidebar.setAttribute('style', 'margin-left: -250px;')
      this.showMenu = false
    }
    else
    {
      if (sidebar != null)
          sidebar.setAttribute('style', 'margin-left: 0;')
      this.showMenu = true
    }
    */
  }

  obtenerAds() {
    let token = localStorage.getItem('token') 

    this.adsService.obtenerAds(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listAds = v.data
        console.log(this.listAds)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerUsuarios() {
    let token = localStorage.getItem('token') 

    this.adsService.obtenerUsuarios(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listUsuarios = v.data
        console.log(this.listUsuarios)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerClasificacion() {
    let token = localStorage.getItem('token') 

    this.adsService.obtenerClasificacion(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listClasificacion = v.data
        console.log(this.listClasificacion)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerEstado() {
    let token = localStorage.getItem('token') 

    this.adsService.obtenerEstado(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listEstados = v.data
        console.log(this.listEstados)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, this.ngbModalOptions)
  }

  limpiarFormulario() {
    this.adsForm = new FormGroup({
      clasificacion: new FormControl('0', Validators.required),
      direccion: new FormControl('', Validators.required),
      estado: new FormControl(0, Validators.required),
      obac: new FormControl(0, Validators.required),
      fecha_hora: new FormControl('', Validators.required),
      activo: new FormControl(true),
    });
  }

  onSubmit() {
    let token = localStorage.getItem('token') 
    if (this.adsForm.valid) {
      this.errorFormulario = false
      const payload = {
        clasificacion: this.adsForm.get('clasificacion')?.value,
        direccion: this.adsForm.get('direccion')?.value,
        estado: Number(this.adsForm.get('estado')?.value),
        obac: Number(this.adsForm.get('obac')?.value),
        fecha_hora: this.adsForm.get('fecha_hora')?.value,
        activo: true,
        rut_usuario: this.actualUser.rut
      }

      console.log(JSON.stringify(payload))

      this.adsService.crearAds(token == null ? '' : token, payload).subscribe({
        next: (v: any) => {
          this.limpiarFormulario()
          this.mostrarFail = false
          this.mostrarExito = true
          this.modalReference.close()
        },
        error: (e: any) => {
          console.log(e)
          this.mostrarExito = false
          this.mostrarFail = true
          this.errorMsg = e.error.message
          this.modalReference.close()
        }
      })

    } else {
      this.errorFormulario = true
    }
  }

  closeErrorAlert() {
    this.mostrarFail = false
  }

  closeSuccessAlert() {
    this.mostrarExito = false
  }

  closeModalErrorAlert() {
    this.errorFormulario = false
  }

  onCancel() {
    this.limpiarFormulario()
    this.errorFormulario = false
    this.modalReference.close()
  }

}
