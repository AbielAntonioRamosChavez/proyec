import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'TU_API_BACKEND/proveedores'; // Reemplaza con la URL de tu API de proveedores

  constructor(private http: HttpClient) { }

  obtenerProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerProveedor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearProveedor(proveedor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, proveedor);
  }

  actualizarProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proveedor);
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}