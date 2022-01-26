import { Component, OnInit } from '@angular/core';
import { CarrosService } from '../../services/carros.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  carroForm = new FormGroup({
    patente: new FormControl('', Validators.required),
    compania: new FormControl(0, Validators.required),
    tipo_carro: new FormControl(0, Validators.required),
    marca: new FormControl(0, Validators.required),
    modelo: new FormControl(0, Validators.required),
    anio_fabricacion: new FormControl(null),
    siguiente_mantencion: new FormControl('', Validators.required),
    activo: new FormControl(true)
  });
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public listCompanias: any = []
  public listCarros: any = []
  public listTipos: any = []
  public listMarcas: any = []
  public listModelos: any = []
  public listModelosMarca: any = []
  public isLoading: boolean = true
  public actualUser: any
  public showMenu: boolean = true
  public modalReference: any = null
  public errorFormulario: any = false
  public mostrarFail: any = false
  public mostrarExito: any = false
  public errorMsg: string = ''


  constructor(private carroService: CarrosService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    this.obtenerCompanias()
    this.obtenerTipos()
    this.obtenerMarcas()
    this.obtenerModelos()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerCarros()
  }

  obtenerCompanias() {
    let token = localStorage.getItem('token') 

    this.carroService.obtenerCompanias(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listCompanias = v.data
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
    this.carroService.obtenerTipos(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listTipos = v.data
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerMarcas() {
    let token = localStorage.getItem('token') 
    this.carroService.obtenerMarcas(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listMarcas = v.data
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerModelos() {
    let token = localStorage.getItem('token') 
    this.carroService.obtenerModelos(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listModelos = v.data
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
    this.carroService.obtenerCarros(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listCarros = v.data
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
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

  onMarcaChange(marca: any) {
    this.listModelosMarca = []
    for (let i = 0; i < this.listModelos.length; i++) {
      if (this.listModelos[i].marca_id == marca)
        this.listModelosMarca.push({
          id : this.listModelos[i].id,
          nombre : this.listModelos[i].nombre,
          anio : this.listModelos[i].anio
        })
    }
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.carroService.validarToken(token).subscribe({
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

  limpiarFormulario() {
    this.carroForm = new FormGroup({
      patente: new FormControl('', Validators.required),
      compania: new FormControl(0, Validators.required),
      tipo_carro: new FormControl(0, Validators.required),
      marca: new FormControl(0, Validators.required),
      modelo: new FormControl(0, Validators.required),
      anio_fabricacion: new FormControl(null),
      siguiente_mantencion: new FormControl('', Validators.required),
      activo: new FormControl(true)
    });
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, this.ngbModalOptions)
  }

  onSubmit() {
    let token = localStorage.getItem('token') 

    const payload = {
      patente: this.carroForm.get('patente')?.value,
      compania: Number(this.carroForm.get('compania')?.value),
      tipo: Number(this.carroForm.get('tipo_carro')?.value),
      marca: Number(this.carroForm.get('marca')?.value),
      modelo: Number(this.carroForm.get('modelo')?.value),
      anio_fabricacion: this.carroForm.get('anio_fabricacion')?.value,
      siguiente_mantencion: this.carroForm.get('siguiente_mantencion')?.value,
      activo: true,
      usuario_rut: this.actualUser.rut
    }

    console.log(JSON.stringify(payload))
    if (this.carroForm.valid) {
      this.errorFormulario = false
      
      this.carroService.crearCarro(token == null ? '' : token, payload).subscribe({
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
