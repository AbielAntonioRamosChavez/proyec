import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment';
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
    this.authService.usuarios$.subscribe({
      next: (usuarios: any[]) => {  // Especifica el tipo del parámetro
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Error al recibir usuarios:', error);
      }
    });
  }

  // 🔄 Función para obtener los usuarios
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

  // 🔍 Filtrar usuarios
  get usuariosFiltrados() {
    return this.usuarios.filter((usuario) =>
      Object.values(usuario).some((valor) =>
        (valor ? String(valor) : '').toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
  }

  // ✏️ Editar usuario con SweetAlert2
  editarUsuario(usuario: any) {
    console.log('Usuario a editar:', usuario);
  
    if (!usuario || !usuario.id) {
      console.error('❌ El usuario no tiene un ID válido');
      return;
    }
  
    // Obtener los roles desde la API
    this.authService.obtenerRoles().subscribe((roles: any[]) => {
      // Excluir el rol de cliente (ID 2 según tu DB)
      const rolesDisponibles = roles.filter(rol => rol.id !== 2);
  
      // Construir las opciones del select
      const opcionesRol = rolesDisponibles
        .map(rol => `<option value="${rol.id}" ${usuario.rol_id === rol.id ? 'selected' : ''}>${rol.nombre}</option>`)
        .join('');
  
      // Mostrar SweetAlert con los datos cargados
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
            ${opcionesRol}
          </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          return {
            id: usuario.id,
            nombre: (document.getElementById('swal-nombre') as HTMLInputElement).value.trim(),
            apellidos: (document.getElementById('swal-apellidos') as HTMLInputElement).value.trim(),
            correo: (document.getElementById('swal-correo') as HTMLInputElement).value.trim(),
            telefono: (document.getElementById('swal-telefono') as HTMLInputElement).value.trim(),
            rol_id: parseInt((document.getElementById('swal-rol') as HTMLSelectElement).value, 10)
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
              this.authService.consultarUsuarios().subscribe();
              Swal.fire('¡Actualizado!', 'El usuario ha sido actualizado correctamente.', 'success');
            },
            error: (error) => {
              console.error('❌ Error al actualizar usuario:', error);
              Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
            }
          });
        }
      });
    }, (error) => {
      console.error('❌ Error al obtener roles:', error);
      Swal.fire('Error', 'No se pudieron cargar los roles.', 'error');
    });
  }

  // 🗑️ Eliminar usuario con SweetAlert2
  eliminarUsuario(usuario: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás al usuario: ${usuario.nombre} ${usuario.apellidos}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${environment.api.authApis}/usuarios/eliminar/${usuario.id}`;
        this.authService.http.delete(url).subscribe({
          next: () => {
            console.log('✅ Usuario eliminado');
            this.authService.consultarUsuarios().subscribe();
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
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
