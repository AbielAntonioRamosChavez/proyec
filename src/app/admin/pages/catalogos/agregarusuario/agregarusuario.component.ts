import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregarusuario',
  standalone: false,
  templateUrl: './agregarusuario.component.html',
  styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Datos del usuario nuevo
  nuevoUsuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: '',
    fecha_creacion: this.obtenerFechaHoy(),
  };

  mensajeError: string = '';

  registrarUsuario() {
    this.mensajeError = ''; // 🔥 Limpiar errores previos antes de validar
  
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.apellidos || !this.nuevoUsuario.correo || !this.nuevoUsuario.rol) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios.';
      return;
    }
  
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nuevoUsuario.nombre)) {
      this.mensajeError = 'El nombre solo puede contener letras y espacios.';
      return;
    }
  
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nuevoUsuario.apellidos)) {
      this.mensajeError = 'Los apellidos solo pueden contener letras y espacios.';
      return;
    }
  
    if (!this.validarCorreo(this.nuevoUsuario.correo)) {
      this.mensajeError = 'Por favor, ingrese un correo válido.';
      return;
    }
  

    // Verificar si hay un token antes de hacer la solicitud
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) {
      console.error('❌ No hay token, el usuario no está autenticado.');
      this.mensajeError = '⚠️ No tienes permisos para registrar usuarios. Inicia sesión.';
      return;
    }

    let registroObservable;

    if (this.nuevoUsuario.rol.toLowerCase() === 'admin' || this.nuevoUsuario.rol.toLowerCase() === 'empleado') {
      console.log('️ Registrando usuario administrativo...');
      registroObservable = this.authService.registerAdmin(this.nuevoUsuario);
    } else {
      console.log('️ Registrando cliente...');
      registroObservable = this.authService.registerCliente(this.nuevoUsuario);
    }
    

    registroObservable.subscribe(
      (response) => {
        console.log('✅ Usuario registrado con éxito:', response);
    
        if (!response) {
          console.error('❌ La respuesta del servidor es null o indefinida.');
          this.mensajeError = '⚠️ Ocurrió un problema con el servidor.';
          return;
        }

        Swal.fire({
          title: '¡Éxito!',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: '👤 Ver usuarios',
          cancelButtonText: '➕ Agregar otro usuario',
          timer: 5000,
          timerProgressBar: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.irAUsuarios(); // 📌 Ir a la lista de usuarios
          } else {
            // 🔄 Limpiar formulario para agregar otro usuario
            this.nuevoUsuario = {
              nombre: '',
              apellidos: '',
              correo: '',
              telefono: '',
              direccion: '',
              rol: '',
              fecha_creacion: this.obtenerFechaHoy(),
            };
          }
        });
        
      },
      (error) => {
        console.error('❌ Error al registrar usuario:', error);
      
        let mensaje = '⚠️ Ocurrió un error inesperado. Inténtalo nuevamente.';
      
        if (error.status === 400 && error.error?.message === 'El correo ya está registrado') {
          mensaje = '⚠️ Este correo ya está registrado.';
        } else if (error.status === 401) {
          mensaje = '⚠️ No tienes permisos para realizar esta acción.';
        } else if (error.status === 500) {
          mensaje = '⚠️ Error interno en el servidor. Inténtalo más tarde.';
        }
      
        Swal.fire({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      
        this.mensajeError = mensaje;
      }
    );
  }

  // Validar formato de correo electrónico
  validarCorreo(correo: string): boolean {
    // Expresión regular mejorada para validar correos
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexCorreo.test(correo);
  }

  // Obtener la fecha de hoy en formato ISO-MM-DD
  obtenerFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Redirigir a la lista de usuarios
irAUsuarios() {
  this.router.navigate(['admin/usuarios']);
}


}