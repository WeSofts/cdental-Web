import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/shared/login/signin/signin.component';
import { SignupComponent } from './components/shared/login/signup/signup.component';
import { RecoveraccountComponent } from './components/shared/login/recoveraccount/recoveraccount.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HomeComponent } from './components/webApp/home/home.component';
import { CarnetsComponent } from './components/webApp/carnets/carnets.component';
import { RegistroComponent } from './components/webApp/pacientes/registro/registro.component';
import { InicioComponent } from './components/webApp/pacientes/inicio/inicio.component';
import { CotizacionesComponent } from './components/webApp/pacientes/cotizaciones/cotizaciones.component';
import { AgregarServicioComponent } from './components/webApp/pacientes/agregar-servicio/agregar-servicio.component';
import { NavbarComponent } from './components/webApp/pacientes/shared/navbar/navbar.component';
import { ReportesComponent } from './components/webApp/reportes/reportes.component';
import { ServiciosComponent } from './components/webApp/servicios/servicios.component';
import { HomeServiciosComponent } from './components/webApp/servicios/home-servicios/home-servicios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfig } from './config/point.config';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarServiciosComponent } from './components/webApp/servicios/registrar-servicios/registrar-servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    RecoveraccountComponent,
    SidebarComponent,
    HomeComponent,
    CarnetsComponent,
    RegistroComponent,
    InicioComponent,
    CotizacionesComponent,
    AgregarServicioComponent,
    NavbarComponent,
    ReportesComponent,
    ServiciosComponent,
    HomeServiciosComponent,
    RegistrarServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
