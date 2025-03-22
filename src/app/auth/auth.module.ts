import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { RandomGuard } from './guards/random.guard';
import { Login2Component } from './containers/login2/login2.component';
import { LoginComponent } from './containers/login/login.component';
import { TokenInterceptor } from './token.interceptor';

// ✅ Importamos los módulos de Google Sign-In
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

// ✅ Importamos el entorno (environment) para el CLIENT_ID
import { environment } from '../../environments/environment';


@NgModule({    
    declarations: [
        LoginComponent,
        Login2Component,
        
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
            provide: 'SocialAuthServiceConfig',  // ✅ Configuración de Google Sign-In
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(environment.googleClientId) // ✅ Usamos el CLIENT_ID del environment
                    }
                ],
                onError: (err) => {
                    console.error('❌ Error en Google Sign-In:', err);
                }
            } as SocialAuthServiceConfig,
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule // ✅ Importamos el módulo de Google Sign-In
    ],
    exports: [
        LoginComponent,
        Login2Component
    ]
})
export class AuthModule { }



