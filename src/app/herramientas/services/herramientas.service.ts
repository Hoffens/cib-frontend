import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  private endpoint: string = '/api/herramientas'
  private endpointToken: string = '/api/validateToken'
  private endpointCompanias: string = '/api/companias'
  private endpointCarros: string = '/api/carros'
  private endpointTipo: string = '/api/tipos_de_herramientas'
  private endpointCrear: string = '/api/herramienta'


  constructor(private http: HttpClient) { }

  obtenerHerramientas(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  obtenerCompanias(token: string) {
    return this.http.get(this.endpointCompanias, { headers: {'Authorization' : token} })
  }

  obtenerCarros(token: string) {
    return this.http.get(this.endpointCarros, { headers: {'Authorization' : token} })
  }

  obtenerTipo(token: string) {
    return this.http.get(this.endpointTipo, { headers: {'Authorization' : token} })
  }

  crearHerramienta(token: string, payload: any) {
    return this.http.post(this.endpointCrear, payload, { headers: {'Authorization' : token} })
  }

}
