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
    modalEliminarVisible = false;
    ventaSeleccionada: any = null;
    errorMensaje = '';

    nuevaVenta() {
        const nueva = {
            numero: this.ventas.length ? Math.max(...this.ventas.map(v => v.numero)) + 1 : 1,
            fecha: new Date().toISOString().split('T')[0],
            total: 0,
            productos: []
        };
        this.ventas = [...this.ventas, nueva];
    }

    verDetalles(venta: any) {
        this.ventaSeleccionada = venta;
        this.modalDetallesVisible = true;
    }

    prepararEliminar(venta: any) {
        this.ventaSeleccionada = venta;
        this.modalEliminarVisible = true;
    }

    cerrarModal() {
        this.modalDetallesVisible = false;
        this.modalEliminarVisible = false;
        this.ventaSeleccionada = null;
        this.errorMensaje = '';
    }

    confirmarEliminar(codigo: string) {
        if (!codigo.trim()) {
            this.errorMensaje = 'Por favor, ingrese el código de administrador.';
            return;
        }

        if (codigo === 'codigo_admin_aqui') {
            this.ventas = this.ventas.filter(v => v.numero !== this.ventaSeleccionada.numero);
            console.log('Venta eliminada:', this.ventaSeleccionada.numero);
            this.cerrarModal();
        } else {
            this.errorMensaje = 'Código incorrecto. Intente de nuevo.';
        }
    }
}
