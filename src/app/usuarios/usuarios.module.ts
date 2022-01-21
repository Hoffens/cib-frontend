import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UsuariosComponent
  ],
  exports: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsuariosModule { }
