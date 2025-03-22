import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-cobro-dialog',
  standalone: false,
  templateUrl: './cobro-dialog.component.html',
  styleUrls: ['./cobro-dialog.component.css'],
})
export class CobroDialogComponent {
  montoPagado: number = 0;
  cambio: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CobroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { total: number }
  ) {}

  // Realizar cobro con Enter
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
    this.confirmarCobro();
  }

  // Cancelar cobro con F3
  @HostListener('document:keydown.f3', ['$event'])
  onCancel(event: KeyboardEvent) {
    event.preventDefault();
    this.cancelarCobro();
  }

  calcularCambio() {
    this.cambio = this.montoPagado - this.data.total;
  }

  confirmarCobro() {
    // Validar que el monto pagado no esté vacío
    if (this.montoPagado === null || this.montoPagado === undefined || this.montoPagado === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Monto Inválido',
        text: 'Por favor, ingrese el monto pagado.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Validar que el monto pagado sea suficiente
    if (this.montoPagado < this.data.total) {
      Swal.fire({
        icon: 'error',
        title: 'Monto Insuficiente',
        text: 'El monto pagado es menor al total a cobrar.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Si pasa las validaciones, cerrar el diálogo con el resultado
    this.dialogRef.close({ montoPagado: this.montoPagado, cambio: this.cambio });

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: 'Cobro Exitoso',
      text: `Cambio: ${this.cambio.toFixed(2)} MXN`,
      confirmButtonText: 'Aceptar',
    });
  }

  cancelarCobro() {
    Swal.fire({
      icon: 'info',
      title: 'Cobro Cancelado',
      text: 'El proceso de cobro ha sido cancelado.',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      this.dialogRef.close(); // Cerrar el diálogo después de la alerta
    });
  }
}