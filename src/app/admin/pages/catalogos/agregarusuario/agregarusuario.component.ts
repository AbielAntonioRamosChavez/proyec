import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarusuario',
  standalone: false,
  templateUrl: './agregarusuario.component.html',
  styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent implements OnInit {
  rolesDisponibles: any[] = [];
  mensajeError: string = '';

  nuevoUsuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol_id: '', // Usamos rol_id en lugar de rol
    fecha_creacion: this.obtenerFechaHoy(),
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.authService.obtenerRoles().subscribe(
      (roles: any[]) => {
        // Filtrar para excluir el rol de cliente (ID 2 según tu DB)
        this.rolesDisponibles = roles.filter(rol => rol.id !== 2);
      },
      error => {
        console.error('Error al cargar roles:', error);
        this.mensajeError = 'Error al cargar los roles disponibles';
      }
    );
  }

  registrarUsuario() {
    this.mensajeError = '';

    // Validaciones
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.apellidos || 
        !this.nuevoUsuario.correo || !this.nuevoUsuario.rol_id) {
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

    // Verificar token
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) {
        console.error('❌ No hay token, el usuario no está autenticado.');
        this.mensajeError = '⚠️ No tienes permisos para registrar usuarios. Inicia sesión.';
        return;
    }

    // Preparar datos para el backend
    const datosUsuario = {
      nombre: this.nuevoUsuario.nombre,
      apellidos: this.nuevoUsuario.apellidos,
      correo: this.nuevoUsuario.correo,
      telefono: this.nuevoUsuario.telefono,
      direccion: this.nuevoUsuario.direccion,
      rol_id: Number(this.nuevoUsuario.rol_id)
   };

    // Registrar usuario administrativo (ya que filtramos el rol cliente)
    this.authService.registerAdmin(datosUsuario).subscribe({
        next: (response) => {
            Swal.fire({
                title: '¡Éxito!',
                text: response.message || 'Usuario registrado correctamente',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: '👤 Ver usuarios',
                cancelButtonText: '➕ Agregar otro usuario',
                timer: 5000,
                timerProgressBar: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.irAUsuarios();
                    this.authService.consultarUsuarios().subscribe();
                } else {
                    this.resetFormulario();
                }
            });
        },
        error: (error) => {
            console.error('❌ Error al registrar usuario:', error);
            
            let mensaje = error.message || '⚠️ Ocurrió un error inesperado. Inténtalo nuevamente.';
            
            Swal.fire({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                confirmButtonText: 'OK'
            });

            this.mensajeError = mensaje;
        }
    });
  }

  resetFormulario() {
    this.nuevoUsuario = {
      nombre: '',
      apellidos: '',
      correo: '',
      telefono: '',
      direccion: '',
      rol_id: '',
      fecha_creacion: this.obtenerFechaHoy(),
    };
  }

  validarCorreo(correo: string): boolean {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexCorreo.test(correo);
  }

  obtenerFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  irAUsuarios() {
    this.router.navigate(['admin/usuarios']);
  }
}