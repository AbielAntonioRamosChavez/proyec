import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { DialogoEditarUsuarioComponent } from './dialogo-editar-usuario/dialogo-editar-usuario.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    FormsModule
  ]
})
export class CatalogosModule { }
