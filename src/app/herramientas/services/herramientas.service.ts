import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  private endpoint: string = '/api/herramientas'
  private endpointToken: string = '/api/validateToken'


  constructor(private http: HttpClient) { }

  obtenerHerramientas(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

}
