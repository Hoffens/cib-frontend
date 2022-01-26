import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private endpoint: string = '/api/carros'
  private endpointToken: string = '/api/validateToken'
  private endpointMarca: string = '/api/marcas_carros'
  private endpointModelo: string = '/api/modelos_carros'
  private endpointCompanias: string = '/api/companias'
  private endpointTipoCarro: string = '/api/tipos_carro'
  private endpointCrearCarro: string = '/api/carro'


  constructor(private http: HttpClient) { }

  obtenerCarros(token: string) {
    return this.http.get(this.endpoint, { headers: {'Authorization' : token} })
  }

  obtenerCompanias(token: string) {
    return this.http.get(this.endpointCompanias, { headers: {'Authorization' : token} })
  }

  obtenerTipos(token: string) {
    return this.http.get(this.endpointTipoCarro, { headers: {'Authorization' : token} })
  }

  obtenerMarcas(token: string) {
    return this.http.get(this.endpointMarca, { headers: {'Authorization' : token} })
  }

  obtenerModelos(token: string) {
    return this.http.get(this.endpointModelo, { headers: {'Authorization' : token} })
  }

  validarToken(token: string) {
    return this.http.get(this.endpointToken, { headers: {'Authorization' : token} })
  }

  crearCarro(token: string, payload: any) {
    return this.http.post(this.endpointCrearCarro, payload, { headers: {'Authorization' : token} })
  }
}
