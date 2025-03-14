import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import {UsuarioComponent} from './pages/catalogos/usuario/usuario.component';
import {ProductosComponent} from './pages/catalogos/productos/productos.component';
import { AgregarusuarioComponent } from './pages/catalogos/agregarusuario/agregarusuario.component';
import { GestiondeventasComponent } from './pages/catalogos/gestiondeventas/gestiondeventas.component';
import { PuntodeventaComponent } from './pages/catalogos/puntodeventa/puntodeventa.component';
import { EstadisticasComponent } from './pages/catalogos/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/catalogos/historial/historial.component';

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
        component: ProductosComponent
      },
      {
        path:'agregarusuario',
        component: AgregarusuarioComponent
      },
      {
        path:'gestiondeventas',
        component: GestiondeventasComponent
      },
      {
        path:'', redirectTo: 'puntodeventa', pathMatch: 'full',
      },
      {
        path:'puntodeventa',
        component: PuntodeventaComponent
      },
      {
        path:'estadisticas',
        component: EstadisticasComponent
      },
      {
        path:'historial',
        component: HistorialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
