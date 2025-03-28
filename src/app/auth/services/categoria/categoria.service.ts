import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.api.authApis}/categorias`;

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, categoria);
  }

  eliminarCategoria(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // Puedes agregar aquí otros métodos si los necesitas
}