
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './auth/containers/register/register.component';
import { AppService } from './app.service';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { ErrorAutenticateInterceptor } from './auth/ErrorAutenticateInterceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { RoleGuard } from './guards/role.guard';
import { CatalogosModule } from './admin/pages/catalogos/catalogos.module'; // Importa CatalogosModule

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent
    // Elimina MatDialogConfirmacionComponent de aquí
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AuthModule,
    CatalogosModule,
    FormsModule // Importa CatalogosModule para acceder a sus componentes exportados
  ],
  providers: [
    provideClientHydration(),
    AppService,
    RoleGuard,
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
export class AppModule {}