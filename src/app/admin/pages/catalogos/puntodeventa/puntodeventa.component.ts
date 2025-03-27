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
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-puntodeventa',
  standalone:false,
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
    this.productosEnVenta.data = [];
    this.resultsLength = 0;
    this.calcularTotal();
  }

  onFocusCliente() {
    if (this.nombreCliente === 'VENTA DE CONTADO') {
      this.nombreCliente = '';
    }
  }

  onBlurCliente() {
    if (!this.nombreCliente.trim()) {
      this.nombreCliente = 'VENTA DE CONTADO';
    }
  }

  @HostListener('document:keydown.f2', ['$event'])
  buscarCliente(event?: KeyboardEvent) {
    if (event) event.preventDefault();
    const correoCliente = this.nombreCliente.trim();
    if (!correoCliente) {
      alert('Por favor, ingrese un correo válido.');
      return;
    }

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

  agregarProducto(producto: Producto) {
    const data = [...this.productosEnVenta.data]; // Crear una copia del array actual
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

  eliminarProducto(index: number) {
    const data = [...this.productosEnVenta.data];
    data.splice(index, 1);
    this.productosEnVenta.data = data;
    this.resultsLength = this.productosEnVenta.data.length;
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.productosEnVenta.data.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  vaciarTabla() {
    this.productosEnVenta.data = [];
    this.resultsLength = 0;
    this.calcularTotal();
  }

  borrarDatos() {
    this.vaciarTabla();
    this.limpiarDatosCliente();
  }

  limpiarDatosCliente() {
    this.nombreCliente = 'VENTA DE CONTADO';
    this.telefonoCliente = '0';
    this.direccionCliente = 'GENERAL';
    this.clienteId = 2;
  }

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
      cliente: this.clienteId,
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

  agregarProductoPorCodigo() {
    if (!this.codigoBusqueda) {
      alert('Ingrese un código de producto');
      return;
    }

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
      producto.cantidad = 1;
    }
    this.calcularTotal();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (this.codigoBusqueda) {
      this.agregarProductoPorCodigo();
    }
  }

  @HostListener('document:keydown.delete', ['$event'])
  onVaciarTabla(event: KeyboardEvent) {
    event.preventDefault();
    this.vaciarTabla();
  }

  @HostListener('document:keydown.control.d', ['$event'])
  onBorrarDatos(event: KeyboardEvent) {
    event.preventDefault();
    this.borrarDatos();
  }

  @HostListener('document:keydown.control.enter', ['$event'])
  onCobrar(event: KeyboardEvent) {
    event.preventDefault();
    this.cobrar();
  }
}