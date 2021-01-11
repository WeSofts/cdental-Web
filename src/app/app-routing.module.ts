import { CotizacionesComponent } from './components/webApp/pacientes/cotizaciones/cotizaciones.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/shared/login/signin/signin.component';
import { SignupComponent } from './components/shared/login/signup/signup.component';
import { RecoveraccountComponent } from './components/shared/login/recoveraccount/recoveraccount.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HomeComponent } from './components/webApp/home/home.component';
import { CarnetsComponent } from './components/webApp/carnets/carnets.component';
import { NavbarComponent } from './components/webApp/pacientes/shared/navbar/navbar.component';
import { AgregarServicioComponent } from './components/webApp/pacientes/agregar-servicio/agregar-servicio.component';
import { RegistroComponent } from './components/webApp/pacientes/registro/registro.component';
import { InicioComponent } from './components/webApp/pacientes/inicio/inicio.component';
import { ReportesComponent } from './components/webApp/reportes/reportes.component';
import { ServiciosComponent } from './components/webApp/servicios/servicios.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeServiciosComponent } from './components/webApp/servicios/home-servicios/home-servicios.component';
import { RegistrarServiciosComponent } from './components/webApp/servicios/registrar-servicios/registrar-servicios.component';

const routes: Routes = [
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'recover', component: RecoveraccountComponent
  },
  {
    path: 'cdental', component: SidebarComponent, canActivate: [ AuthGuard ], children: [
      {
        path: 'home', component: HomeComponent, children: [
          {
            path: 'carnets', component: CarnetsComponent
          },
          {
            path: 'pacientes', component: NavbarComponent
          },
          {
            path: 'reportes', component: ReportesComponent
          },
        ]
      },
      {
        path: 'carnets', component: CarnetsComponent
      },
      {
        path: 'pacientes', component: NavbarComponent, children: [
          {
            path: 'agregar', component: AgregarServicioComponent
          },
          {
            path: 'cotizaciones', component: CotizacionesComponent
          },
          {
            path: 'registro', component: RegistroComponent
          },
          {
            path: 'home', component: InicioComponent
          },
        ]
      },
      {
        path: 'reportes', component: ReportesComponent
      },
      {
        path: 'servicios', component: ServiciosComponent, children: [
          {
            path: 'allservices', component: HomeServiciosComponent
          },
          {
            path: 'registro', component: RegistrarServiciosComponent
          },
        ]
      },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'signin' },
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
