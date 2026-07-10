import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pago.html',
  styleUrl: './pago.css'
})
export class Pago {

  @Input() datosRegistro: any = null;
  @Output() volverInicio = new EventEmitter<void>();
  @Output() irLogin = new EventEmitter<void>();
  @Output() pagoExitoso = new EventEmitter<void>();

  // Datos de pago
  numeroTarjeta: string = '';
  nombreTitular: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';

  // Estados
  procesandoPago: boolean = false;
  errorPago: string = '';

  constructor(private apiService: ApiService) {}

  irALogin() {
    this.irLogin.emit();
  }

  volver() {
    this.volverInicio.emit();
  }

  realizarPago() {
    // Validar datos de pago
    if (!this.numeroTarjeta || !this.nombreTitular || !this.fechaExpiracion || !this.cvv) {
      this.errorPago = 'Por favor complete todos los datos de pago';
      return;
    }

    this.procesandoPago = true;
    this.errorPago = '';

    this.registrarUsuarioCompleto();
  }

  registrarUsuarioCompleto() {
    if (!this.datosRegistro) {
      this.errorPago = 'Error: No hay datos de registro';
      this.procesandoPago = false;
      return;
    }

    this.apiService.registroCompleto(this.datosRegistro).subscribe({
      next: (respuesta: any) => {
        console.log('Registro completado exitosamente:', respuesta);
        this.procesandoPago = false;
        
        const { usuario, membresia, monto } = this.datosRegistro;
        alert(`USUARIO CREADO CORRECTAMENTE:
        Nombre: ${usuario.primer_nombre_usuario} ${usuario.apellidos_usuario}
        Membresía: ${membresia}
        Monto: S/ ${monto}`);

        this.pagoExitoso.emit();
        this.volverInicio.emit();
      },
      error: (error) => {
        console.error('Error en registro completo:', error);
        this.errorPago = 'Error al completar el registro. Por favor intente nuevamente.';
        this.procesandoPago = false;
      }
    });
  }

  // Este método ya no se usa porque el backend calcula la fecha
  calcularFechaVencimiento(tipoMembresia: string): string {
    const fechaInicio = new Date();
    let meses = 1;

    if (tipoMembresia === 'Mensual') meses = 1;
    else if (tipoMembresia === 'Trimestral') meses = 3;
    else if (tipoMembresia === 'Anual') meses = 12;

    fechaInicio.setMonth(fechaInicio.getMonth() + meses);
    return fechaInicio.toISOString().split('T')[0];
  }
}