import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private endpoint: string = '/api/actos'
  private endpointToken: string = '/api/validateToken'

  constructor(private http: HttpClient) { }

  obtenerAds(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

}
