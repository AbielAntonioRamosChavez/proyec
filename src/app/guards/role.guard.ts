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
    const user = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as Array<string>;
    
    // Usar rol_nombre en lugar de rol
    if (allowedRoles.includes(user.rol_nombre)) {
      return true;
    } else {
      this.router.navigate(['/landing']);
      return false;
    }
  }
}