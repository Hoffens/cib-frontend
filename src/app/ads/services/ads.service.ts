import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private endpoint: string = '/api/actos'
  private endpointToken: string = '/api/validateToken'
  private endpointEstado: string = '/api/acto_estado'
  private endpointClasificacion: string = '/api/clasificacion_acto'
  private endpointUsuarios: string = '/api/usuarios'
  private endpointCrearActo: string = '/api/acto'



  constructor(private http: HttpClient) { }

  obtenerAds(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  obtenerEstado(token: string) {
    return this.http.get(this.endpointEstado, { headers: {'Authorization' : token} })
  }

  obtenerClasificacion(token: string) {
    return this.http.get(this.endpointClasificacion, { headers: {'Authorization' : token} })
  }

  obtenerUsuarios(token: string) {
    return this.http.get(this.endpointUsuarios, { headers: {'Authorization' : token} })
  }

  crearAds(token: string, payload: any) {
    return this.http.post(this.endpointCrearActo, payload, { headers: {'Authorization' : token} })
  }

  actualizarAds(token: string, payload: any) {
    return this.http.put(this.endpointCrearActo, payload, { headers: {'Authorization' : token} })
  }

}
