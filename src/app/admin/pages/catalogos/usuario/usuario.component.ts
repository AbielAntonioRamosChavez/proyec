import { Component } from '@angular/core';
import { MatDialogConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

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
    console.log("Editando usuario:", usuario);
    // Aquí puedes agregar la lógica para editar el usuario, como abrir un diálogo o navegar a otra página.
  }
  

  // Método para abrir el diálogo de confirmación antes de eliminar
  eliminarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(MatDialogConfirmacionComponent, {
      width: '350px',
      data: { nombre: usuario.nombre },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.usuarios = this.usuarios.filter((u) => u !== usuario);
      }
    });
  }
}

