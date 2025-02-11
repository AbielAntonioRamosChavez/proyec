import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import {UsuarioComponent} from './pages/catalogos/usuario/usuario.component';
import {ProductoComponent} from './pages/catalogos/producto/producto.component';
import { PerfilComponent } from '../catalogos/perfil/perfil.component';
import { DatospComponent } from './pages/datosp/datosp.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: PrincipalComponent
      },
      {
        path: 'usuarios',
        component: UsuarioComponent
      },
      {
        path: 'productos',
        component: ProductoComponent
      },
      {
        path: 'perfil', component: PerfilComponent
      },{path:'datosp',
        component:DatospComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
