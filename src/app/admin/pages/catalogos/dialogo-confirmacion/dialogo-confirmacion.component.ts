import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogo-confirmacion',
  standalone: false,
  
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrl: './dialogo-confirmacion.component.css'
})
export class MatDialogConfirmacionComponent {
  constructor(
    public dialogRef: MatDialogRef<MatDialogConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string }
  ) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}