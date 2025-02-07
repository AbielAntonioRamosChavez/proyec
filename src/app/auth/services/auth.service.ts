import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

interface LoginResponse {
  message?: string;
  token: string;
  user: {
    id: number;
    correo: string;
    nombre: string;
    tipo?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly JWT_TOKEN = 'JWT_TOKEN';
  public readonly USER_CURRENT = 'USER_CURRENT';
  private loggedUser: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${environment.api.authApis}/usuarios/login`, user).pipe(
      tap((response) => {
        if (!response.user || !response.token) {
          throw new Error('Respuesta inválida del servidor');
        }
        this.doLoginUser(response.user.correo, response);
      }),
      catchError((error) => throwError(() => this.handleAuthError(error)))
    );
  }

  private handleAuthError(error: any): string {
    console.error('Error en autenticación:', error);
    return error.error?.message || 'Error desconocido en el servidor';
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.api.authApis}/usuarios/logout`, {}).pipe(
      tap(() => {
        this.doLogoutUser();
        this.redirectToLogin();
      }),
      catchError((error) => {
        this.doLogoutUser();
        this.redirectToLogin();
        return throwError(() => error);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.api.authApis}/usuarios/register`, data);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${environment.api.authApis}/usuarios/refresh`, {}).pipe(
      tap((response: any) => {
        this.storeJwtToken(response.token);
        if (response.user) {
          localStorage.setItem(this.USER_CURRENT, JSON.stringify(response.user));
        }
      })
    );
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }

  doLoginUser(username: string, tokens: any): void {
    this.loggedUser = username;
    this.storeTokens(tokens);
    console.log('Datos almacenados:', tokens);
  }

  doLogoutUser(): void {
    this.loggedUser = '';
    this.removeTokens();
    localStorage.clear();
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any): void {
    if (!tokens.token || !tokens.user) {
      console.error('Estructura de tokens inválida:', tokens);
      throw new Error('Estructura de tokens inválida');
    }
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.USER_CURRENT, JSON.stringify(tokens.user));
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USER_CURRENT);
  }

  private redirectToLogin(): void {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 800);
  }

  getUserData(): any {
    const userData = localStorage.getItem(this.USER_CURRENT);
    return userData ? JSON.parse(userData) : null;
  }
}