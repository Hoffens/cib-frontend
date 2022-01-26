import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HerramientasService } from '../../services/herramientas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  herramientaForm = new FormGroup({
    serie: new FormControl('', Validators.required),
    compania: new FormControl(0, Validators.required),
    carro: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    tipo: new FormControl(0, Validators.required),
    activo: new FormControl(true)
  });

  public actualUser: any
  public listHerramientas: any = []
  public listCompanias: any = []
  public listCarros: any = []
  public listTipos: any = []
  public isLoading: boolean = true
  public showMenu: boolean = true
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public modalReference: any = null
  public errorFormulario: boolean = false
  public mostrarFail: boolean = false
  public mostrarExito: boolean = false
  public errorMsg: string = ''


  constructor(private herramientasService: HerramientasService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    this.obtenerCompanias()
    this.obtenerCarros()
    this.obtenerTipos()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerHerramientas()
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.herramientasService.validarToken(token).subscribe({
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

  obtenerHerramientas() {
    let token = localStorage.getItem('token') 

    this.herramientasService.obtenerHerramientas(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listHerramientas = v.data
        console.log(this.listHerramientas)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerCompanias() {
    let token = localStorage.getItem('token') 

    this.herramientasService.obtenerCompanias(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listCompanias = v.data
        console.log(this.listCompanias)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerCarros() {
    let token = localStorage.getItem('token') 

    this.herramientasService.obtenerCarros(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listCarros = v.data
        console.log(this.listCarros)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerTipos() {
    let token = localStorage.getItem('token') 

    this.herramientasService.obtenerTipo(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listTipos = v.data
        console.log(this.listTipos)
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
    this.herramientaForm = new FormGroup({
      serie: new FormControl('', Validators.required),
      compania: new FormControl(0, Validators.required),
      carro: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      tipo: new FormControl(0, Validators.required),
      activo: new FormControl(true)
    });
  }

  onSubmit() {
    let token = localStorage.getItem('token') 
    if (this.herramientaForm.valid) {
      this.errorFormulario = false

      const payload = {
        serie: this.herramientaForm.get('serie')?.value,
        compania: Number(this.herramientaForm.get('compania')?.value),
        carro: this.herramientaForm.get('carro')?.value,
        nombre: this.herramientaForm.get('nombre')?.value,
        descripcion: this.herramientaForm.get('descripcion')?.value,
        tipo: Number(this.herramientaForm.get('tipo')?.value),
        activo: true,
        rut_cuenta: this.actualUser.rut
      }

      console.log(JSON.stringify(payload))

      this.herramientasService.crearHerramienta(token == null ? '' : token, payload).subscribe({
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
