import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { RandomGuard } from './guards/random.guard';
import {LoginModule} from './containers/login/login.module';

@NgModule({
    declarations: [],
    providers: [
        AuthGuard,
        AuthService,
        RandomGuard,
    ],
    imports: [
        LoginModule,
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule { }
