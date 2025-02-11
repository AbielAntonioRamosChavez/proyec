import { Component, OnInit } from '@angular/core';// Define una interfaz para los datos del cliente

interface Cliente {
  imagen: string;
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-datosp',
  standalone:false,
  templateUrl: './datosp.component.html',
  styleUrls: ['./datosp.component.css']
})
export class DatospComponent implements OnInit {
  breadText: any = {
    'title': 'Cliente',
    'title2': 'Perfil',
    'title3': 'Datos personales',
  }
  
  cliente: Cliente = {
    imagen: 'https://static.vecteezy.com/system/resources/thumbnails/009/273/280/small/concept-of-loneliness-and-disappointment-in-love-sad-man-sitting-element-of-the-picture-is-decorated-by-nasa-free-photo.jpg', // URL de la imagen del cliente
    nombre: 'Abiel',
    email: 'abiel@gmail.com'
  };

 
  datosTabla = [
    { clave: 'Teléfono', valor: '2722979657' },
    { clave: 'Dirección', valor: 'Calle 1 av 3' },
    { clave: 'Ciudad', valor: 'Cordoba' },
    { clave: 'País', valor: 'Mexico' }
  ];

  // Columnas de la tabla
  columnasTabla = ['DATO', 'INFORMACIÓN'];

  constructor() {}

  ngOnInit(): void {}
}