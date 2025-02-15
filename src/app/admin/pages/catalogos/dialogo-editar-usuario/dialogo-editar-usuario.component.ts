import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Inject } from '@angular/core';


@Component({
  selector: 'app-dialogo-editar-usuario',
  standalone: false,
  
  templateUrl: './dialogo-editar-usuario.component.html',
  styleUrl: './dialogo-editar-usuario.component.css'
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
      this.dialogRef.close(this.usuarioForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}