import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { RandomGuard } from './guards/random.guard';
import { Login2Component } from './containers/login2/login2.component';
import { LoginFormComponent } from './containers/login-from/login-from.component';
import { LoginComponent } from './containers/login/login.component';
import { TokenInterceptor } from './token.interceptor';


@NgModule({    
    declarations: [
        Login2Component,
        LoginComponent,
        LoginFormComponent
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
    exports: [  // 👈 Agregar esta línea
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AuthModule { }
