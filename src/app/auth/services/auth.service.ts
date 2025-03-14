import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private usuarios = new BehaviorSubject<any[]>([]);
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER_CURRENT = 'USER_CURRENT';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string = '';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.cargarUsuarios();
    }

    login(user: { correo: string; contrasena: string }): Observable<any> {
        return this.http.post<any>(`${environment.api.authApis}/usuarios/login`, user).pipe(
            tap(response => {
                console.log('✅ Respuesta del servidor:', response);
                
                if (response && response.token && response.refreshToken) {
                    this.storeJwtToken(response.token); // Guarda el token de acceso
                    this.storeRefreshToken(response.refreshToken); // Guarda el refresh token
                    this.storeUser(response.user);
                     // Guarda los datos del usuario
                    
                    console.log('🔑 Token guardado:', this.getJwtToken());
                    console.log('🔄 Redirigiendo a /admin...');
                    this.router.navigate(['/admin']);
                } else {
                    console.warn('⚠️ No se recibió token en la respuesta.');
                }
            }),
            catchError(error => {
                console.error('❌ Error en el login:', error);
                return this.http.post<any>(`${environment.api.authApis}/usuarios/login`, user).pipe(
                    tap(response => this.handleLoginResponse(response)),
                    catchError(error => {
                        console.error('❌ Error en el login:', error);
                        return throwError(() => error);
                    })
                );
                
            })
        );
    }

    logout(): Observable<any> {
        return this.http.post<any>(`${environment.api.authApis}/logout`, {}).pipe(
            tap(response => {
                console.log('🔒 Logout exitoso:', response);
                this.doLogoutUser();
                this.router.navigate(['/login']);
            }),
            catchError(error => {
                console.error('❌ Error en logout:', error);
                this.doLogoutUser();
                this.router.navigate(['/login']);
                return throwError(() => error);
            })
        );
    }

    registerCliente(usuario: any): Observable<any> { 
        const url = `${environment.api.authApis}/usuarios/registro`;

        console.log('📡 Registrando cliente en:', url);
        console.log('📦 Datos enviados:', usuario);

        return this.http.post(url, usuario).pipe(
            tap(response => console.log('✅ Cliente registrado:', response)),
            catchError(error => {
                console.error('❌ Error al registrar cliente:', error);

                let mensajeError = 'Ocurrió un error al registrar el cliente.';
                if (error.status === 400) mensajeError = '⚠️ El correo ya está registrado.';
                if (error.status === 500) mensajeError = '⚠️ Error interno del servidor.';

                return throwError(() => new Error(mensajeError));
            })
        );
    }

    registerAdmin(usuario: any): Observable<any> { 
        const url = `${environment.api.authApis}/usuarios/registro-admin`;
        const token = this.getJwtToken(); // 🔄 Corregido

        if (!token) {
            console.error('❌ No hay token disponible. El usuario no está autenticado.');
            return throwError(() => new Error('⚠️ No tienes permisos para realizar esta acción.'));
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        console.log('📡 Registrando administrador en:', url);
        console.log('📦 Datos enviados:', usuario);
        console.log('🛂 Token enviado:', token);

        return this.http.post(url, usuario, { headers }).pipe(
            tap(response => console.log('✅ Usuario administrativo registrado:', response)),
            catchError(error => {
                console.error('❌ Error al registrar usuario administrativo:', error);

                let mensajeError = 'Ocurrió un error al registrar el usuario administrativo.';
                if (error.status === 400) mensajeError = '⚠️ El correo ya está registrado.';
                if (error.status === 401) mensajeError = '⚠️ No tienes permisos para registrar usuarios.';
                if (error.status === 500) mensajeError = '⚠️ Error interno del servidor.';

                return throwError(() => new Error(mensajeError));
            })
        );
    }

    private handleLoginResponse(response: any): void {
        if (response && response.token && response.refreshToken) {
            this.storeJwtToken(response.token);
            this.storeRefreshToken(response.refreshToken);
            this.storeUser(response.user);
    
            console.log('🔑 Token guardado:', this.getJwtToken());
            console.log('🔄 Redirigiendo a /admin...');
            this.router.navigate(['/admin']);
        } else {
            console.warn('⚠️ No se recibió token en la respuesta.');
        }
    }
    
    

    private removeRefreshToken() {
        localStorage.removeItem(this.REFRESH_TOKEN);
    }
    
    public getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    isLoggedIn(): boolean {
        return !!this.getJwtToken(); // 🔄 Corregido
    }

    public getJwtToken(): string | null {
        return localStorage.getItem(this.JWT_TOKEN);
    }

    doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeJwtToken(tokens.token); // ✅ Cambiado storeTokens() por storeJwtToken()
    }
    

    private doLogoutUser() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.USER_CURRENT);
        this.removeRefreshToken(); // 🔥 Ahora también elimina el refresh token
    }

    private storeJwtToken(token: string) {
        console.log("📝 Guardando token en localStorage:", token);
        localStorage.setItem('JWT_TOKEN', token);
    }
    
    
    private storeUser(user: any) {
        console.log("👤 Guardando datos del usuario:", user);
        localStorage.setItem('USER', JSON.stringify(user));
    }

    private removeTokens() {
        this.doLogoutUser(); // 🔄 Corregido
    }

    consultarUsuarios(): Observable<any> {
        const url = `${environment.api.authApis}/usuarios/consultar`;
        return this.http.get(url);
    }

    private cargarUsuarios() {
        this.consultarUsuarios().subscribe(
            usuarios => {
                console.log('📡 Usuarios cargados desde la API:', usuarios);
                this.usuarios.next(usuarios);
            },
            error => {
                console.error('❌ Error al cargar usuarios:', error);
            }
        );
    }

    private storeRefreshToken(refreshToken: string) {
        console.log("📝 Guardando refresh token en localStorage:", refreshToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
    }

    refreshToken(): Observable<any> {
        const refreshToken = this.getRefreshToken(); // Obtiene el refresh token guardado
    
        if (!refreshToken) {
            console.error("❌ No se encontró refresh token.");
            return throwError(() => new Error("⚠️ No hay refresh token disponible."));
        }
    
        return this.http.post<any>(`${environment.api.authApis}/usuarios/refresh`, { refreshToken }).pipe(
            tap(response => {
                if (response && response.token) {
                    this.storeJwtToken(response.token); // 🔄 Guarda el nuevo token de acceso
                    console.log('🔄 Token renovado con éxito:', response.token);
                }
            }),
            catchError(error => {
                console.error("❌ Error al renovar token:", error);
                return throwError(() => error);
            })
        );
    }
    
    
    getUsuarios(): Observable<any[]> {
        return this.usuarios.asObservable();
    }
}
