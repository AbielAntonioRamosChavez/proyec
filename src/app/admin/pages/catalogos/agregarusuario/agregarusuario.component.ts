import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service'; // Importa el servicio AuthService

@Component({
  selector: 'app-agregarusuario',
  standalone: false,
  templateUrl: './agregarusuario.component.html',
  styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent {
  constructor(
    private router: Router,
    private authService: AuthService // Inyecta AuthService
  ) {}

  // Datos del usuario nuevo
  nuevoUsuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    rol: '', // Se deja vacío para que el usuario lo seleccione
    fecha_creacion: this.obtenerFechaHoy(), // Asegurar fecha de hoy
  };

  mensajeError: string = '';

  registrarUsuario() {
    console.log('Rol seleccionado antes de enviar:', this.nuevoUsuario.rol);

    // Validaciones antes de enviar el formulario
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena || !this.nuevoUsuario.rol) {
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

    // Llama al servicio para registrar el usuario
    this.authService.register(this.nuevoUsuario).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        alert('Usuario registrado exitosamente');

        // Reiniciar formulario
        this.nuevoUsuario = {
          nombre: '',
          apellidos: '',
          correo: '',
          telefono: '',
          direccion: '',
          contrasena: '',
          rol: '', // Reiniciar rol vacío
          fecha_creacion: this.obtenerFechaHoy(),
        };

        this.irAUsuarios(); // Redirige a la lista de usuarios
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        if (error.status === 400) {
          this.mensajeError = 'El correo ya está registrado';
        } else {
          this.mensajeError = 'Ocurrió un error al registrar el usuario';
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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/usuarios']);
    });
  }
}
