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
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule, 
    ],
    exports: [  // 👈 Exportamos los componentes para usarlos fuera del módulo
        LoginComponent,
        Login2Component
    ]
})
export class AuthModule { }

