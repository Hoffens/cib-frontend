import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./styles.css']
})
export class LoginComponent implements OnInit {

  public rutFormateado: string = ''
  public rut: number = 20446987
  public password: string = ''
  public respuesta: any
  public error: boolean = false
  public errorMsg: string = ''
  public isLoading: boolean = false


  constructor(private loginService: LoginService, private route: Router) { }


  ngOnInit(): void {
    
  }

  formatoValidoRut(event: any) {
    // si rutFormateado es valido hacemos que rut = rutFormateado 
    this.rutFormateado = event.target.value
    console.log(this.rutFormateado)
  }

  login() {
    this.isLoading = true
    // si el rut y la password son validos iniciamos sesion
    let response = this.loginService.iniciarSesion({
      'user' : this.rut,
      'password' : this.password
    })
    
    response.subscribe({
      next: (v) => { 
        this.respuesta = v
        localStorage.setItem('token', this.respuesta.token)   // inicio exitoso, guardamos el token
        localStorage.setItem('usuario', JSON.stringify(this.respuesta.data))   // inicio exitoso, guardamos el token
        this.error = false
        this.isLoading = false
        this.route.navigate(['/users'])
      },
      error: (e) => {
        this.errorMsg = e.error.message
        this.error = true
        this.isLoading = false
      }
    })
  }

}
