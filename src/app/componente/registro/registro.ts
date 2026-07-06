import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs'; // 👈 IMPORTANTE

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  @Output() volverInicio = new EventEmitter<void>();
  @Output() registrar = new EventEmitter<{ nombre: string; membresia: string }>();
  @Output() irLogin = new EventEmitter<void>();
  @Output() mostrarConfirmacion = new EventEmitter<any>();
  @Output() irPago = new EventEmitter<any>();

  // Campos del formulario
  apellidos_usuario: string = '';
  contrasena: string = '';
  documento_identidad: string = '';
  email: string = '';
  estado: boolean = true;
  fecha_nacimiento: string = '';
  fecha_registro: string = '';
  id_rol: number = 3;
  id_usuario: string = '';
  primer_nombre_usuario: string = '';
  segundo_nombre_usuario: string = '';
  telefono: string = '';
  tipo_documento: string = '';
  tipo_membresia: string = '';

  // Variables para controlar errores
  dniEnUso: boolean = false;
  emailEnUso: boolean = false;
  dniInvalido: boolean = false;
  emailInvalido: boolean = false;

  datosRegistro: any = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  irALogin() {
    this.irLogin.emit();
  }

  // Validar formato DNI (8 dígitos)
  validarFormatoDNI(): boolean {
    const dniRegex = /^[0-9]{8}$/;
    return dniRegex.test(this.documento_identidad);
  }

  // Validar formato Email
  validarFormatoEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  // ✅ CORRECTO - Usando ApiService
  async verificarDNIExistente(): Promise<boolean> {
    try {
      const existe = await firstValueFrom(this.apiService.verificarDNI(this.documento_identidad));
      this.dniEnUso = existe;
      return existe;
    } catch (error) {
      console.error('Error al verificar DNI:', error);
      return false;
    }
  }

  // ✅ CORRECTO - Usando ApiService
  async verificarEmailExistente(): Promise<boolean> {
    try {
      const existe = await firstValueFrom(this.apiService.verificarEmail(this.email));
      this.emailEnUso = existe;
      return existe;
    } catch (error) {
      console.error('Error al verificar Email:', error);
      return false;
    }
  }

  // ✅ CORRECTO - Método principal
  async registrarSocio() {
    // Validar campos vacíos
    if (
      !this.primer_nombre_usuario ||
      !this.apellidos_usuario ||
      !this.documento_identidad ||
      !this.telefono ||
      !this.email ||
      !this.contrasena ||
      !this.tipo_membresia
    ) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Validar formato DNI
    if (!this.validarFormatoDNI()) {
      this.dniInvalido = true;
      alert('El DNI debe tener exactamente 8 dígitos');
      return;
    }

    // Validar formato Email
    if (!this.validarFormatoEmail()) {
      this.emailInvalido = true;
      alert('Ingrese un correo electrónico válido');
      return;
    }

    // Verificar si el DNI ya existe
    const dniExiste = await this.verificarDNIExistente();
    if (dniExiste) {
      this.dniEnUso = true;
      alert('Este DNI ya está registrado en el sistema');
      return;
    }

    // Verificar si el Email ya existe
    const emailExiste = await this.verificarEmailExistente();
    if (emailExiste) {
      this.emailEnUso = true;
      alert('Este correo electrónico ya está registrado');
      return;
    }

    // Guardar datos temporalmente
    this.datosRegistro = {
      usuario: {
        primer_nombre_usuario: this.primer_nombre_usuario,
        segundo_nombre_usuario: this.segundo_nombre_usuario,
        apellidos_usuario: this.apellidos_usuario,
        email: this.email,
        telefono: this.telefono,
        documento_identidad: this.documento_identidad,
        tipo_documento: 'DNI',
        contraseña: this.contrasena,
        fecha_nacimiento: this.fecha_nacimiento || new Date().toISOString().split('T')[0],
        fecha_registro: new Date().toISOString().split('T')[0],
        id_rol: 3,
        estado: true
      },
      membresia: this.tipo_membresia,
      monto: this.calcularMonto(this.tipo_membresia)
    };

    console.log('✅ Emitiendo irPago con datos:', this.datosRegistro);
    this.irPago.emit(this.datosRegistro);
  }

  calcularMonto(tipoMembresia: string): number {
    if (tipoMembresia === 'Mensual') return 70;
    else if (tipoMembresia === 'Trimestral') return 150;
    else if (tipoMembresia === 'Anual') return 500;
    return 0;
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

  volver() {
    this.volverInicio.emit();
  }
}