import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { Login2Component } from './auth/containers/login2/login2.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, data: { renderMode: 'ssr' } },
  { path: 'login', component: LoginComponent },
  { path: 'login2', component: Login2Component },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // ✅ Lazy Load correcto
  }
];
