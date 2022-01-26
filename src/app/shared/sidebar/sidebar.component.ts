import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.styles.css']
})
export class SidebarComponent implements OnInit {

  public actualUser: any

  constructor() { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }
}
