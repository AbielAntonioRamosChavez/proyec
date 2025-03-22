import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { RandomGuard } from './guards/random.guard';
import { TokenInterceptor } from './token.interceptor';

// ✅ Importamos los componentes standalone en "imports"
import { LoginComponent } from './containers/login/login.component';
import { Login2Component } from './containers/login2/login2.component';
import { RegisterComponent } from './containers/register/register.component';

// ✅ Google Sign-In
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../../environments/environment';

// ✅ Importa Angular Material si usas MatSnackBar
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        LoginComponent,
        Login2Component,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        MatSnackBarModule
    ],
    exports: [
        LoginComponent,
        Login2Component,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        RandomGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(environment.googleClientId)
                    }
                ],
                onError: (err) => {
                    console.error('❌ Error en Google Sign-In:', err);
                }
            } as SocialAuthServiceConfig,
        }
    ]
})
export class AuthModule { }





