import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
