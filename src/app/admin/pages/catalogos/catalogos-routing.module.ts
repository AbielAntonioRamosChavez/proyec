import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';

const routes: Routes = [
  {
    path: 'agregarusuario',
     component: AgregarusuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
