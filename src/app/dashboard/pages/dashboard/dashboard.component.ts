import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adsForm = new FormGroup({
    acto_de_servicio: new FormControl(0, Validators.required)
  });

  public listUsuarios: any = []
  public listAds: any = []
  public isLoading: boolean = true
  public actualUser: any
  public showMenu: boolean = true
  public showModal: boolean = false
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public modalReference: any = null
  public errorFormulario: boolean = false;
  public mostrarFail: boolean = false;
  public mostrarExito: boolean = false;
  public errorMsg: string = ''


  constructor(private dashboardService: DashboardService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    this.obtenerAds()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    //this.obtenerUsuarios()
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

    this.dashboardService.obtenerADS(token == null ? '' : token).subscribe({
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

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.dashboardService.validarToken(token).subscribe({
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

  open(content: any) {
    this.modalReference = this.modalService.open(content, this.ngbModalOptions)
  }

  limpiarFormulario() {
    this.adsForm = new FormGroup({
      acto_de_servicio: new FormControl(0, Validators.required)
    });
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

  onSubmit() {
    let token = localStorage.getItem('token') 

    if (this.adsForm.valid) {
      this.errorFormulario = false
      const payload = {
        rut : Number(this.actualUser.rut),
        acto_de_servicio: Number(this.adsForm.get('acto_de_servicio')?.value)
      }
      console.log(JSON.stringify(payload))

      this.dashboardService.registrarAsistencia(token == null ? '' : token, payload).subscribe({
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

  onCancel() {
    this.limpiarFormulario()
    this.modalReference.close()
  }

}
