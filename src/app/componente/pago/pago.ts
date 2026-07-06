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

    // Simular proceso de pago
    setTimeout(() => {
      // Simular éxito del 80%
      const exito = Math.random() < 0.8;

      if (exito) {
        this.registrarUsuarioCompleto();
      } else {
        this.errorPago = 'El pago fue rechazado. Por favor intente con otro método de pago.';
        this.procesandoPago = false;
      }
    }, 2000);
  }

  registrarUsuarioCompleto() {
    if (!this.datosRegistro) {
      this.errorPago = 'Error: No hay datos de registro';
      this.procesandoPago = false;
      return;
    }

    const { usuario, membresia, monto } = this.datosRegistro;

    this.apiService.crearUsuario(usuario).subscribe({
      next: (respuestaUsuario: any) => {
        const idUsuario = respuestaUsuario.id_usuario;

        this.apiService.crearSocio({ id_usuario: idUsuario }).subscribe({
          next: (respuestaSocio: any) => {
            const idSocio = respuestaSocio.id_socio;

            const nuevaMembresia = {
              Tipo_membresia: membresia,
              estado_membresia: true,
              fecha_inicio: new Date().toISOString().split('T')[0],
              fecha_vencimiento: this.calcularFechaVencimiento(membresia),
              id_entrenador: 1,
              id_socio: idSocio,
              monto_total: monto
            };

            this.apiService.crearMembresia(nuevaMembresia).subscribe({
              next: () => {
                console.log('✅ Registro completado exitosamente');
                this.procesandoPago = false;
                
                alert(`✅ USUARIO CREADO CORRECTAMENTE:
                Nombre: ${usuario.primer_nombre_usuario} ${usuario.apellidos_usuario}
                Membresía: ${membresia}
                Monto: S/ ${monto}`);

                this.pagoExitoso.emit();
                this.volverInicio.emit();
              },
              error: (error) => {
                console.error('Error al crear membresía:', error);
                this.errorPago = 'Error al completar el registro';
                this.procesandoPago = false;
              }
            });
          },
          error: (error) => {
            console.error('Error al crear socio:', error);
            this.errorPago = 'Error al completar el registro';
            this.procesandoPago = false;
          }
        });
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        this.errorPago = 'Error al completar el registro';
        this.procesandoPago = false;
      }
    });
  }

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