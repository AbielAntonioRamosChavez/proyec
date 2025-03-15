import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting, ServerRoute, RenderMode } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { routes as clientRoutes } from './app.routes';

// 🔹 Convertir las rutas a ServerRoute[]
const serverRoutes: ServerRoute[] = clientRoutes
  .filter(route => typeof route.path === 'string') // 👈 Filtra rutas válidas
  .map(route => ({
    path: route.path!,
    renderMode: route.data?.['renderMode'] ? RenderMode.Server : RenderMode.Client, // ✅ Corrige el tipo
  }));

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    provideServerRouting(serverRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}





