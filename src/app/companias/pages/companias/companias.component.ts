import { Component, OnInit } from '@angular/core';
import { CompaniasService } from '../../services/companias.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.css']
})
export class CompaniasComponent implements OnInit {

  companiaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    activo: new FormControl(true),
  });

  public listCompanias: any = []
  public isLoading: boolean = true
  public actualUser: any
  public showMenu: boolean = true
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public modalReference: any = null
  public errorFormulario: any = false
  public mostrarExito: boolean = false
  public mostrarFail: boolean = false
  public errorMsg: string = ''
  

  constructor(private companiaService: CompaniasService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerCompanias()
  }

  obtenerCompanias() {
    let token = localStorage.getItem('token') 

    this.companiaService.obtenerCompanias(token == null ? '' : token).subscribe({
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

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.companiaService.validarToken(token).subscribe({
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
    this.companiaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      activo: new FormControl(true),
    });
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content, this.ngbModalOptions)
  }

  onSubmit() {
    let token = localStorage.getItem('token') 
    const payload = {
      nombre: this.companiaForm.get('nombre')?.value,
      ubicacion: this.companiaForm.get('ubicacion')?.value,
      telefono: this.companiaForm.get('telefono')?.value,
      activo: true,
      rut_cuenta: this.actualUser.rut
    }

    console.log(JSON.stringify(payload))
 
    if (this.companiaForm.valid) {
      this.companiaService.crearCompania(token == null ? '' : token, payload).subscribe({
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

  onCancel() {
    this.limpiarFormulario()
    this.errorFormulario = false
    this.modalReference.close()
  }

  closeModalErrorAlert() {
    this.errorFormulario = false
  }

}
