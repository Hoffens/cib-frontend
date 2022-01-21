import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private endpoint: string = '/api/users'
  private endpointToken: string = '/api/validateToken'

  constructor(private http: HttpClient) { }

  obtenerUsuarios(token: string) {
    //let header = new HttpHeaders()
    //let token = JSON.stringify(localStorage.getItem('token'))
    //let xd = localStorage.getItem('token') 

    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }
}
