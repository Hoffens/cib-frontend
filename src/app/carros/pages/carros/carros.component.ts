import { Component, OnInit } from '@angular/core';
import { CarrosService } from '../../services/carros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  public listCarros: any = []
  public isLoading: boolean = true
  public actualUser: any
  public showMenu: boolean = true

  constructor(private carroService: CarrosService, private route: Router) { }

  ngOnInit(): void {
    this.validarToken()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerCarros()
  }

  obtenerCarros() {
    let token = localStorage.getItem('token') 
    this.carroService.obtenerCarros(token == null ? '' : token).subscribe({
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

}
