import { Component, EventEmitter, Output, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();

  public form: FormGroup;
  public isSubmited: boolean = false;
  public error: string = '';
  public usuarioActual: any = null;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    this.usuarioActual = this._authService.getUser();

    if (document.getElementById("google-button")) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => this.handleGoogleSignIn(response)
      });

      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }
      );
    }
  }

  handleGoogleSignIn(response: any) {
    Swal.fire({
      title: 'Iniciando sesión',
      text: 'Autenticando con Google...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this._authService.loginWithGoogle(response.credential).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente con Google',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/landing']);
          });
        });
      },
      error: (err) => {
        console.error('Error en Google Sign-In:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message || 'No se pudo iniciar sesión con Google',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }

  public onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) return;

    const body = {
      correo: this.form.value.email.toLowerCase(),
      contrasena: this.form.value.password
    };

    this._authService.login(body).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.usuarioActual = response.user;
        localStorage.setItem('USER_CURRENT', JSON.stringify(response.user));

        if (response.user.rol_nombre === 'cliente') {
          this.router.navigate(['/landing']);
        } else {
          this.router.navigate(['/admin/puntodeventa']);
        }

        this.loginSuccess.emit();
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.handleError(err);
        this.isSubmited = false;
      }
    });
  }

  handleError(error: any) {
    switch (error.status) {
      case 401:
        this.error = error.error.message || 'Credenciales incorrectas. Verifique su usuario y contraseña.';
        break;
      case 400:
        this.error = 'Solicitud incorrecta. Verifique los datos ingresados.';
        break;
      case 500:
        this.error = 'Error interno del servidor. Inténtelo más tarde.';
        break;
      default:
        this.error = 'Ocurrió un error desconocido. Inténtelo de nuevo.';
        break;
    }

    setTimeout(() => this.error = '', 5000);
  }
}