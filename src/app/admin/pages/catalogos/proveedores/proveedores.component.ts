import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../../../auth/services/categoria/proveedores.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-proveedores',
    standalone: false,
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
    proveedores: any[] = [];
    newProveedor: any = {};
    selectedProveedor: any = {};

    constructor(private proveedorService: ProveedorService) { }

    ngOnInit(): void {
        // Comenta o elimina la siguiente línea para evitar la carga automática de proveedores
        // this.loadProveedores();
    }

    loadProveedores() {
        this.proveedorService.obtenerProveedores().subscribe(
            (data) => {
                this.proveedores = data;
            },
            (error) => {
                console.error('Error al cargar proveedores:', error);
                Swal.fire('Error', 'No se pudieron cargar los proveedores.', 'error');
            }
        );
    }

    openAddModal() {
        this.newProveedor = { activo: true }; // Inicializar activo en true por defecto
        const modal = document.getElementById('addProveedorModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    addProveedor(form: any) {
        if (form.valid) {
            this.proveedorService.crearProveedor(this.newProveedor).subscribe(
                (response) => {
                    this.proveedores.push(response);
                    this.closeModal('addProveedorModal');
                    Swal.fire('Éxito', 'Proveedor añadido correctamente.', 'success');
                },
                (error) => {
                    console.error('Error al crear proveedor:', error);
                    Swal.fire('Error', 'No se pudo añadir el proveedor.', 'error');
                }
            );
        }
    }

    openEditModal(proveedor: any) {
        this.selectedProveedor = { ...proveedor };
        const modal = document.getElementById('editProveedorModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    updateProveedor(form: any) {
        if (form.valid) {
            this.proveedorService.actualizarProveedor(this.selectedProveedor.id, this.selectedProveedor).subscribe(
                (response) => {
                    const index = this.proveedores.findIndex(p => p.id === response.id);
                    if (index !== -1) {
                        this.proveedores[index] = response;
                    }
                    this.closeModal('editProveedorModal');
                    Swal.fire('Éxito', 'Proveedor actualizado correctamente.', 'success');
                },
                (error) => {
                    console.error('Error al actualizar proveedor:', error);
                    Swal.fire('Error', 'No se pudo actualizar el proveedor.', 'error');
                }
            );
        }
    }

    deleteProveedor(proveedor: any) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar al proveedor ${proveedor.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.proveedorService.eliminarProveedor(proveedor.id).subscribe(
                    () => {
                        this.proveedores = this.proveedores.filter(p => p.id !== proveedor.id);
                        Swal.fire('Éxito', 'Proveedor eliminado correctamente.', 'success');
                    },
                    (error) => {
                        console.error('Error al eliminar proveedor:', error);
                        Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error');
                    }
                );
            }
        });
    }

    closeModal(modalId: string) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    }
}