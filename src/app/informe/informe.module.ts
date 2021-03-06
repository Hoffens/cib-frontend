import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeComponent } from './pages/informe/informe.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    InformeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class InformeModule { }
