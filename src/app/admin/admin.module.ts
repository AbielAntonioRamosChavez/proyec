// admin.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Material Angular
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

// Componentes globales
import { FooterComponent } from './template/footer/footer.component';
import { HeadermenuComponent } from './template/headermenu/headermenu.component';
import { SidemenuComponent } from './template/sidemenu/sidemenu.component';
import { AdminComponent } from './admin.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { BreadscrumbComponent } from './template/breadscrumb/breadscrumb.component';
import { TextoinpComponent } from './template/textoinp/textoinp.component';

// Importar el módulo de catálogos
import { CatalogosModule } from './pages/catalogos/catalogos.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    AdminComponent,
    PrincipalComponent,
    BreadscrumbComponent,
    TextoinpComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    CatalogosModule // Importa CatalogosModule aquí
  ],
  exports: [
    FooterComponent,
    HeadermenuComponent,
    SidemenuComponent,
    BreadscrumbComponent,
    TextoinpComponent
  ]
})
export class AdminModule {}