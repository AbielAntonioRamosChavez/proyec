import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    direccion: '',
    telefono: ''
  };
  confirmarContrasena: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  registrarUsuario() {
    if (!this.validarFormulario()) {
      return;
    }

    this.authService.registrarUsuario(this.usuario).subscribe({
      next: () => {
        this.mostrarMensaje('Registro exitoso', 'success');
        this.router.navigate(['/landing']);
      },
      error: (error) => {
        this.mostrarMensaje('Error: ' + error.error.message, 'error');
      }
    });
  }

  validarFormulario(): boolean {
    if (this.usuario.contrasena.length < 8) {
      this.mostrarMensaje('La contraseña debe tener al menos 8 caracteres', 'error');
      return false;
    }

    if (this.usuario.contrasena !== this.confirmarContrasena) {
      this.mostrarMensaje('Las contraseñas no coinciden', 'error');
      return false;
    }

    return true;
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: tipo === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}


