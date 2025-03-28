// catalogos.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosRoutingModule } from './catalogos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

// Componentes del módulo
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DialogoEditarUsuarioComponent } from './dialogo-editar-usuario/dialogo-editar-usuario.component';
import { MatDialogConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { PuntodeventaComponent } from './puntodeventa/puntodeventa.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductosComponent } from './productos/productos.component';
import { GestiondeventasComponent } from './gestiondeventas/gestiondeventas.component';
import { HistorialComponent } from './historial/historial.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CobroDialogComponent } from './puntodeventa/Mensaje/cobro-dialog/cobro-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AgregarusuarioComponent,
    UsuarioComponent,
    DialogoEditarUsuarioComponent,
    MatDialogConfirmacionComponent, 
    PuntodeventaComponent,
     ProductosComponent,
     GestiondeventasComponent, 
     HistorialComponent, 
     EstadisticasComponent, 
     CobroDialogComponent
  ],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    FormsModule,
    MatDialogModule, 
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatOptionModule,
    MatProgressBarModule
     // Importa MatDialogModule para los diálogos
  ],
  exports: [
    UsuarioComponent,
    DialogoEditarUsuarioComponent,
    MatDialogConfirmacionComponent // Exporta el componente para usarlo en otros módulos
  ]
})
export class CatalogosModule {}