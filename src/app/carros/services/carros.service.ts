import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private endpoint: string = '/api/carros'
  private endpointToken: string = '/api/validateToken'

  constructor(private http: HttpClient) { }

  obtenerCarros(token: string) {
    //let header = new HttpHeaders()
    //let token = JSON.stringify(localStorage.getItem('token'))
    //let xd = localStorage.getItem('token') 

    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }
}
