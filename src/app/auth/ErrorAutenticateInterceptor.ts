import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppService } from '../../app/app.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorAutenticateInterceptor implements HttpInterceptor {

    constructor(private router: Router, private _globalService: AppService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error("❌ Interceptor detectó error:", error);

                if (error.status === 401) {
                    this._globalService.showAlert.next({
                        msj: `⚠️ Tu sesión ha expirado. Redirigiéndote al inicio de sesión...`,
                        type: 'danger'
                    });
                    this.removeAuthData();
                    this.router.navigate(['/login']);  // Redirigir inmediatamente
                } 
                else if (error.status === 403) {
                    this._globalService.showAlert.next({
                        msj: `⛔ No tienes permisos para esta acción.`,
                        type: 'warning'
                    });
                } 
                else if (error.status >= 500) {
                    this._globalService.showAlert.next({
                        msj: `🔥 Error del servidor. Inténtalo más tarde.`,
                        type: 'danger'
                    });
                }

                return throwError(() => error);
            })
        );
    }

    private removeAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('USER_CURRENT');
    }
}

