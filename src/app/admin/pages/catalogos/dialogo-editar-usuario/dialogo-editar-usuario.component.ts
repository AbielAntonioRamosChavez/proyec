import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogo-editar-usuario',
  standalone: false,
  templateUrl: './dialogo-editar-usuario.component.html',
  styleUrls: ['./dialogo-editar-usuario.component.css']
})
export class DialogoEditarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  rolesDisponibles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogoEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Inicializar el formulario con todos los campos incluyendo apellidos
    this.usuarioForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      apellidos: [data?.apellidos || '', Validators.required], // Asegurarse de incluir apellidos
      correo: [data?.correo || '', [Validators.required, Validators.email]],
      telefono: [data?.telefono || '', Validators.required],
      rol: [data?.rol_nombre || '', Validators.required]
    });

    // Verificación de datos recibidos (para depuración)
    console.log('Datos recibidos en el diálogo:', data);
  }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.authService.obtenerRoles().subscribe(
      (roles: any[]) => {
        this.rolesDisponibles = roles;
        
        // Verificar que los datos se están asignando correctamente
        console.log('Datos del usuario antes de asignar:', this.data);
        
        // Asignar valores al formulario
        this.usuarioForm.patchValue({
          nombre: this.data.nombre,
          apellidos: this.data.apellidos, // Asegurarse de asignar apellidos
          correo: this.data.correo,
          telefono: this.data.telefono,
          rol: this.data.rol_nombre
        });
      },
      error => {
        console.error('Error al cargar roles:', error);
        Swal.fire('Error', 'No se pudieron cargar los roles', 'error');
      }
    );
  }

  onSave(): void {
    if (this.usuarioForm.valid) {
      const rolSeleccionado = this.rolesDisponibles.find(r => r.nombre === this.usuarioForm.value.rol);
      
      const datosActualizados = {
        id: this.data.id,
        nombre: this.usuarioForm.value.nombre,
        apellidos: this.usuarioForm.value.apellidos, // Incluir apellidos en los datos a guardar
        correo: this.usuarioForm.value.correo,
        telefono: this.usuarioForm.value.telefono,
        rol_id: rolSeleccionado ? rolSeleccionado.id : this.data.rol_id
      };

      console.log('Datos a actualizar:', datosActualizados);
      this.dialogRef.close(datosActualizados);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}