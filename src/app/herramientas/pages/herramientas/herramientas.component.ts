import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HerramientasService } from '../../services/herramientas.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  public actualUser: any
  public listHerramientas: any = []
  public isLoading: boolean = false
  public showMenu: boolean = true

  constructor(private herramientasService: HerramientasService, private route: Router) { }

  ngOnInit(): void {
    this.validarToken()
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

}
