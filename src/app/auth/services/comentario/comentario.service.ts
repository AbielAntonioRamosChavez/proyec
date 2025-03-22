// services/comentario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = `${environment.api.authApis}/comentarios`;
  private apiUrl2 = `${environment.api.authApis}/`;

  constructor(private http: HttpClient) {}

  crearComentario(comentario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, comentario);
  }

  obtenerComentariosPorServicio(servicioId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicio/${servicioId}`);
  }

  darLike(comentarioId: string, usuarioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${comentarioId}/like`, { usuario: { id_pg: usuarioId } });
  }

  reportarComentario(comentarioId: string, usuarioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${comentarioId}/reportar`, { usuario: { id_pg: usuarioId } });
  }

  crearRespuesta(respuesta: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}respuestas`, respuesta);
  }
  
  obtenerRespuestasPorComentario(comentarioId: string): Observable<any> {
    return this.http.get(`${this.apiUrl2}respuestas/comentario/${comentarioId}`);
  }
}