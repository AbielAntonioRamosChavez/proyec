import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin.routing.module';
import {FooterComponent} from './template/footer/footer.component';
import {HeadermenuComponent} from './template/headermenu/headermenu.component';
import {SidemenuComponent} from './template/sidemenu/sidemenu.component';
import {AdminComponent} from './admin.component';
import {PrincipalComponent} from './pages/principal/principal.component';
import {BreadscrumbComponent} from './template/breadscrumb/breadscrumb.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UsuarioComponent} from './pages/catalogos/usuario/usuario.component';
import {ProductosComponent} from './pages/catalogos/productos/productos.component';
import { AgregarusuarioComponent } from './pages/catalogos/agregarusuario/agregarusuario.component';
import { GestiondeventasComponent } from './pages/catalogos/gestiondeventas/gestiondeventas.component';
import { PuntodeventaComponent } from './pages/catalogos/puntodeventa/puntodeventa.component';
import { EstadisticasComponent } from './pages/catalogos/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/catalogos/historial/historial.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    AdminComponent,
    PrincipalComponent,
    BreadscrumbComponent,
    UsuarioComponent,
    ProductosComponent,
    AgregarusuarioComponent,
    GestiondeventasComponent,
    PuntodeventaComponent,
    EstadisticasComponent,
    HistorialComponent,
    ProductosComponent,
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
  ]
})
export class AdminModule {}
