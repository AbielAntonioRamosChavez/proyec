// landing.component.ts
import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../auth/services/servicio/servicio.service';
import { ComentarioService } from '../auth/services/comentario/comentario.service';
import { AuthService } from '../auth/services/auth.service';

// Definir la interfaz para el tipo Comentario
interface Comentario {
  _id: string;
  usuario: {
    id_pg: string;
    nombre: string;
  };
  contenido: string;
  likes?: string[]; // Array de IDs de usuarios que dieron like
  reports?: string[]; // Array de IDs de usuarios que reportaron
  likesCount?: number; // Número de likes
  usuarioDioLike?: boolean; // Si el usuario actual dio like
  usuarioReporto?: boolean; // Si el usuario actual reportó
  estado?: string; // Estado del comentario
}

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  servicios: any[] = [];
  comentariosModal: Comentario[] = []; // Usar la interfaz Comentario
  nuevoComentarioModal: string = '';
  servicioSeleccionado: any = null;
  respuestasModal: any[] = [];
  nuevaRespuestaModal: string = '';
  comentarioSeleccionado: Comentario | null = null; // Usar la interfaz Comentario
  modalVisible: boolean = false;
  usuarioActual: any = null;

  constructor(
    private servicioService: ServicioService,
    private comentarioService: ComentarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerServicios();
    this.usuarioActual = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.usuarioActual = null;
  }

  obtenerServicios(): void {
    this.servicioService.obtenerServicios().subscribe(
      (data) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error al obtener servicios:', error);
      }
    );
  }

  abrirModal(servicioSlug: string): void {
    this.servicioService.obtenerServicioPorSlug(servicioSlug).subscribe(
      (servicio) => {
        this.servicioSeleccionado = servicio;
        this.obtenerComentarios(servicio._id);
        this.modalVisible = true;
      },
      (error) => {
        console.error('Error al obtener servicio:', error);
      }
    );
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  verRespuestas(comentarioId: string): void {
    this.comentarioSeleccionado = this.comentariosModal.find((c) => c._id === comentarioId) || null;
    if (this.comentarioSeleccionado) {
      this.comentarioService.obtenerRespuestasPorComentario(comentarioId).subscribe(
        (respuestas) => {
          this.respuestasModal = respuestas;
        },
        (error) => {
          console.error('Error al obtener respuestas:', error);
        }
      );
    }
  }

  agregarRespuesta(): void {
    const usuario = this.authService.getUser();
    if (usuario && this.nuevaRespuestaModal.trim() && this.comentarioSeleccionado) {
      const respuesta = {
        comentario_id: this.comentarioSeleccionado._id,
        contenido: this.nuevaRespuestaModal,
        usuario: { id_pg: usuario.id },
      };

      this.comentarioService.crearRespuesta(respuesta).subscribe(
        (response) => {
          this.respuestasModal.push(response);
          this.nuevaRespuestaModal = '';
        },
        (error) => {
          console.error('Error al crear respuesta:', error);
        }
      );
    }
  }

  obtenerComentarios(servicioId: string): void {
    this.comentarioService.obtenerComentariosPorServicio(servicioId).subscribe(
      (comentarios: Comentario[]) => {
        this.comentariosModal = comentarios.map((comentario) => ({
          ...comentario,
          likesCount: comentario.likes ? comentario.likes.length : 0,
          usuarioDioLike: comentario.likes ? comentario.likes.includes(this.usuarioActual?.id) : false,
          usuarioReporto: comentario.reports ? comentario.reports.includes(this.usuarioActual?.id) : false,
        }));
      },
      (error) => {
        console.error('Error al obtener comentarios:', error);
      }
    );
  }

  agregarComentario(): void {
    const usuario = this.authService.getUser();
    if (usuario && this.nuevoComentarioModal.trim()) {
      const comentario = {
        servicio: this.servicioSeleccionado._id,
        contenido: this.nuevoComentarioModal,
        usuario: { id_pg: usuario.id },
      };

      this.comentarioService.crearComentario(comentario).subscribe(
        (response: Comentario) => {
          this.comentariosModal.push({
            ...response,
            likesCount: 0,
            usuarioDioLike: false,
            usuarioReporto: false,
          });
          this.nuevoComentarioModal = '';
        },
        (error) => {
          console.error('Error al crear comentario:', error);
        }
      );
    }
  }

  darLike(comentarioId: string): void {
    const usuario = this.authService.getUser();
    if (usuario) {
      this.comentarioService.darLike(comentarioId, usuario.id).subscribe(
        (response) => {
          const comentario = this.comentariosModal.find((c) => c._id === comentarioId);
          if (comentario) {
            comentario.likes = response.likes;
            comentario.likesCount = response.likes.length;
            comentario.usuarioDioLike = true;
          }
        },
        (error) => {
          console.error('Error al dar like:', error);
        }
      );
    }
  }

  reportarComentario(comentarioId: string): void {
    const usuario = this.authService.getUser();
    if (usuario) {
      this.comentarioService.reportarComentario(comentarioId, usuario.id).subscribe(
        (response) => {
          const comentario = this.comentariosModal.find((c) => c._id === comentarioId);
          if (comentario) {
            comentario.estado = response.estado;
            comentario.usuarioReporto = true;
          }
        },
        (error) => {
          console.error('Error al reportar comentario:', error);
        }
      );
    }
  }

  usuarioEsAutor(comentario: Comentario): boolean {
    return comentario.usuario.id_pg === this.usuarioActual?.id;
  }
}