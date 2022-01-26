import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private endpointToken: string = '/api/validateToken'
  private endpointAds: string = '/api/actos'
  private endpointAsistencia: string = '/api/asistencia_usuario'

  constructor(private http: HttpClient) { }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  obtenerADS(token: string) {
    return this.http.get(this.endpointAds, { headers: {'Authorization' : token} })
  }

  registrarAsistencia(token: string, payload: any) {
    return this.http.post(this.endpointAsistencia, payload, { headers: {'Authorization' : token} })
  }

}
