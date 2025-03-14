import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoEditarUsuarioComponent } from '../../catalogos/dialogo-editar-usuario/dialogo-editar-usuario.component';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: false
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = []; // Lista de usuarios desde la API
  filtro: string = ''; // Filtro para la búsqueda

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  // 🔄 Función reutilizable para obtener los usuarios
  cargarUsuarios() {
    this.authService.getUsuarios().subscribe(
      (usuarios) => {
        console.log('📡 Lista de usuarios actualizada:', usuarios);
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('❌ Error al obtener usuarios:', error);
      }
    );
  }

  get usuariosFiltrados() {
    return this.usuarios.filter((usuario) =>
      Object.values(usuario).some((valor) =>
        (valor ? String(valor) : '').toLowerCase().includes(this.filtro.toLowerCase())
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
        const index = this.usuarios.findIndex(u => u.correo === usuario.correo);
        if (index !== -1) {
          this.usuarios[index] = result;
        }
      }
    });
  }

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
