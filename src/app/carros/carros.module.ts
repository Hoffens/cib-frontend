import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrosComponent } from './pages/carros/carros.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CarrosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CarrosModule { }
