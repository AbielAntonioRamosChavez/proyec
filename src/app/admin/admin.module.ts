import { NgModule } from '@angular/core'; // ✅ Corregido: NgModule
import { CommonModule } from '@angular/common'; // ✅ Corregido: CommonModule
import { AdminRoutingModule } from './admin.routing.module'; // ✅ Corregido: AdminRoutingModule
import { FooterComponent } from './template/footer/footer.component';
import { HeadermenuComponent } from './template/headermenu/headermenu.component'; // ✅ Corregido: HeadermenuComponent
import { SidemenuComponent } from './template/sidemenu/sidemenu.component'; // ✅ Corregido: SidemenuComponent
import { AdminComponent } from './admin.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { BreadscrumbComponent } from './template/breadscrumb/breadscrumb.component'; // ✅ Corregido: BreadscrumbComponent
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // ✅ Corregido: ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // ✅ Corregido: HttpClientModule

// Componentes de Catálogos
import { UsuarioComponent } from './pages/catalogos/usuario/usuario.component';
import { ProductosComponent } from './pages/catalogos/productos/productos.component';
import { GestiondeventasComponent } from './pages/catalogos/gestiondeventas/gestiondeventas.component';
import { PuntodeventaComponent } from './pages/catalogos/puntodeventa/puntodeventa.component'; // ✅ Corregido: PuntodeventaComponent
import { EstadisticasComponent } from './pages/catalogos/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/catalogos/historial/historial.component';
import { UsuarioService } from '../auth/services/usuario.service';
import { AuthService } from '../auth/services/auth.service';


@NgModule({ // ✅ Corregido: NgModule
  declarations: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    AdminComponent,
    PrincipalComponent,
    BreadscrumbComponent,
    ProductosComponent,
    GestiondeventasComponent,
    PuntodeventaComponent,
    EstadisticasComponent,
    HistorialComponent,
    UsuarioComponent
  ],
  exports: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    BreadscrumbComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class AdminModule { }