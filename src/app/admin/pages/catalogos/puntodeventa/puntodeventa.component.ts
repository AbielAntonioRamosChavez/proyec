import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CobroDialogComponent } from './Mensaje/cobro-dialog/cobro-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Producto {
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-puntodeventa',
  standalone: false,
  templateUrl: './puntodeventa.component.html',
  styleUrls: ['./puntodeventa.component.css']
})
export class PuntodeventaComponent implements OnInit {

  productosEnVenta: MatTableDataSource<Producto> = new MatTableDataSource<Producto>([]);
  displayedColumns: string[] = ['codigo', 'descripcion', 'precio', 'cantidad', 'importe', 'acciones'];
  codigoBusqueda: string = '';
  cantidadAgregar: number = 1;
  total: number = 0;
  resultsLength: number = 0;

  ngOnInit() {
    // Datos iniciales de productos (puedes cargarlos desde una API)
    const datosIniciales: Producto[] = [
      { codigo: '1', descripcion: 'Coca-Cola', precio: 15, cantidad: 1 },
      { codigo: '2', descripcion: 'Pan Blanco', precio: 25, cantidad: 1 },
      { codigo: '3', descripcion: 'Leche Alpura', precio: 18, cantidad: 1 },
      { codigo: '4', descripcion: 'Galletas', precio: 10, cantidad: 1 },
    ];

    this.productosEnVenta.data = datosIniciales;
    this.resultsLength = datosIniciales.length;
    this.calcularTotal();
  }

  buscarProducto() {
    const productoEncontrado = this.productosEnVenta.data.find(p => p.codigo === this.codigoBusqueda);
    if (productoEncontrado) {
      this.agregarProducto(productoEncontrado);
    } else {
      alert('Producto no encontrado');
    }
    this.codigoBusqueda = '';
  }

  agregarProducto(producto: Producto) {
    const data = this.productosEnVenta.data;
    const productoExistente = data.find(p => p.codigo === producto.codigo);

    if (productoExistente) {
      productoExistente.cantidad += this.cantidadAgregar;
    } else {
      data.push({ ...producto, cantidad: this.cantidadAgregar });
    }

    this.productosEnVenta.data = data;
    this.resultsLength = this.productosEnVenta.data.length;
    this.calcularTotal();
    this.codigoBusqueda = '';
    this.cantidadAgregar = 1;
  }

  eliminarProducto(index: number) {
    const data = this.productosEnVenta.data;
    data.splice(index, 1);
    this.productosEnVenta.data = data;
    this.resultsLength = this.productosEnVenta.data.length;
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.productosEnVenta.data.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  vaciarTabla() {
    this.productosEnVenta.data = [];
    this.resultsLength = 0;
    this.calcularTotal();
  }

  // Nueva función para agregar productos directamente por código
  agregarProductoPorCodigo() {
    const productoEncontrado = this.productosEnVenta.data.find(p => p.codigo === this.codigoBusqueda);
    if (productoEncontrado) {
      this.agregarProducto(productoEncontrado);
    } else {
      alert('Producto no encontrado');
    }
    this.codigoBusqueda = '';
  }
  constructor(public dialog: MatDialog) {}

  cobrar() {
    if (this.total > 0) {
      const dialogRef = this.dialog.open(CobroDialogComponent, {
        width: '400px',
        data: { total: this.total }
      });

      dialogRef.afterClosed().subscribe((result: { cambio: number; }) => {
        if (result) {
          alert(`Cobro exitoso. Cambio: ${result.cambio}`);
          this.vaciarTabla();
        }
      });
    } else {
      alert('No hay productos en la venta.');
    }
  }
}