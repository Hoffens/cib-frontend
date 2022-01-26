import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CompaniasService {

  private endpoint: string = '/api/companias'
  private endpointCrearCompania: string = '/api/compania'
  private endpointToken: string = '/api/validateToken'

  constructor(private http: HttpClient) { }

  obtenerCompanias(token: string) {

    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  crearCompania(token: string, payload: any) {
    return this.http.post(this.endpointCrearCompania, payload, { headers: {'Authorization' : token} })
  }
}
