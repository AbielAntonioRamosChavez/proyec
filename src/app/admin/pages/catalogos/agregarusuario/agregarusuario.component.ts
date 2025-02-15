import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service'; // Importa el servicio AuthService

@Component({
  selector: 'app-agregarusuario',
  standalone:false,
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
    rol: 'cliente',
    fecha_creacion: new Date().toISOString().split('T')[0],
  };

  mensajeError: string = '';

  registrarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    // Llama al servicio para registrar el usuario
    this.authService.register(this.nuevoUsuario).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        alert('Usuario registrado exitosamente');
        this.nuevoUsuario = {
          nombre: '',
          apellidos: '',
          correo: '',
          telefono: '',
          direccion: '',
          contrasena: '',
          rol: 'cliente',
          fecha_creacion: new Date().toISOString().split('T')[0],
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

  // Redirigir a la lista de usuarios
  irAUsuarios() {
    this.router.navigate(['/usuarios']);
  }
}