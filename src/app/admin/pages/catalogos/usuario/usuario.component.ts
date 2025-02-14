import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  breadText: any = { 'title': 'Catálogos', 'title2': 'Usuarios', 'title3': 'Catálogos' };

  filtro: string = ''; // Variable para el filtro
  usuarios = [ // Lista de usuarios
    { nombre: 'Juan', apellidos: 'Pérez', correo: 'juan@example.com', telefono: '1234567890' },
    { nombre: 'María', apellidos: 'López', correo: 'maria@example.com', telefono: '0987654321' },
    { nombre: 'Carlos', apellidos: 'Gómez', correo: 'carlos@example.com', telefono: '1122334455' }
  ];

  nuevoUsuario = { 
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    direccion: '',
    telefono: ''
  };

  mensajeError = '';

  constructor() {}

  ngOnInit(): void {}

  registrarUsuario(): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    this.usuarios.push({ ...this.nuevoUsuario });

    alert('Usuario registrado correctamente');
    this.limpiarFormulario();
    this.mensajeError = '';
  }

  limpiarFormulario(): void {
    this.nuevoUsuario = {
      nombre: '',
      apellidos: '',
      correo: '',
      contrasena: '',
      direccion: '',
      telefono: ''
    };
  }

  // Método para filtrar usuarios por cualquier campo
  get usuariosFiltrados() {
    return this.usuarios.filter(usuario => 
      Object.values(usuario).some(valor => 
        valor.toString().toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
  }
}

