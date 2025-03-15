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

@NgModule({    
    declarations: [
        Login2Component,
        LoginComponent,
    ],
    providers: [
        AuthGuard,
        AuthService,
        RandomGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule, // ❌ Eliminé el duplicado
    ],
    exports: [  // 👈 Esto es útil si otros módulos necesitan estos componentes
        LoginComponent,
        Login2Component
    ]
})
export class AuthModule { }

