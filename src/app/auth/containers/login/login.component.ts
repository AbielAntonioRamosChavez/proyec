import { Component, EventEmitter, Output,OnInit, NgZone  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

declare var google: any; // Evita errores de TypeScript con Google Sign-In

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>(); // Evento que notifica el éxito del login

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
    } else {
      console.warn("⚠️ No se encontró el botón de Google Sign-In en el DOM.");
    }
  }

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

    public onSubmit() {
      this.isSubmited = true;
      if (this.form.invalid) return;
    
      const body = {
        correo: this.form.value.email.toLowerCase(),
        contrasena: this.form.value.password
      };
    
      this._authService.login(body).subscribe({
        next: (response) => {
          console.log('🚀 Login exitoso:', response);
          this.usuarioActual = response.user;
    
          // Guardamos el usuario en localStorage
          localStorage.setItem('USER_CURRENT', JSON.stringify(response.user));
    
          // Verificar el rol del usuario para redirigirlo a la vista correcta
          if (response.user.rol === 'cliente') {
            this.router.navigate(['/landing']);
          } else {
            this.router.navigate(['/admin/puntodeventa']);
          }
    
          this.loginSuccess.emit();
        },
        error: (err) => {
          console.error('❌ Error en login:', err);
          console.log('🛠️ Respuesta completa del error:', err.error);
          this.handleError(err);
          this.isSubmited = false;
        }
      });
    }
    

    handleError(error: any) {
      switch (error.status) {
        case 401:
          this.error = error.error.message || '❌ Credenciales incorrectas. Verifique su usuario y contraseña.';
          break;
        case 400:
          this.error = '⚠️ Solicitud incorrecta. Verifique los datos ingresados.';
          break;
        case 500:
          this.error = '⚠️ Error interno del servidor. Inténtelo más tarde.';
          break;
        default:
          this.error = '⚠️ Ocurrió un error desconocido. Inténtelo de nuevo.';
          break;
      }
    
      console.error('❌ Error en el login:', error);
      console.log('🛠️ Respuesta completa del error:', error.error);
    
      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => this.error = '', 5000);
    }
}