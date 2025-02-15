import { Component, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  styleUrl: './puntodeventa.component.css'
})
export class PuntodeventaComponent {

  productos: Producto[] = [
    { codigo: '1', descripcion: 'TUINKY VAINILLA 152 GR', precio: 10.00, cantidad: 1 },
    { codigo: '2', descripcion: 'Red Bull 250ml', precio: 22.00, cantidad: 1 },
    { codigo: '3', descripcion: 'Coca Cola 1 1/4lt', precio: 18.00, cantidad: 1 },
    { codigo: '4', descripcion: 'Pan Blanco Classic 454g', precio: 25.00, cantidad: 1 },
    { codigo: '5', descripcion: 'Gansito Doble Chocolate 52 Gr.', precio: 5.00, cantidad: 1 },
    { codigo: '6', descripcion: 'Huevo Kinder 20gr', precio: 13.50, cantidad: 1 },
    { codigo: 'PIMIENTA', descripcion: 'Pimienta Sobre', precio: 2.50, cantidad: 1 },
    { codigo: '9', descripcion: 'Alpura 2000 Clásica 1Lt', precio: 13.50, cantidad: 1 },
  ]; 


total: string | number | undefined;
eliminarProducto(_t114: any) {
throw new Error('Method not implemented.');
}

  protected readonly value = signal('');


  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  ngModel(){
    
  }

  productosEnVenta = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['codigo', 'descripcion', 'precio', 'cantidad', 'importe', 'acciones'];
  codigoBusqueda: string = '';
  cantidadAgregar: number = 1; // Initialize cantidadAgregar

  // ... (rest of your component code)

  buscarProducto() {
    const productoEncontrado = this.productos.find((producto: { codigo: string; }) => producto.codigo === this.codigoBusqueda);
    if (productoEncontrado) {
      this.agregarProducto(productoEncontrado);
    } else {
      alert('Producto no encontrado');
    }
    this.codigoBusqueda = ''; // Limpiar el campo de búsqueda
  }

  agregarProducto(producto: any = null) { // Make producto optional
    if (!producto) { // If no product is passed, use the form values
      producto = this.productos.find((p: { codigo: string; }) => p.codigo === this.codigoBusqueda);
      if (!producto) {
        alert('Producto no encontrado');
        return;
      }
    }

    const data = this.productosEnVenta.data;
    const productoExistente = data.find(p => p.codigo === producto.codigo);
    if (productoExistente) {
      productoExistente.cantidad += this.cantidadAgregar; // Add cantidadAgregar
    } else {
      data.push({ ...producto, cantidad: this.cantidadAgregar }); // Add cantidadAgregar
    }
    this.productosEnVenta.data = data;
    this.calcularTotal();
    this.codigoBusqueda = ''; // Clear input fields
    this.cantidadAgregar = 1; // Reset cantidadAgregar
  }
  calcularTotal() {
    throw new Error('Method not implemented.');
  }

  // ... (rest of your component code)


}
