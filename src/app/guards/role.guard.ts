import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser(); // Método que obtiene el usuario logueado

    if (!user) {
      this.router.navigate(['/login']); // Si no hay usuario, redirige al login
      return false;
    }

    const allowedRoles = route.data['roles'] as Array<string>; // Obtiene roles permitidos desde la ruta

    if (allowedRoles.includes(user.rol)) {
      return true; // Si el rol del usuario está permitido, deja pasar
    } else {
      this.router.navigate(['/landing']); // Si no tiene permiso, lo redirige
      return false;
    }
  }
}

