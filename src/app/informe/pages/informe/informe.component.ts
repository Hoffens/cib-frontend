import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformeService } from '../../services/informe.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  public actualUser: any
  public listInformes: any = []
  public isLoading: boolean = true
  public showMenu: boolean = true

  constructor(private informeService: InformeService, private route: Router) { }

  ngOnInit(): void {
    this.validarToken()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerInformes()
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

}
