import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-historial',
  standalone: false,
  
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  mensajes: any[] = []; // Define la propiedad mensajes como un array

  ngOnInit() {
    // Aquí puedes agregar lógica para inicializar mensajes si es necesario
    // Por ejemplo, puedes cargar mensajes de una fuente de datos o servicio
  }
}
