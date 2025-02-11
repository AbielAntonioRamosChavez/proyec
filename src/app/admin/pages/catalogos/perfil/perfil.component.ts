import { Component, OnInit } from '@angular/core';
interface Cliente {
  imagen: string;
  nombre: string;
  email: string;
}


@Component({
  selector: 'app-perfil',
  standalone: false,
  
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent  implements OnInit{
  breadText: any = {
    'title': 'Cliente',
    'title2': 'Perfil',
    'title3': 'Datos personales',
  }
  
  cliente: Cliente = {
    imagen: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anBnfGVufDB8fDB8fHww', // URL de la imagen del cliente
    nombre: 'Abiel',
    email: 'abiel@gmail.com'
  };

 
  datosTabla = [
    { clave: 'Teléfono', valor: '2711394066' },
    { clave: 'Dirección', valor: 'Calle 1 av 3' },
    { clave: 'Ciudad', valor: 'Orizaba' },
    { clave: 'País', valor: 'Mexico' }
  ];

  // Columnas de la tabla
  columnasTabla = ['DATO', 'INFORMACIÓN'];

  constructor() {}

  ngOnInit(): void {}

}
