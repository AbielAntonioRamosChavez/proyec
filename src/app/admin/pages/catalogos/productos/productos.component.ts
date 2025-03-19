import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [FormsModule] // Importa FormsModule
})
export class ProductosComponent {
  productos = [
    { codigo: '0015', producto: 'Avena quaker', categoria: 'Cereales', stock: 49, precio: 4.25 },
    { codigo: '003', producto: 'Coco Crunch', categoria: 'Cereales', stock: 15, precio: 5.25 },
    // ... otros productos
  ];

  selectedProduct: any = {}; // Producto seleccionado para editar
  newProduct: any = {}; // Nuevo producto para añadir

  // Abre el modal de añadir
  openAddModal() {
    this.newProduct = {}; // Reinicia el nuevo producto
    const modal = document.getElementById('addModal');
    if (modal) {
      modal.classList.add('show'); // Muestra el modal
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Añade un nuevo producto
  addProduct() {
    this.productos.push({ ...this.newProduct }); // Añade el nuevo producto
    this.closeModal('addModal');
  }

  // Abre el modal de edición
  openEditModal(producto: any) {
    this.selectedProduct = { ...producto }; // Copia el producto seleccionado
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show'); // Muestra el modal
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Guarda los cambios del producto editado
  saveChanges() {
    const index = this.productos.findIndex(p => p.codigo === this.selectedProduct.codigo);
    if (index !== -1) {
      this.productos[index] = { ...this.selectedProduct }; // Actualiza el producto
    }
    this.closeModal('editModal');
  }

  // Cierra el modal
  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show'); // Oculta el modal
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Elimina un producto
  deleteProduct(producto: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.codigo !== producto.codigo); // Filtra y elimina el producto
    }
  }
}
