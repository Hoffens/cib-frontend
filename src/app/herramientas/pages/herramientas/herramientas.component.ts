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
