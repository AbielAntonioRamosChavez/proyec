import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  standalone: false,
  
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    const salesData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Ventas',
        data: [120, 190, 30, 50, 80, 120],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    new Chart(ctx, {
      type: 'bar',
      data: salesData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}