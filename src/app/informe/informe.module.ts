import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeComponent } from './pages/informe/informe.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InformeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InformeModule { }
