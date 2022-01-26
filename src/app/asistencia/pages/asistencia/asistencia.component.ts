import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  public listAsistencia: any = []
  public listAds: any = []
  public asiUsu: any = []
  public showMenu: boolean = true
  public actualUser: any
  public isLoading: boolean = false

  constructor(private asistenciaService: AsistenciaService, private route: Router) { }

  ngOnInit(): void {
    this.validarToken()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerAsistencia()
    this.obtenerAds()
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.asistenciaService.validarToken(token).subscribe({
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

  obtenerAsistencia() {
    let token = localStorage.getItem('token')

    this.asistenciaService.obtenerAsistencia(token == null ? '' : token, this.actualUser.rut).subscribe({
      next: (v: any) => { 
        this.listAsistencia = v.data
        console.log(this.listAsistencia)
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerAds() {
    let token = localStorage.getItem('token')

    this.asistenciaService.obtenerAds(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listAds = v.data
        for (let i = 0; i < this.listAsistencia.length; i++) {
          for (let j = 0; j < this.listAds.length; j++) {
            if (this.listAds[j].id == this.listAsistencia[i].acto_de_servicio) {
              this.asiUsu.push(this.listAds[j])
            }
          }
        }
        
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

}
