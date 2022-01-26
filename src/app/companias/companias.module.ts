import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniasComponent } from './pages/companias/companias.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompaniasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompaniasModule { }
