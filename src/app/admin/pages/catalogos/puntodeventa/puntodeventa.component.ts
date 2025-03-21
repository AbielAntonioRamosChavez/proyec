import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CobroDialogComponent } from './Mensaje/cobro-dialog/cobro-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../../auth/services/producto/producto.service';
import { VentaService } from '../../../../auth/services/venta/venta.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { HostListener } from '@angular/core';

interface Producto {
  id: number; // Cambiado para usar el ID del producto
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-puntodeventa',
  standalone: false,
  templateUrl: './puntodeventa.component.html',
  styleUrls: ['./puntodeventa.component.css'],
})
export class PuntodeventaComponent implements OnInit {
  productosEnVenta: MatTableDataSource<Producto> = new MatTableDataSource<Producto>([]);
  displayedColumns: string[] = ['codigo', 'descripcion', 'precio', 'cantidad', 'importe', 'acciones'];
  codigoBusqueda: string = '';
  cantidadAgregar: number = 1;
  total: number = 0;
  resultsLength: number = 0;
  clienteId: number = 2;

  // Propiedades para el cliente
  nombreCliente: string = 'VENTA DE CONTADO';
  telefonoCliente: string = '0';
  direccionCliente: string = 'GENERAL';

  constructor(
    public dialog: MatDialog,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Inicializar la tabla sin productos
    this.productosEnVenta.data = [];
    this.resultsLength = 0;
    this.calcularTotal();
  }

  // Vaciar el campo de nombre del cliente al enfocarse
  onFocusCliente() {
    if (this.nombreCliente === 'VENTA DE CONTADO') {
      this.nombreCliente = '';
    }
  }

  // Restaurar el texto por defecto al perder el foco (si está vacío)
  onBlurCliente() {
    if (!this.nombreCliente.trim()) {
      this.nombreCliente = 'VENTA DE CONTADO';
    }
  }

  // Buscar cliente por correo con F2
  @HostListener('document:keydown.f2', ['$event'])
  buscarCliente(event?: KeyboardEvent) {
    if (event) event.preventDefault();
    const correoCliente = this.nombreCliente;
    this.authService.buscarUsuarioPorCorreo(correoCliente).subscribe(
      (usuario) => {
        if (usuario) {
          this.nombreCliente = usuario.nombre;
          this.telefonoCliente = usuario.telefono || '0';
          this.direccionCliente = usuario.direccion || 'GENERAL';
          this.clienteId = usuario.id;
        } else {
          alert('Cliente no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar cliente:', error);
        alert('Error al buscar cliente');
      }
    );
  }

  // Buscar producto por código
  buscarProducto() {
    if (!this.codigoBusqueda) {
      alert('Ingrese un código de producto');
      return;
    }

    this.productoService.obtenerProductoPorId(+this.codigoBusqueda).subscribe(
      (producto) => {
        if (producto) {
          const productoAgregar: Producto = {
            id: producto.id,
            codigo: producto.sku,
            descripcion: producto.nombre,
            precio: +producto.precio,
            cantidad: this.cantidadAgregar,
          };
          this.agregarProducto(productoAgregar);
        } else {
          alert('Producto no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar producto:', error);
        alert('Error al buscar producto');
      }
    );
  }

  // Agregar producto a la venta
  agregarProducto(producto: Producto) {
    const data = this.productosEnVenta.data;
    const productoExistente = data.find((p) => p.codigo === producto.codigo);

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

  // Eliminar producto de la venta
  eliminarProducto(index: number) {
    const data = this.productosEnVenta.data;
    data.splice(index, 1);
    this.productosEnVenta.data = data;
    this.resultsLength = this.productosEnVenta.data.length;
    this.calcularTotal();
  }

  // Calcular el total de la venta
  calcularTotal() {
    this.total = this.productosEnVenta.data.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  // Vaciar la tabla de productos
  vaciarTabla() {
    this.productosEnVenta.data = [];
    this.resultsLength = 0;
    this.calcularTotal();
  }

  // Borrar datos del cliente y la tabla
  borrarDatos() {
    this.vaciarTabla();
    this.limpiarDatosCliente();
  }

  limpiarDatosCliente() {
    this.nombreCliente = 'VENTA DE CONTADO';
    this.telefonoCliente = '0';
    this.direccionCliente = 'GENERAL';
    this.clienteId = 2; // Restablecer el ID del cliente al valor por defecto
  }

  // Cobrar la venta
  cobrar() {
    if (this.total > 0) {
      const dialogRef = this.dialog.open(CobroDialogComponent, {
        width: '400px',
        data: { total: this.total },
      });

      dialogRef.afterClosed().subscribe((result: { cambio: number }) => {
        if (result) {
          this.crearVenta();
          alert(`Cobro exitoso. Cambio: ${result.cambio}`);
          this.vaciarTabla();
          this.borrarDatos();
        }
      });
    } else {
      alert('No hay productos en la venta.');
    }
  }

  crearVenta() {
    const productosParaVenta = this.productosEnVenta.data.map((producto) => ({
      producto: producto.id,
      cantidad: producto.cantidad,
    }));

    const ventaData = {
      cliente: this.clienteId, // Usar el ID del cliente buscado o el valor por defecto
      productos: productosParaVenta,
    };

    this.ventaService.crearVenta(ventaData).subscribe(
      (response) => {
        console.log('Venta creada:', response);
      },
      (error) => {
        console.error('Error al crear la venta:', error);
        alert('Error al crear la venta');
      }
    );
  }

  // Método para agregar producto por código
  agregarProductoPorCodigo() {
    if (!this.codigoBusqueda) {
      alert('Ingrese un código de producto');
      return;
    }

    // Buscar producto por SKU
    this.productoService.obtenerProductoPorSku(this.codigoBusqueda).subscribe(
      (producto) => {
        if (producto) {
          const productoAgregar: Producto = {
            id: producto.id,
            codigo: producto.sku,
            descripcion: producto.nombre,
            precio: +producto.precio,
            cantidad: this.cantidadAgregar,
          };
          this.agregarProducto(productoAgregar);
        } else {
          alert('Producto no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar producto:', error);
        alert('Error al buscar producto');
      }
    );
  }

  actualizarCantidad(producto: Producto) {
    if (producto.cantidad < 1) {
      producto.cantidad = 1; // Asegurar que la cantidad no sea menor que 1
    }
    this.calcularTotal(); // Recalcular el total
  }

  // Atajo para agregar producto por código (Enter)
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (this.codigoBusqueda) {
      this.agregarProductoPorCodigo();
    }
  }

  // Atajo para vaciar la tabla (Supr)
  @HostListener('document:keydown.delete', ['$event'])
  onVaciarTabla(event: KeyboardEvent) {
    event.preventDefault();
    this.vaciarTabla();
  }

  // Atajo para borrar datos (Ctrl + D)
  @HostListener('document:keydown.control.d', ['$event'])
  onBorrarDatos(event: KeyboardEvent) {
    event.preventDefault();
    this.borrarDatos();
  }

   // Atajo para cobrar la venta (Ctrl + Enter)
   @HostListener('document:keydown.control.enter', ['$event'])
   onCobrar(event: KeyboardEvent) {
     event.preventDefault(); // Evitar el comportamiento por defecto del navegador
     this.cobrar();
   }
}