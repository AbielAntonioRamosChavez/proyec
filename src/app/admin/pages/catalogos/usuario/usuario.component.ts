import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment';
// usuario.component.ts

import { DialogoEditarUsuarioComponent } from '../dialogo-editar-usuario/dialogo-editar-usuario.component';
import { MatDialogConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2';

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

  getNombreRol(rol: any): string {
    // Asegurar que el rol es un número
    const rolNumero = parseInt(rol, 10); 
  
    // Definir los roles
    const roles: { [key: number]: string } = {
      1: 'Administrador',
      2: 'Cliente',
      3: 'Empleado'
    };
  
    // Retornar el rol correspondiente o "Desconocido" si no existe
    return roles[rolNumero] || 'Desconocido';
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
    console.log('Usuario a editar:', usuario);
  
    if (!usuario || !usuario.id) {
      console.error('❌ El usuario no tiene un ID válido');
      return;
    }
  
    Swal.fire({
      title: 'Editar Usuario',
      html: `
        <label for="swal-nombre" class="swal2-label">Nombre:</label>
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${usuario.nombre}">
    
        <label for="swal-apellidos" class="swal2-label">Apellidos:</label>
        <input id="swal-apellidos" class="swal2-input" placeholder="Apellidos" value="${usuario.apellidos}">
    
        <label for="swal-correo" class="swal2-label">Correo:</label>
        <input id="swal-correo" class="swal2-input" placeholder="Correo" type="email" value="${usuario.correo}">
    
        <label for="swal-telefono" class="swal2-label">Teléfono:</label>
        <input id="swal-telefono" class="swal2-input" placeholder="Teléfono" value="${usuario.telefono}">
    
        <label for="swal-rol" class="swal2-label">Rol:</label>
        <select id="swal-rol" class="swal2-select">
          <option value="1" ${usuario.rol === 1 ? 'selected' : ''}>Administrador</option>
          <option value="2" ${usuario.rol === 2 ? 'selected' : ''}>Cliente</option>
          <option value="3" ${usuario.rol === 3 ? 'selected' : ''}>Empleado</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          id: usuario.id,
          nombre: (document.getElementById('swal-nombre') as HTMLInputElement).value,
          apellidos: (document.getElementById('swal-apellidos') as HTMLInputElement).value,
          correo: (document.getElementById('swal-correo') as HTMLInputElement).value,
          telefono: (document.getElementById('swal-telefono') as HTMLInputElement).value,
          rol: parseInt((document.getElementById('swal-rol') as HTMLSelectElement).value)
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        console.log('✅ Datos actualizados:', result.value);
    
        if (!result.value.id) {
          console.error('❌ El resultado no contiene un ID válido');
          return;
        }
    
        const url = `${environment.api.authApis}/usuarios/actualizar/${result.value.id}`;
        this.authService.http.put(url, result.value).subscribe({
          next: () => {
            console.log('✅ Usuario actualizado en el backend');
            this.cargarUsuarios(); // Recargar la lista de usuarios
            Swal.fire('¡Actualizado!', 'El usuario ha sido actualizado correctamente.', 'success');
          },
          error: (error) => {
            console.error('❌ Error al actualizar usuario:', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
          }
        });
      }
    });
  }
  
  // 🗑️ Función para eliminar un usuario con SweetAlert2
  eliminarUsuario(usuario: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${usuario.nombre}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${environment.api.authApis}/usuarios/eliminar/${usuario.id}`;
        this.authService.http.delete(url).subscribe({
          next: () => {
            console.log('✅ Usuario eliminado en el backend');
            this.usuarios = this.usuarios.filter((u) => u.id !== usuario.id); // Actualiza la lista local
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado correctamente.', 'success');
          },
          error: (error) => {
            console.error('❌ Error al eliminar usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }
}