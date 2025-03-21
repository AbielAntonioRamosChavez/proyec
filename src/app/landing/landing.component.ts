import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-landing', // Corregido el selector
  standalone: false, // Se mantiene explícitamente
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {

  usuarioActual: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.usuarioActual = null; // 🔄 Actualizar la vista eliminando el usuario
  }



  // Variables para el modal
  modalVisible: boolean = false;
  modalTitle: string = '';
  modalDescription: string = '';
  modalType: string = '';
  comentariosModal: any[] = [];
  nuevoComentarioModal: string = '';

  // Comentarios para cada servicio
  comentariosEntrega = [
    { usuario: 'Usuario1', texto: '¡Excelente servicio!', likes: 12, usuariosQueDieronLike: [] as string[] },
    { usuario: 'Usuario2', texto: 'Muy puntuales.', likes: 8, usuariosQueDieronLike: [] as string[] },
  ];

  comentariosTienda = [
    { usuario: 'Usuario3', texto: 'Buen ambiente.', likes: 5, usuariosQueDieronLike: [] as string[] },
  ];

  comentariosPromociones = [
    { usuario: 'Usuario4', texto: '¡Grandes descuentos!', likes: 20, usuariosQueDieronLike: [] as string[] },
  ];

  // Abrir el modal
  abrirModal(tipo: string) {
    this.modalType = tipo;
    this.modalVisible = true;

    if (tipo === 'entrega') {
      this.modalTitle = 'Entrega a Domicilio';
      this.modalDescription = 'Próximamente.';
      this.comentariosModal = this.comentariosEntrega;
    } else if (tipo === 'tienda') {
      this.modalTitle = 'Compra en Tienda';
      this.modalDescription = 'Visítanos y encuentra una gran variedad de productos frescos y de calidad.';
      this.comentariosModal = this.comentariosTienda;
    } else if (tipo === 'promociones') {
      this.modalTitle = 'Promociones';
      this.modalDescription = 'Aprovecha nuestras ofertas y descuentos exclusivos cada semana.';
      this.comentariosModal = this.comentariosPromociones;
    }
  }

  // Cerrar el modal
  cerrarModal() {
    this.modalVisible = false;
  }

  // Agregar un comentario
  agregarComentario(servicio: string, comentario: string) {
    if (comentario.trim()) {
      const nuevoComentario = {
        usuario: 'UsuarioNuevo', // Puedes cambiar esto por un sistema de autenticación
        texto: comentario,
        likes: 0,
        usuariosQueDieronLike: [] as string[],
      };

      if (servicio === 'entrega') {
        this.comentariosEntrega.push(nuevoComentario);
      } else if (servicio === 'tienda') {
        this.comentariosTienda.push(nuevoComentario);
      } else if (servicio === 'promociones') {
        this.comentariosPromociones.push(nuevoComentario);
      }

      this.nuevoComentarioModal = ''; // Limpiar el textarea
    }
  }

  // Dar like a un comentario
  darLike(comentario: any, servicio: string) {
    const usuarioActual = 'UsuarioActual'; // Reemplaza esto con el usuario autenticado
    if (!comentario.usuariosQueDieronLike.includes(usuarioActual)) {
      comentario.likes++;
      comentario.usuariosQueDieronLike.push(usuarioActual);
    }
  }
}





