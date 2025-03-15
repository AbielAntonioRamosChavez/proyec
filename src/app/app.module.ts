import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // ✅ Importado correctamente
import { LandingComponent } from './landing/landing.component';
import { AdminModule } from './admin/admin.module';
import { RegisterComponent } from './auth/containers/register/register.component';
import { AppService } from './app.service';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { ErrorAutenticateInterceptor } from './auth/ErrorAutenticateInterceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // ✅ Importamos las rutas correctamente
import { MatDialogConfirmacionComponent } from './admin/pages/catalogos/dialogo-confirmacion/dialogo-confirmacion.component';


@NgModule({
  declarations: [
    AppComponent,  // ✅ Ahora es parte de declarations
    LandingComponent,
    RegisterComponent,
    MatDialogConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AdminModule,
    AuthModule,
    MatDialogModule
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
  bootstrap: [AppComponent] // ✅ Ahora se usa correctamente aquí
})
export class AppModule { }


