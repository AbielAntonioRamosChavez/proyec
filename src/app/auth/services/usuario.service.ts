import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto permite que el servicio esté disponible en toda la aplicación
})
export class UsuarioService {
  private apiUrl = 'https://tu-api.com/usuarios'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }
}