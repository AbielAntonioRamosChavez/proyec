import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoEditarUsuarioComponent } from '../../catalogos/dialogo-editar-usuario/dialogo-editar-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: false
})
export class UsuarioComponent {
  constructor(private dialog: MatDialog) {} // Inyectar MatDialog

  // Lista de usuarios
  usuarios = [
    {
      nombre: 'Juan',
      apellidos: 'Pérez',
      correo: 'juan@example.com',
      telefono: '123456789',
      direccion: 'Calle Falsa 123',
      rol: 'admin',
      fecha_creacion: new Date(),
    },
    {
      nombre: 'María',
      apellidos: 'Gómez',
      correo: 'maria@example.com',
      telefono: '987654321',
      direccion: 'Avenida Siempre Viva 456',
      rol: 'empleado',
      fecha_creacion: new Date(),
    },
  ];

  // Filtro para la búsqueda
  filtro: string = '';

  // Obtener usuarios filtrados
  get usuariosFiltrados() {
    return this.usuarios.filter((usuario) =>
      Object.values(usuario).some((valor) =>
        valor.toString().toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
  }

  editarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(DialogoEditarUsuarioComponent, {
      width: '350px',
      data: { 
        nombre: usuario.nombre, 
        correo: usuario.correo, 
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        rol: usuario.rol
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuario editado:', result);
        // Actualizar el usuario en la lista
        const index = this.usuarios.findIndex(u => u.correo === usuario.correo);
        if (index !== -1) {
          this.usuarios[index] = result;
        }
      }
    });
  }

  // Método para abrir el diálogo de confirmación antes de eliminar
  eliminarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(MatDialogConfirmacionComponent, {
      width: '350px',
      data: { nombre: usuario.nombre },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.usuarios = this.usuarios.filter((u) => u  !== usuario);
      }
    });
  }
}