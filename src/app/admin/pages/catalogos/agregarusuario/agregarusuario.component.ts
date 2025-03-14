import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service'; 

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
    contrasena: '',
    rol: '',
    fecha_creacion: this.obtenerFechaHoy(),
  };

  mensajeError: string = '';

  registrarUsuario() {
    console.log('Rol seleccionado antes de enviar:', this.nuevoUsuario.rol);

    // Validaciones antes de enviar el formulario
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.apellidos || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena || !this.nuevoUsuario.rol) {
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
    const token = localStorage.getItem('token');
    console.log('🛂 Token actual:', token);

    if (!token) {
      console.error('❌ No hay token, el usuario no está autenticado.');
      this.mensajeError = '⚠️ No tienes permisos para registrar usuarios. Inicia sesión.';
      return;
    }

    let registroObservable;

    if (this.nuevoUsuario.rol.toLowerCase() === 'admin' || this.nuevoUsuario.rol.toLowerCase() === 'empleado') {
      console.log('🛠️ Registrando usuario administrativo...');
      registroObservable = this.authService.registerAdmin(this.nuevoUsuario);
    } else {
      console.log('🛍️ Registrando cliente...');
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

        alert('✅ Usuario registrado exitosamente');

        // Reiniciar formulario
        this.nuevoUsuario = {
          nombre: '',
          apellidos: '',
          correo: '',
          telefono: '',
          direccion: '',
          contrasena: '',
          rol: '',
          fecha_creacion: this.obtenerFechaHoy(),
        };

        // Agregar un pequeño delay antes de la redirección para evitar problemas
        setTimeout(() => {
          console.log('🔄 Redirigiendo a la página de usuarios...');
          this.irAUsuarios();
        }, 500);
      },
      (error) => {
        console.error('❌ Error al registrar usuario:', error);

        if (error.status === 400) {
          this.mensajeError = '⚠️ El correo ya está registrado';
        } else if (error.status === 401) {
          this.mensajeError = '⚠️ No tienes permisos para realizar esta acción.';
        } else if (error.status === 500) {
          this.mensajeError = '⚠️ Error interno en el servidor. Inténtalo más tarde.';
        } else {
          this.mensajeError = '⚠️ Ocurrió un error al registrar el usuario';
        }
      }
    );
  }


  // Validar formato de correo electrónico
  validarCorreo(correo: string): boolean {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  obtenerFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Redirigir a la lista de usuarios
  irAUsuarios() {
    this.router.navigate(['/usuarios']);
  }
}


