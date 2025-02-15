import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
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
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    AdminComponent,
    PrincipalComponent,
    BreadscrumbComponent,
    GestiondeventasComponent,
    PuntodeventaComponent,
    EstadisticasComponent,
    HistorialComponent,
    AdminComponent,
    UsuarioComponent,
    AgregarusuarioComponent,
  
    
  ],
  exports: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    BreadscrumbComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ProductosComponent
  ],
})
export class AdminModule {}
