import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AsistenciaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AsistenciaModule { }
