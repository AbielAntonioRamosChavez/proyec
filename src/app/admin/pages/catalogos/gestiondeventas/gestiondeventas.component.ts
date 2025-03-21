// gestiondeventas.component.ts
import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../../auth/services/venta/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestiondeventas',
  standalone:false,
  templateUrl: './gestiondeventas.component.html',
  styleUrls: ['./gestiondeventas.component.css'],
})
export class GestiondeventasComponent implements OnInit {
  ventas: any[] = [];
  modalDetallesVisible = false;
  ventaSeleccionada: any = null;

  constructor(private ventaService: VentaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  // Cargar la lista de ventas
  cargarVentas() {
    this.ventaService.obtenerVentas().subscribe(
      (data) => {
        this.ventas = data;
      },
      (error) => {
        console.error('Error al cargar ventas:', error);
      }
    );
  }

  // Redirigir al punto de venta
  mostrarFormularioNuevaVenta() {
    this.router.navigate(['/admin/puntodeventa']);
  }

  // Ver detalles de una venta
  verDetalles(venta: any) {
    this.ventaSeleccionada = venta;
    this.modalDetallesVisible = true;
  }

  // Cerrar el modal de detalles
  cerrarModal() {
    this.modalDetallesVisible = false;
    this.ventaSeleccionada = null;
  }
}