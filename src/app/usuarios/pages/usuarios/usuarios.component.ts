import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  userForm = new FormGroup({
    rut: new FormControl('', Validators.compose([Validators.pattern("^[0-9]+-[0-9kK]{1}$"), Validators.required]) ),
    password: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.required])),
    conf_password: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.required])),
    compania: new FormControl(0, Validators.required),
    rol: new FormControl(0, Validators.required),
    nombre: new FormControl(null, Validators.required),
    apellido_paterno: new FormControl('', Validators.required),
    apellido_materno: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    telefono: new FormControl(''),
    grupo_sanguineo: new FormControl(0),
    activo: new FormControl(true),
  });

  public listUsuarios: any = []
  public listRoles: any = []
  public listCompanias: any = []
  public listGrupoSanguineo: any = []
  public isLoading: boolean = true
  public actualUser: any
  public showMenu: boolean = true
  public showModal: boolean = false
  public ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    scrollable : true,
    size : 'lg'
  }
  public isInvalidPassword: boolean = false
  public crearUsuario: boolean = false
  public companiaUsuario: string = ''
  public mostrarExito: boolean = false
  public mostrarFail: boolean = false
  public errorMsg: string = ''
  public modalReference: any = null
  public errorFormulario: boolean = false
  public modalLoading: boolean = false


  constructor(private userService: UsuariosService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.validarToken()
    this.obtenerRoles()
    this.obtenerCompanias()
    this.obtenerGrupoSanguineo()
    let usuario = localStorage.getItem('usuario')
    this.actualUser = JSON.parse(usuario == null ? '' : usuario)
    this.actualUser.rol == 3 || this.actualUser.rol == 7 ? this.crearUsuario = true : this.crearUsuario = false
    this.obtenerUsuarios()
  }

  obtenerUsuarios() {
    let token = localStorage.getItem('token') 
    this.userService.obtenerUsuarios(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        this.listUsuarios = v.data
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  esconderMenu() {
    //this.showMenu ? this.showMenu = false : this.showMenu = true
    let sidebar = document.getElementById('sidebar')
    this.showMenu ? this.showMenu = false : this.showMenu = true
    /*
    if (this.showMenu) {
      if (sidebar != null)
          sidebar.setAttribute('style', 'margin-left: -250px;')
      this.showMenu = false
    }
    else
    {
      if (sidebar != null)
          sidebar.setAttribute('style', 'margin-left: 0;')
      this.showMenu = true
    }
    */
  }

  validarToken() {
    let token = localStorage.getItem('token')
    if (token) {
      this.userService.validarToken(token).subscribe({
        error: () => {
          this.route.navigate(['/404'])
        }
      })
    }
    else
    {
      this.route.navigate(['/404'])
    }
  }

  obtenerRoles() {
    let token = localStorage.getItem('token') 
    this.userService.obtenerRoles(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        if (this.actualUser.rol == 3) {
          this.listRoles = v.data.splice(1, v.data.length)
        } else if (this.actualUser.rol == 7) {
          this.listRoles = v.data.splice(4, v.data.length)           
        }
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerCompanias() {
    let token = localStorage.getItem('token') 
    this.userService.obtenerCompanias(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        if (this.actualUser.rol == 3) {
          this.listCompanias = v.data
        } else if (this.actualUser.rol == 7) {
          for (let i = 0; i < v.data.length; i++) 
          {
            if (v.data[i].numero == this.actualUser.compania) {
              this.listCompanias = [v.data[i]]
              break
            } 
          }
        }
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  obtenerGrupoSanguineo() {
    let token = localStorage.getItem('token') 
    this.userService.obtenerGrupoSanguineo(token == null ? '' : token).subscribe({
      next: (v: any) => { 
        console.log(v.data)
        this.listGrupoSanguineo = v.data
        this.isLoading = false
      },
      error: (e) => {
        console.log(e)
        this.isLoading = false
      }
    })
  }

  open(content: any, isEdit: boolean) {
    this.modalReference = this.modalService.open(content, this.ngbModalOptions)
    /*
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('xd');
    });
    */
  }

  onChangeCompania() {
    this.userForm.get('compania')?.value == 0 ? this.userForm.get('compania')?.setErrors : console.log('ok')
  }

  onChangePass() {
    this.userForm.get('password')?.value != this.userForm.get('conf_password')?.value ? this.isInvalidPassword = true : this.isInvalidPassword = false
    console.log(this.isInvalidPassword)
  }

  onSubmit() {
    let rutFormateado = this.userForm.get('rut')?.value
    let token = localStorage.getItem('token') 
    let grupoS = Number(this.userForm.get('grupo_sanguineo')?.value) == 0 ? '' : Number(this.userForm.get('grupo_sanguineo')?.value)
    
    if (this.userForm.valid) {
      this.modalLoading = true
      this.errorFormulario = false
      const payload = {
        rut : Number(rutFormateado.slice(0, rutFormateado.length - 2)),
        password : this.userForm.get('password')?.value,
        compania : Number(this.userForm.get('compania')?.value),
        rol : Number(this.userForm.get('rol')?.value),
        nombre : this.userForm.get('nombre')?.value,
        apellido_paterno : this.userForm.get('apellido_paterno')?.value,
        apellido_materno : this.userForm.get('apellido_materno')?.value,
        fecha_nacimiento : this.userForm.get('fecha_nacimiento')?.value,
        correo : this.userForm.get('correo')?.value,
        telefono : this.userForm.get('telefono')?.value,
        fecha_ingreso : this.userForm.get('fecha_ingreso')?.value,
        grupo_sanguineo : grupoS,
        activo : this.userForm.get('activo')?.value,
        rut_cuenta : Number(this.actualUser.rut)
      }

      console.log(JSON.stringify(payload))

      this.userService.crearUsuario(token == null ? '' : token, payload).subscribe({
        next: (v: any) => {
          this.limpiarFormulario()
          this.mostrarFail = false
          this.mostrarExito = true
          this.modalReference.close()
        },
        error: (e: any) => {
          console.log(e)
          this.mostrarExito = false
          this.mostrarFail = true
          this.errorMsg = e.error.message
          this.modalReference.close()
        }
      })
    } else {
      this.errorFormulario = true
    }
    this.modalLoading = false
  }

  limpiarFormulario() {
    this.userForm = new FormGroup({
      rut: new FormControl('', Validators.compose([Validators.pattern("^[0-9]+-[0-9kK]{1}$"), Validators.required]) ),
      password: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.required])),
      conf_password: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.required])),
      compania: new FormControl(0, Validators.required),
      rol: new FormControl(0, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellido_paterno: new FormControl('', Validators.required),
      apellido_materno: new FormControl('', Validators.required),
      fecha_nacimiento: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      telefono: new FormControl(''),
      grupo_sanguineo: new FormControl(0),
      activo: new FormControl(true),
    });
  }

  closeErrorAlert() {
    this.mostrarFail = false
  }

  closeSuccessAlert() {
    this.mostrarExito = false
  }

  closeModalErrorAlert() {
    this.errorFormulario = false
  }

  onCancel() {
    this.limpiarFormulario()
    this.modalReference.close()
  }

  onUserEdit(rut: string) {
    console.log(rut)
  }

}
