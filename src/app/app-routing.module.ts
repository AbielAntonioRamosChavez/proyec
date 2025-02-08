import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './auth/containers/login/login.component';
import {AdminComponent} from './admin/admin.component';
import {RandomGuard} from './auth/guards/random.guard';
import { register } from 'module';
import { RegisterComponent } from './auth/containers/register/register.component';

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
    path: 'pages',
    loadChildren: ()=> import('./admin/admin.module').then( m => m.AdminModule ),
    canActivate: [RandomGuard],
    canLoad: [RandomGuard],
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
