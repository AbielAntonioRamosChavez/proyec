import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../auth/services/producto/producto.service';
import { CategoriaService } from '../../../../auth/services/categoria/categoria.service';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  selectedProduct: any = {}; // Producto seleccionado para editar
  newProduct: any = {}; // Nuevo producto para añadir
  categorias: any[] = []; // Lista de categorías

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  getNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  trackProducto(index: number, producto: any): number {
    return producto.id; // Suponiendo que cada producto tiene un 'id' único
  }

  openAddModal() {
    this.newProduct = {}; // Reinicia el nuevo producto
    const modal = document.getElementById('addModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  addProduct(form: any) {
    if (form.valid) {
      this.productoService.crearProducto(this.newProduct).subscribe(
        (response) => {
          this.productos.push(response); // Añade el nuevo producto a la lista
          this.closeModal('addModal');
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }

  openEditModal(producto: any) {
    this.selectedProduct = { ...producto }; // Copia el producto seleccionado
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  saveChanges(form: any) {
    if (form.valid) {
      this.productoService.actualizarProducto(this.selectedProduct.id, this.selectedProduct).subscribe(
        (response) => {
          const index = this.productos.findIndex((p) => p.id === response.id);
          if (index !== -1) {
            this.productos[index] = response; // Actualiza el producto en la lista
          }
          this.closeModal('editModal');
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    }
  }

  deleteProduct(producto: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(producto.id).subscribe(
        () => {
          this.productos = this.productos.filter((p) => p.id !== producto.id); // Filtra y elimina el producto
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  openDetailModal(producto: any) {
    this.selectedProduct = producto;
    const modal = document.getElementById('detailModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}
