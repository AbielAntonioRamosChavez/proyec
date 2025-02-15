import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cobro-dialog',
  standalone: false,
  
  templateUrl: './cobro-dialog.component.html',
  styleUrl: './cobro-dialog.component.css'
})
export class CobroDialogComponent {
  montoPagado: number = 0;
  cambio: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CobroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { total: number }
  ) {}

  calcularCambio() {
    this.cambio = this.montoPagado - this.data.total;
  }

  confirmarCobro() {
    this.dialogRef.close({ montoPagado: this.montoPagado, cambio: this.cambio });
  }

  cancelarCobro() {
    this.dialogRef.close();
  }

}
