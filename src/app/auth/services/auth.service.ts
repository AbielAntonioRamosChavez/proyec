import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of, Observable, throwError} from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private usuarios = new BehaviorSubject<any[]>([]);
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER_CURRENT = 'USER_CURRENT';
    private loggedUser: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        ) {
            this.cargarUsuarios();
        }

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
        const url = `${environment.api.authApis}/usuarios/registro`;
    
        console.log('📡 Enviando datos a:', url);
        console.log('📦 Datos enviados:', data);
    
        return this.http.post(url, data).pipe(
            tap((response) => {
                console.log('✅ Usuario registrado:', response);
    
                // 🔹 Agrega el nuevo usuario a la lista local
                this.usuarios.next([...this.usuarios.getValue(), response]);
    
                // 🔹 Llama a cargarUsuarios() por seguridad (aunque ya lo agregamos localmente)
                this.cargarUsuarios(); 
            }),
            catchError((error) => {
                console.error('❌ Error al registrar usuario:', error);
                
                let mensajeError = 'Ocurrió un error al registrar el usuario.';
                if (error.status === 400) {
                    mensajeError = '⚠️ El correo ya está registrado.';
                } else if (error.status === 500) {
                    mensajeError = '⚠️ Error interno del servidor.';
                }
    
                return throwError(() => new Error(mensajeError));
            })
        );
    
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


    private cargarUsuarios() {
        this.consultarUsuarios().subscribe(
            (usuarios) => {
                console.log('📡 Usuarios cargados desde la API:', usuarios);
                this.usuarios.next(usuarios);
            },
            (error) => {
                console.error('❌ Error al cargar usuarios:', error);
            }
        );
    }
    
    getUsuarios(): Observable<any[]> {
        return this.usuarios.asObservable();
    }
    
}