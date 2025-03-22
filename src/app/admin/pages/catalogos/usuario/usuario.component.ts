import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment';
// usuario.component.ts

import { DialogoEditarUsuarioComponent } from '../dialogo-editar-usuario/dialogo-editar-usuario.component';
import { MatDialogConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
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
    this.authService.consultarUsuarios().subscribe(
      (usuarios) => {
        console.log('📡 Lista de usuarios actualizada:', usuarios);
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('❌ Error al obtener usuarios:', error);
      }
    );
  }

  // 🔍 Propiedad computada para filtrar usuarios
  get usuariosFiltrados() {
    return this.usuarios.filter((usuario) =>
      Object.values(usuario).some((valor) =>
        (valor ? String(valor) : '').toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
  }

  editarUsuario(usuario: any) {
    console.log('Usuario a editar:', usuario); // Depuración
    if (!usuario || !usuario.id) {
      console.error('❌ El usuario no tiene un ID válido');
      return;
    }
  
    const dialogRef = this.dialog.open(DialogoEditarUsuarioComponent, {
      width: '350px',
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        rol: usuario.rol
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos actualizados:', result);
        if (!result.id) {
          console.error('❌ El resultado no contiene un ID válido');
          return;
        }
        const url = `${environment.api.authApis}/usuarios/actualizar/${result.id}`;
        this.authService.http.put(url, result).subscribe({
          next: () => {
            console.log('✅ Usuario actualizado en el backend');
            this.cargarUsuarios(); // Recarga la lista de usuarios
          },
          error: (error) => {
            console.error('❌ Error al actualizar usuario:', error);
          }
        });
      }
    });
  }

  // 🗑️ Función para eliminar un usuario
  eliminarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(MatDialogConfirmacionComponent, {
      width: '350px',
      data: { nombre: usuario.nombre },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        const url = `${environment.api.authApis}/usuarios/eliminar/${usuario.id}`;
        this.authService.http.delete(url).subscribe({
          next: () => {
            console.log('✅ Usuario eliminado en el backend');
            this.usuarios = this.usuarios.filter((u) => u !== usuario); // Actualiza la lista local
          },
          error: (error) => {
            console.error('❌ Error al eliminar usuario:', error);
          }
        });
      }
    });
  }
}