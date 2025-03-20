import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    
    // Excluir la solicitud de refresh token
    if (request.url.includes('/refresh-token')) {
      return next.handle(request);
    }
  
    const token = authService.getJwtToken();
    console.log('Token obtenido en el interceptor:', token); // Log para verificar el token
  
    if (token) {
      request = this.addToken(request, token);
      console.log('Encabezados de la solicitud después de agregar el token:', request.headers); // Log para verificar los encabezados
    }
  
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error en la solicitud HTTP:', error); // Log para capturar errores HTTP
        if (error.status === 401 && !request.url.includes('/refresh-token')) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const http = this.injector.get(HttpClient);

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = authService.getRefreshToken();
      
      return http.post<{ jwt: string }>('/api/refresh-token', { refreshToken }).pipe(
        tap((response) => {
          authService.setJwtToken(response.jwt);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.jwt);
        }),
        switchMap(() => {
          const newToken = authService.getJwtToken();
          return next.handle(this.addToken(request, newToken!));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt!));
        })
      );
    }
  }
}



