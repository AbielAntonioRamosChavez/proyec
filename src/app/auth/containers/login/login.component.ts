import { Component } from '@angular/core';
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
   public form: FormGroup;
  isSubmited: boolean = false;
  public error = '';

  constructor(
    private _authService: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    });
  }

  public onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
        return;
    }

    // Cambia 'email' a 'correo' y 'password' a 'contrasena'
    const body = {
        correo: this.form.value.email.toLowerCase(), // Usar 'correo' en lugar de 'email'
        contrasena: this.form.value.password         // Usar 'contrasena' en lugar de 'password'
    };

    this._authService.login(body).pipe(
        tap((tokens: any) => {
            this._authService.doLoginUser(this.form.value.email, tokens);
        }),
        mapTo(true),
        catchError(error => {
            this.handleError(error);
            return of(false);
        })
    ).subscribe(res => {
        try {
            if (res) {
                setTimeout(() => {
                    const dataUser = JSON.parse(localStorage.getItem('USER_CURRENT') || '{}');
                    if (dataUser.tipo !== "checkin") {
                        this.router.navigate(['/pages']).then(() => {
                            this.isSubmited = false;
                        });
                    } else {
                        this.router.navigate(['/login']).then(() => {
                            this.isSubmited = false;
                        });
                    }
                }, 500);
            } else {
                this.isSubmited = false;
            }
        } catch (e) {
            console.error('Error al redirigir:', e);
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
