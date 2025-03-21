// venta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private apiUrl = `${environment.api.authApis}/ventas`;

  constructor(private http: HttpClient) {}

  // Obtener todas las ventas
  obtenerVentas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener una venta por ID
  obtenerVentaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva venta
  crearVenta(venta: any): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }

  // Actualizar el estado de una venta
  actualizarEstatusVenta(id: number, estatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estatus`, { estatus });
  }

  // Eliminar una venta
  eliminarVenta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}