import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of, Observable, throwError} from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER_CURRENT = 'USER_CURRENT';
    private loggedUser: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        ) {}

        login(user: { correo: string, contrasena: string }): Observable<any> {
          console.log('Datos enviados al backend:', user); // Depuración
          return this.http.post<any>(`${environment.api.authApis}/usuarios/login`, user).pipe(
              tap(response => console.log('Respuesta del servidor:', response)),
              catchError(error => {
                  console.error('Error en el login:', error);
                  return throwError(error);
              })
          );
      }

      
      logout(): Observable<any> {
          return this.http.post<any>(`${environment.api.authApis}/logout`, {}).pipe(
              tap((response) => {
                  if (response && response.message === 'Cierre de sesión exitoso') {
                      this.doLogoutUser();
                      setTimeout(() => {
                          this.router.navigate(['/login']);
                      }, 800);
                  }
              }),
              catchError(error => {
                  this.doLogoutUser();
                  setTimeout(() => {
                      this.router.navigate(['/login']);
                  }, 800);
                  return throwError(error); // Repropagamos el error para que pueda ser manejado en un nivel superior
              })
          );
      }

      register(data: any): Observable<any> {
        const url = `${environment.api.authApis}/usuarios/registro`; // Asegúrate de que la URL sea correcta
        return this.http.post(url, data);
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    refreshToken(): Observable<any> {
      return this.http.post<any>(`${environment.api.authApis}/refresh`, {}).pipe(
          tap((tokens: any) => {
              this.storeJwtToken(tokens.token);
          })
      );
  }

    getJwtToken() {
      let token = localStorage.getItem(this.JWT_TOKEN);
      if (token){
        return token;
      }else{
        return '';
      }
    }

    doLoginUser(username: string, tokens: any) {
        this.loggedUser = username;
        this.storeTokens(tokens);
    }

    private doLogoutUser() {
        this.loggedUser = '';
        this.removeTokens();
    }


    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.JWT_TOKEN, tokens.token);
        localStorage.setItem(this.USER_CURRENT, JSON.stringify(tokens.user));
    }

    private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.USER_CURRENT);
    }

    consultarUsuarios(): Observable<any> {
      const url = `${environment.api.authApis}/usuarios/consultar`;
      return this.http.get(url);
    }
}
