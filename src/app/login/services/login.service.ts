import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpoint: string = '/api/login'

  constructor(private http: HttpClient) { }

  iniciarSesion(payload: object){
    return this.http.post(this.endpoint, payload)
  }

}
