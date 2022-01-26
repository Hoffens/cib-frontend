import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  public actualUser: any
  public listAds: any = []
  public isLoading: boolean = true
  public showMenu: boolean = true

  constructor(private adsService: AdsService, private route: Router) { }

  ngOnInit(): void {
    this.validarToken()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.obtenerAds()
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.adsService.validarToken(token).subscribe({
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

  obtenerAds() {
    let token = localStorage.getItem('token') 

    this.adsService.obtenerAds(token == null ? '' : token).subscribe({
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

}
