import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniasComponent } from './pages/companias/companias.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CompaniasComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CompaniasModule { }
