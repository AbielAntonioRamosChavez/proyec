import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AdminModule } from './admin/admin.module'; // ✅ Importación del módulo de administración
import { RegisterComponent } from './auth/containers/register/register.component';
import { AppService } from './app.service';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { ErrorAutenticateInterceptor } from './auth/ErrorAutenticateInterceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module'; // ✅ Módulo de autenticación
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog'; // ✅ Angular Material para diálogos
import { RouterModule } from '@angular/router'; // ✅ Importación necesaria para router-outlet


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,   // Necesario para soporte de rutas
    AppRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    AuthModule,
    MatDialogModule,
    RouterModule,
    AuthModule
  ],
  providers: [
    provideClientHydration(),
    AppService,
    { provide: APP_BASE_HREF, useValue: '/' },
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
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


