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
<<<<<<< HEAD
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { CobroDialogComponent } from './pages/catalogos/puntodeventa/Mensaje/cobro-dialog/cobro-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
=======
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

>>>>>>> c2657b46a99d224980253ce90a615cc020a149e0

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
<<<<<<< HEAD
    ProductosComponent,
    CobroDialogComponent
=======
    AdminComponent,
    UsuarioComponent,
    AgregarusuarioComponent,
  
    
>>>>>>> c2657b46a99d224980253ce90a615cc020a149e0
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
<<<<<<< HEAD
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatDialogModule
=======
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ProductosComponent
>>>>>>> c2657b46a99d224980253ce90a615cc020a149e0
  ],
})
export class AdminModule {}
