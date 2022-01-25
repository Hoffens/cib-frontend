import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private endpoint: string = '/api/usuarios'
  private endpointToken: string = '/api/validateToken'
  private endpointRoles: string = '/api/roles'
  private endpointsCompanias: string = '/api/companias'
  private endpointCrearUser: string = '/api/usuario'

  constructor(private http: HttpClient) { }

  obtenerUsuarios(token: string) {
    //let header = new HttpHeaders()
    //let token = JSON.stringify(localStorage.getItem('token'))
    //let xd = localStorage.getItem('token') 

    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  obtenerRoles(token: string) {
    return this.http.get(this.endpointRoles, { headers: {'Authorization' : token} })
  }

  obtenerCompanias(token: string) {
    return this.http.get(this.endpointsCompanias, { headers: {'Authorization' : token} })
  }

  crearUsuario(token: string, payload: any) {
    console.log(payload)
    return this.http.post<any>(this.endpointCrearUser, payload, { headers: {'Authorization' : token} })
  }

}
