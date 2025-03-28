import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../auth/services/categoria/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  newCategoria: any = {};
  selectedCategoria: any = {};

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
        Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
      }
    );
  }

  openAddModal() {
    this.newCategoria = { activo: true }; 
    const modal = document.getElementById('addCategoriaModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  addCategoria(form: any) {
    if (form.valid) {
      this.categoriaService.crearCategoria(this.newCategoria).subscribe(
        (response) => {
          this.categorias.push(response);
          this.closeModal('addCategoriaModal');
          Swal.fire('Éxito', 'Categoría añadida correctamente.', 'success');
        },
        (error) => {
          console.error('Error al crear categoría:', error);
          Swal.fire('Error', 'No se pudo añadir la categoría.', 'error');
        }
      );
    }
  }

  openEditModal(categoria: any) {
    this.selectedCategoria = { ...categoria };
    const modal = document.getElementById('editCategoriaModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  updateCategoria(form: any) {
    if (form.valid) {
      this.categoriaService.actualizarCategoria(this.selectedCategoria.id, this.selectedCategoria).subscribe(
        (response) => {
          const index = this.categorias.findIndex(c => c.id === response.id);
          if (index !== -1) {
            this.categorias[index] = response;
          }
          this.closeModal('editCategoriaModal');
          Swal.fire('Éxito', 'Categoría actualizada correctamente.', 'success');
        },
        (error) => {
          console.error('Error al actualizar categoría:', error);
          Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
        }
      );
    }
  }

  deleteCategoria(categoria: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la categoría ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria.id).subscribe(
          () => {
            this.categorias = this.categorias.filter(c => c.id !== categoria.id);
            Swal.fire('Éxito', 'Categoría eliminada correctamente.', 'success');
          },
          (error) => {
            console.error('Error al eliminar categoría:', error);
            Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
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