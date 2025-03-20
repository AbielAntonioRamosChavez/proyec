import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  @Output() loginSuccess = new EventEmitter<void>();
  public form: FormGroup;
  isSubmited: boolean = false;
  public error = '';

  constructor(
    private _authService: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public onSubmit() {
    this.isSubmited = true;

    if (this.form.invalid) {
      return;
    }

    const body = {
      correo: this.form.value.email.toLowerCase(),
      contrasena: this.form.value.password
    };

    this._authService.loginCliente(body).subscribe({
      next: (response) => {
        console.log('🚀 Login exitoso:', response);
        this.loginSuccess.emit(); // Emitir evento de éxito
        setTimeout(() => {
          const dataUser = JSON.parse(localStorage.getItem('USER_CURRENT') || '{}');
          if (dataUser.rol === "cliente") {
            this.router.navigate(['/landing']).then(() => {
              this.isSubmited = false;
            });
          } else {
            this.error = 'Acceso no autorizado para este tipo de usuario.';
            this.isSubmited = false;
          }
        }, 500);
      },
      error: (err) => {
        this.handleError(err);
        this.isSubmited = false;
      }
    });
  }

  handleError(error: any) {
    if (error.status === 401) {
      this.error = error.error.message || 'Credenciales incorrectas. Inténtelo de nuevo.';
    } else if (error.status === 400) {
      this.error = 'Solicitud incorrecta. Verifique los datos ingresados.';
    } else if (error.status === 500) {
      this.error = 'Error interno del servidor. Inténtelo más tarde.';
    } else {
      this.error = 'Ocurrió un error desconocido. Inténtelo de nuevo.';
    }
    console.error('Error en el login:', error);
    setTimeout(() => {
      this.error = '';
    }, 5000);
  }
}