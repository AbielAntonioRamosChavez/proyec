import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { AgregarusuarioComponent } from './admin/pages/catalogos/agregarusuario/agregarusuario.component';
import { PuntodeventaComponent } from './admin/pages/catalogos/puntodeventa/puntodeventa.component';
import { Login2Component } from './auth/containers/login2/login2.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login2',
    component: Login2Component
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

