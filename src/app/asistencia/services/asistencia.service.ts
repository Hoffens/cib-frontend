import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private endpointToken: string = '/api/validateToken'
  private endpointAsistencia: string = '/api/asistencia_usuario'
  private endpointAds: string = '/api/actos'

  constructor(private http: HttpClient) { }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  obtenerAsistencia(token: string, rut: Number) {
    return this.http.get(this.endpointAsistencia + '/' + rut, { headers: {'Authorization' : token} })
  }

  obtenerAds(token: string) {
    return this.http.get(this.endpointAds, { headers: {'Authorization' : token} })
  }

}
