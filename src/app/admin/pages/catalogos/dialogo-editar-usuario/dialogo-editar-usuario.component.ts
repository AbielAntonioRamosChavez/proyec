import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialogo-editar-usuario',
  standalone:false,
  templateUrl: './dialogo-editar-usuario.component.html',
  styleUrls: ['./dialogo-editar-usuario.component.css']
})
export class DialogoEditarUsuarioComponent {
  usuarioForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogoEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      correo: [data?.correo || '', [Validators.required, Validators.email]],
      telefono: [data?.telefono || '', Validators.required],
      direccion: [data?.direccion || '', Validators.required],
      rol: [data?.rol || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.usuarioForm.valid) {
      const datosActualizados = {
        id: this.data.id, // Asegúrate de incluir el ID
        nombre: this.usuarioForm.value.nombre,
        correo: this.usuarioForm.value.correo,
        telefono: this.usuarioForm.value.telefono,
        direccion: this.usuarioForm.value.direccion,
        rol: this.usuarioForm.value.rol
      };
      console.log('Datos enviados al cerrar el diálogo:', datosActualizados); // Depuración
      this.dialogRef.close(datosActualizados);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}