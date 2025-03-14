import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { routes } from './app.routes';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    provideServerRouting(routes), // Usa el nuevo tipo de rutas aquí
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}



