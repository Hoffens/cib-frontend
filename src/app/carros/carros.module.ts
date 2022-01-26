import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrosComponent } from './pages/carros/carros.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarrosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CarrosModule { }
