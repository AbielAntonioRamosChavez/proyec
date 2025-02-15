import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import {AdminModule} from './admin/admin.module';
import { RegisterComponent } from './auth/containers/register/register.component';
import {AppService} from './app.service';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './auth/token.interceptor';
import {ErrorAutenticateInterceptor} from './auth/ErrorAutenticateInterceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< HEAD
import { CobroDialogComponent } from './cobro-dialog/cobro-dialog.component';
=======
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogConfirmacionComponent } from './admin/pages/catalogos/dialogo-confirmacion/dialogo-confirmacion.component';

>>>>>>> c2657b46a99d224980253ce90a615cc020a149e0

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
<<<<<<< HEAD
    CobroDialogComponent,
=======
    MatDialogConfirmacionComponent
>>>>>>> c2657b46a99d224980253ce90a615cc020a149e0
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    AdminModule,
    AuthModule,
    MatDialogModule,
  ],
  
  providers: [
    provideClientHydration(withEventReplay()),
    AppService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorAutenticateInterceptor,
      multi: true,
    },
    provideAnimationsAsync()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
