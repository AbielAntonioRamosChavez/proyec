import { ServerRoute } from '@angular/ssr';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/containers/login/login.component';

export const routes: ServerRoute[] = [
  { path: '', redirectTo: '/landing', pathMatch: 'full', renderMode: 'ssr' },
  { path: 'landing', component: LandingComponent, renderMode: 'ssr' },
  { path: 'login', component: LoginComponent, renderMode: 'ssr' },
];
