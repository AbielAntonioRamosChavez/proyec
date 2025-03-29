import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { NgZone } from '@angular/core';



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private usuarios = new BehaviorSubject<any[]>([]);
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER_CURRENT = 'USER_CURRENT';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string = '';
    private apiUrl = 'http://localhost:5000/api/usuarios';
    private usuariosSubject = new BehaviorSubject<any[]>([]);
    usuarios$ = this.usuariosSubject.asObservable();
    
    constructor(
    public http: HttpClient,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.cargarUsuarios();
    }

    registrarUsuario(usuario: any) {
        return this.http.post(`${this.apiUrl}/registro`, usuario); // Cambiar "register" por "registro"
    }

    loginWithGoogle(idToken: string): Observable<any> {
        const url = `${environment.api.authApis}/usuarios/login-google`;
        console.log('🌐 Enviando token Google a:', url);
        
        return this.http.post<any>(url, { idToken }).pipe(
          tap(response => {
            if (response?.success && response?.token && response?.user) {
              // Almacenar token
              this.setJwtToken(response.token);
              
              // Almacenar usuario
              localStorage.setItem(this.USER_CURRENT, JSON.stringify(response.user));
              
              console.log("👤 Usuario almacenado:", response.user);
            } else {
              throw new Error(response?.message || 'Respuesta incompleta del servidor');
            }
          }),
          catchError(error => {
            let errorMsg = error.error?.message || 
                          error.message || 
                          'Error en la autenticación con Google';
            
            return throwError(() => new Error(errorMsg));
          })
        );
      }
    
      


    login(user: { correo: string; contrasena: string }): Observable<any> {
        return this.http.post<any>(`${environment.api.authApis}/usuarios/login`, user).pipe(
            tap(response => {
                console.log('✅ Respuesta del servidor:', response);
            
                if (response && response.token && response.user) {
                    // 1. Almacenar token JWT
                    this.storeJwtToken(response.token);
                    
                    // 2. Almacenar datos del usuario en localStorage
                    localStorage.setItem(this.USER_CURRENT, JSON.stringify(response.user));
                    console.log("👤 Usuario almacenado:", response.user);
                    
                    // 3. Redirigir basado en el rol (usar rol_nombre en lugar de rol)
                    this.ngZone.run(() => {
                        if (response.user.rol_nombre === 'admin') { // Cambiado de rol a rol_nombre
                            console.log("🚀 Redirigiendo a /admin/puntodeventa...");
                            this.router.navigate(['/admin/puntodeventa']);
                        } else {
                            console.log("🚀 Redirigiendo a /landing...");
                            this.router.navigate(['/landing']);
                        }
                    });
                } else {
                    console.warn("⚠️ Respuesta incompleta del servidor");
                }
            }),
            catchError(error => {
                console.error('❌ Error en el login:', error);
                return throwError(() => error);
            })
        );
    }

     /**
   * Método específico para el login de clientes.
   * @param user Datos del cliente (correo y contraseña).
   * @returns Observable con la respuesta del servidor.
   */
  loginCliente(user: { correo: string; contrasena: string }): Observable<any> {
    const url = `${environment.api.authApis}/usuarios/login`;
    console.log('🌐 Iniciando sesión de cliente en:', url);
    console.log('📦 Datos enviados:', user);

    return this.http.post<any>(url, user).pipe(
      tap((response) => {
        console.log('✅ Respuesta del servidor:', response);
        if (response && response.token && response.user) {
    
      // Almacenar token JWT y datos del usuario
          this.storeJwtToken(response.token);
          localStorage.setItem(this.USER_CURRENT, JSON.stringify(response.user));
          console.log("👤 Usuario almacenado:", response.user);
        } else {
          console.warn("⚠️ Respuesta incompleta del servidor");
        }
      }),
      catchError((error) => {
        console.error('❌ Error en el login del cliente:', error);
        let mensajeError = 'Ocurrió un error desconocido.';
        if (error.status === 401) mensajeError = 'Credenciales incorrectas. Inténtelo de nuevo.';
        if (error.status === 500) mensajeError = 'Error interno del servidor. Inténtelo más tarde.';
        return throwError(() => new Error(mensajeError));
      })
    );
  }
    

  logout(): Observable<void> {
    const usuario = this.getUser();

    return new Observable<void>((observer) => {
        this.http.post<any>(`${environment.api.authApis}/logout`, {}).pipe(
            tap(() => {
                console.log('🔒 Logout exitoso');
                this.doLogoutUser();

                if (usuario?.rol_nombre === 'cliente') { // Cambiado de rol a rol_nombre
                    this.router.navigate(['/login2']);
                } else {
                    this.router.navigate(['/login']);
                }

                observer.next();
                observer.complete();
            }),
            catchError(error => {
                console.error('❌ Error en logout:', error);
                this.doLogoutUser();

                if (usuario?.rol_nombre === 'cliente') { // Cambiado de rol a rol_nombre
                    this.router.navigate(['/login2']);
                } else {
                    this.router.navigate(['/login']);
                }

                observer.error(error);
                return throwError(() => error);
            })
        ).subscribe();
    });
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
        const token = this.getJwtToken();
        
        if (!token) {
            console.error('❌ No hay token disponible. El usuario no está autenticado.');
            return throwError(() => new Error('⚠️ No tienes permisos para realizar esta acción.'));
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    
        return this.http.post(url, usuario, { headers }).pipe(
            tap((response: any) => {
                console.log('✅ Usuario administrativo registrado:', response);
                if (response.token) {
                    this.storeJwtToken(response.token);
                }
                return response;
            }),
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
        return localStorage.getItem(this.JWT_TOKEN) || sessionStorage.getItem(this.JWT_TOKEN);
    }
    

    doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeJwtToken(tokens.token); // ✅ Cambiado storeTokens() por storeJwtToken()
    }
    

    private doLogoutUser() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.USER_CURRENT); // Asegurar que se elimina
        this.removeRefreshToken();
      }

    private storeJwtToken(token: string): void {
        localStorage.setItem(this.JWT_TOKEN, token);
        sessionStorage.setItem(this.JWT_TOKEN, token); // Guarda también en sessionStorage
    }
    
    
    private storeUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario como string
    }

    private removeTokens() {
        this.doLogoutUser(); // 🔄 Corregido
    }

    consultarUsuarios(): Observable<any[]> {  // Especifica que retorna un array
        const url = `${environment.api.authApis}/usuarios/consultar`;
        return this.http.get<any[]>(url).pipe(  // Especifica el tipo esperado en get<>
            tap(usuarios => {
                this.usuariosSubject.next(usuarios);
            }),
            catchError(error => {
                console.error('❌ Error al cargar usuarios:', error);
                return throwError(() => error);
            })
        );
    }

    private cargarUsuarios() {
        this.consultarUsuarios().pipe(
            catchError(error => {
                console.error('❌ Error al cargar usuarios:', error);
                return []; // Devuelve un array vacío para evitar errores
            })
        ).subscribe(
            usuarios => {
                console.log('📡 Usuarios cargados desde la API:', usuarios);
                this.usuarios.next(usuarios || []); // Asegurar que siempre se pase un array
            }
        );
    }
    

    private storeRefreshToken(refreshToken: string): void {
        localStorage.setItem('refreshToken', refreshToken);
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
    
    getUser(): any {
        const user = localStorage.getItem(this.USER_CURRENT); // Usar this.USER_CURRENT
        return user ? JSON.parse(user) : null;
      }
    
    setJwtToken(token: string): void { 
        localStorage.setItem(this.JWT_TOKEN, token);
        sessionStorage.setItem(this.JWT_TOKEN, token); // Guarda en sessionStorage como respaldo
        console.log("✅ Token guardado en localStorage y sessionStorage:", token);
    }
   
    getUsuarios(): Observable<any[]> {
        return this.usuarios.asObservable();
    }

    buscarUsuarioPorCorreo(correo: string): Observable<any> {
        const url = `${environment.api.authApis}/usuarios/buscar/${correo}`;
        return this.http.get(url).pipe(
          catchError((error) => {
            console.error('Error al buscar usuario por correo:', error);
            return throwError(() => error);
          })
        );
      }


      //roles
      obtenerRoles(): Observable<any> {
        return this.http.get(`${environment.api.authApis}/roles`);
      }

      
      
}
