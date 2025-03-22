import { Component, EventEmitter, Output, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

declare var google: any; // Evita errores de TypeScript con Google Sign-In

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
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
    // Cargar usuario almacenado en localStorage si existe
    this.usuarioActual = this._authService.getUser();

    // Inicializa Google Sign-In
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleSignIn(response)
    });

    // Renderiza el botón de Google Sign-In
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large" }
    );
  }

  /**
   * Maneja la autenticación con Google
   */
  handleGoogleSignIn(response: any) {
    console.log('✅ Token de Google recibido:', response.credential);
  
    this._authService.loginWithGoogle(response.credential).subscribe({
      next: res => {
        console.log('✅ Login exitoso:', res);
        this.usuarioActual = res.user;
        localStorage.setItem('USER_CURRENT', JSON.stringify(res.user));
  
        // 🔄 Redirige a la landing dentro de NgZone
        this.ngZone.run(() => {
          console.log("🚀 Redirigiendo a /landing...");
          this.router.navigate(['/landing']);
        });
      },
      error: err => {
        console.error('❌ Error en Google Sign-In:', err);
      }
    });
  }

  /**
   * Maneja el login con correo y contraseña
   */
  public onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) return;

    const body = {
      correo: this.form.value.email.toLowerCase(),
      contrasena: this.form.value.password
    };

    this._authService.loginCliente(body).subscribe({
      next: (response) => {
        console.log('🚀 Login exitoso:', response);
        this.usuarioActual = response.user;
        localStorage.setItem('USER_CURRENT', JSON.stringify(response.user));
        this.loginSuccess.emit();
        this.router.navigate(['/landing']);
      },
      error: (err) => {
        this.handleError(err);
        this.isSubmited = false;
      }
    });
  }

  /**
   * Cierra sesión del usuario
   */
  logout(): void {
    this._authService.logout();
    this.usuarioActual = null;
    localStorage.removeItem('USER_CURRENT');
    this.router.navigate(['/login2']); // Redirigir al login
  }

  /**
   * Maneja los errores en el login
   */
  handleError(error: any) {
    if (error.status === 401) {
      this.error = 'Credenciales incorrectas.';
    } else if (error.status === 400) {
      this.error = 'Solicitud incorrecta.';
    } else if (error.status === 500) {
      this.error = 'Error del servidor.';
    } else {
      this.error = 'Error desconocido.';
    }
    console.error('Error en el login:', error);
    setTimeout(() => this.error = '', 5000);
  }
}



