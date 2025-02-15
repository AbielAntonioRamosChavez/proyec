import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { FooterComponent } from './template/footer/footer.component';
import { HeadermenuComponent } from './template/headermenu/headermenu.component';
import { SidemenuComponent } from './template/sidemenu/sidemenu.component';
import { AdminComponent } from './admin.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { BreadscrumbComponent } from './template/breadscrumb/breadscrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './pages/catalogos/usuario/usuario.component';
import { ProductosComponent } from './pages/catalogos/productos/productos.component';
import { AgregarusuarioComponent } from './pages/catalogos/agregarusuario/agregarusuario.component';
import { GestiondeventasComponent } from './pages/catalogos/gestiondeventas/gestiondeventas.component';
import { PuntodeventaComponent } from './pages/catalogos/puntodeventa/puntodeventa.component';
import { EstadisticasComponent } from './pages/catalogos/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/catalogos/historial/historial.component';

// Material Angular
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

// Componentes adicionales
import { CobroDialogComponent } from './pages/catalogos/puntodeventa/Mensaje/cobro-dialog/cobro-dialog.component';
import { DialogoEditarUsuarioComponent } from './pages/catalogos/dialogo-editar-usuario/dialogo-editar-usuario.component';

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
    ProductosComponent,
    CobroDialogComponent,
    UsuarioComponent,
    AgregarusuarioComponent,
    DialogoEditarUsuarioComponent
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
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [
  ]
})
export class AdminModule {}

