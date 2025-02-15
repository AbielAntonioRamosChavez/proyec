import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarusuarioComponent
  ],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    FormsModule
  ]
})
export class CatalogosModule { }
