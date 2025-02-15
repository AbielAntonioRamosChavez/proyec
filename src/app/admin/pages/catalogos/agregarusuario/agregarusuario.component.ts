import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarusuario',
  standalone: false,
  
  templateUrl: './agregarusuario.component.html',
  styleUrl: './agregarusuario.component.css'
})
export class AgregarusuarioComponent {
  constructor(private router: Router) {} // Inyección del Router

  // Redirigir a la lista de usuarios
  irAUsuarios() {
    this.router.navigate(['/usuarios']);
  }

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

    console.log('Usuario registrado:', this.nuevoUsuario);

    // Limpiar formulario
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

    this.mensajeError = '';

    // Redirigir a la lista de usuarios
    this.irAUsuarios();
  }
}