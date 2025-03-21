import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>(); // Evento que notifica el éxito del login

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

    this._authService.login(body).pipe(
      tap((tokens: any) => {
        this._authService.doLoginUser(this.form.value.email, tokens);
      }),
      mapTo(true),
        catchError(error => {
        console.error('❌ Error en login:', error);
        console.log('🛠️ Respuesta completa del error:', error.error); // 🔍 Verifica el mensaje del backend
        this.handleError(error);
        return of(false);
    })
    ).subscribe(res => {
      if (res) {
        this.loginSuccess.emit();
        this.router.navigate(['/admin/puntodeventa']); // Eliminar el setTimeout
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