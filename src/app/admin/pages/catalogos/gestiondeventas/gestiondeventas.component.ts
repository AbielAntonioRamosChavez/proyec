import { Component } from '@angular/core';

@Component({
    selector: 'app-gestiondeventas',
    standalone: false,
    templateUrl: './gestiondeventas.component.html',
    styleUrl: './gestiondeventas.component.css'
})
export class GestiondeventasComponent {
    ventas = [
        {
            numero: 1,
            fecha: '2024-02-10',
            total: 150.00,
            productos: [
                { nombre: 'Leche', cantidad: 2, precio: 25.00 },
                { nombre: 'Pan Bimbo', cantidad: 1, precio: 45.00 },
                { nombre: 'Huevos (docena)', cantidad: 1, precio: 80.00 }
            ]
        },
        {
            numero: 2,
            fecha: '2024-02-09',
            total: 75.50,
            productos: [
                { nombre: 'Refresco Coca-Cola 2L', cantidad: 1, precio: 35.00 },
                { nombre: 'Galletas Marías', cantidad: 2, precio: 20.50 }
            ]
        },
        {
            numero: 3,
            fecha: '2024-02-08',
            total: 98.00,
            productos: [
                { nombre: 'Papel Higiénico (4 rollos)', cantidad: 1, precio: 45.00 },
                { nombre: 'Atún en lata', cantidad: 3, precio: 53.00 }
            ]
        }
    ];

    modalDetallesVisible = false;
    ventaSeleccionada: any = null;
    errorMensaje = '';

    formularioNuevaVentaVisible = false;
    productosNuevos: any[] = [{ cantidad: 1, numeroSerie: '', precio: 0 }];

    mostrarFormularioNuevaVenta() {
        this.formularioNuevaVentaVisible = true;
    }

    cerrarFormularioNuevaVenta() {
        this.formularioNuevaVentaVisible = false;
        this.productosNuevos = [{ cantidad: 1, numeroSerie: '', precio: 0 }];
    }

    agregarProducto() {
        this.productosNuevos.push({ cantidad: 1, numeroSerie: '', precio: 0 });
    }

    guardarNuevaVenta() {
        const nuevaVenta = {
            numero: this.ventas.length ? Math.max(...this.ventas.map(v => v.numero)) + 1 : 1,
            fecha: new Date().toISOString().split('T')[0],
            total: this.calcularTotal(this.productosNuevos),
            productos: this.productosNuevos.map(p => ({
                nombre: 'Producto', // Puedes pedir el nombre del producto también
                cantidad: p.cantidad,
                precio: p.precio
            }))
        };

        this.ventas = [...this.ventas, nuevaVenta];
        this.cerrarFormularioNuevaVenta();
    }

    calcularTotal(productos: any[]): number {
        return productos.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);
    }

    verDetalles(venta: any) {
        this.ventaSeleccionada = venta;
        this.modalDetallesVisible = true;
    }

    cerrarModal() {
        this.modalDetallesVisible = false;
        this.ventaSeleccionada = null;
        this.errorMensaje = '';
    }
}