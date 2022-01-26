import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  private endpoint: string = '/api/inf_tec'
  private endpointToken: string = '/api/validateToken'
  private endpointImagenes: string = '/api/informe_imagen'


  constructor(private http: HttpClient) { }

  obtenerInformes(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  obtenerImagenes(token: string) {
    return this.http.get(this.endpointImagenes, { headers: {'Authorization' : token} })
  }

}
