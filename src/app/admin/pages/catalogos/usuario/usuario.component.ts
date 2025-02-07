import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: false,

  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  breadText: any = {
    'title': 'Catalogos',
    'title2': 'Usuarios',
    'title3': 'Listar registros',
  }
}
