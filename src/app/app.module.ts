import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CompaniasModule } from './companias/companias.module';
import { CarrosModule } from './carros/carros.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HerramientasModule } from './herramientas/herramientas.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    SharedModule,
    DashboardModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    UsuariosModule,
    CompaniasModule,
    CarrosModule,
    NgbModule,
    ReactiveFormsModule,
    HerramientasModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
