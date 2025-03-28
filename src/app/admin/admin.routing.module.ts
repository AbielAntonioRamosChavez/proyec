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
import { RoleGuard } from '../guards/role.guard';
import { ProveedoresComponent } from './pages/catalogos/proveedores/proveedores.component';
import { CategoriasComponent } from './pages/catalogos/categorias/categorias.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: PrincipalComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'empleado'] } // ✅ Ambos pueden acceder
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] } // ❌ Solo el administrador
      },
      {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'empleado'] }
      },
      {
        path: 'agregarusuario',
        component: AgregarusuarioComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] } // ❌ Solo el administrador
      },
      {
        path: 'gestiondeventas',
        component: GestiondeventasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'empleado'] }
      },
      {
        path: '',
        redirectTo: 'puntodeventa',
        pathMatch: 'full',
      },
      {
        path: 'puntodeventa',
        component: PuntodeventaComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'empleado'] } // Roles permitidos
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] } // ❌ Solo el administrador
      },
      {
        path: 'historial',
        component: HistorialComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] } // ❌ Solo el administrador
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] } // ❌ Solo el administrador
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] } // ❌ Solo el administrador
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
