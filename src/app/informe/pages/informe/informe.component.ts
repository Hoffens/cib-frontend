import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformeService } from '../../services/informe.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css'],
})
export class InformeComponent implements OnInit {

  public actualUser: any
  public listInformes: any = []
  public listImagenes: any = []
  public informeImagen: any = []
  public isLoading: boolean = true
  public showMenu: boolean = true
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public modalReference: any = null


  constructor(private informeService: InformeService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    if (this.actualUser.rol != 5 && this.actualUser.rol != 2)
      this.route.navigate(['/404'])
    this.obtenerInformes()
    this.obtenerImagenes()
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.informeService.validarToken(token).subscribe({
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

  obtenerInformes() {
    let token = localStorage.getItem('token') 

    this.informeService.obtenerInformes(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listInformes = v.data
        console.log(this.listInformes)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerImagenes() {
    let token = localStorage.getItem('token') 

    this.informeService.obtenerImagenes(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listImagenes = v.data
        console.log(this.listImagenes)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  verImagenes(informe: any) {
    this.informeImagen = []
    for (let i = 0; i < this.listImagenes.length; i++) {
      if (this.listImagenes[i].id_informe == informe.codigo)
        this.informeImagen.push(this.listImagenes[i])
    }
  }

  open(content: any, informe: any) {
    this.verImagenes(informe)
    this.modalReference = this.modalService.open(content, this.ngbModalOptions)
  }

  onCancel() {
    this.modalReference.close()
  }

}
