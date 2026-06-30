import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-socio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-socio.html',
  styleUrl: './agregar-socio.css'
})
export class AgregarSocio {

  @Output() registrar = new EventEmitter<{ nombre: string; membresia: string }>();
  @Output() cerrar = new EventEmitter<void>();
  @Output() cambiarSeccion = new EventEmitter<string>();

  primer_nombre_usuario: string = '';
  segundo_nombre_usuario: string = '';
  apellidos_usuario: string = '';
  documento_identidad: string = '';
  telefono: string = '';
  email: string = '';
  contrasena: string = '';
  fecha_nacimiento: string = '';
  tipo_membresia: string = '';

  estado: boolean = true;
  id_rol: number = 3;
  tipo_documento: string = 'DNI';

  constructor(private apiService: ApiService) {}

  registrarSocio() {
    if (
      !this.primer_nombre_usuario ||
      !this.apellidos_usuario ||
      !this.documento_identidad ||
      !this.telefono ||
      !this.email ||
      !this.contrasena ||
      !this.tipo_membresia
    ) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const nuevoUsuario = {
      primer_nombre_usuario: this.primer_nombre_usuario,
      segundo_nombre_usuario: this.segundo_nombre_usuario,
      apellidos_usuario: this.apellidos_usuario,
      email: this.email,
      telefono: this.telefono,
      documento_identidad: this.documento_identidad,
      tipo_documento: 'DNI',

      contraseña: this.contrasena,
      contrasena: this.contrasena,

      fecha_nacimiento: this.fecha_nacimiento || null,
      fecha_registro: new Date().toISOString().split('T')[0],
      id_rol: 3,
      estado: true
    };

    this.apiService.crearUsuario(nuevoUsuario).subscribe({
      next: (respuestaUsuario: any) => {
        const idUsuario = respuestaUsuario.id_usuario;

        const nuevoSocio = {
          id_usuario: idUsuario
        };

        this.apiService.crearSocio(nuevoSocio).subscribe({
          next: (respuestaSocio: any) => {
            const idSocio = respuestaSocio.id_socio;

            const nuevaMembresia = {
              Tipo_membresia: this.tipo_membresia,
              tipo_membresia: this.tipo_membresia,
              estado_membresia: true,
              fecha_inicio: new Date().toISOString().split('T')[0],
              fecha_vencimiento: this.calcularFechaVencimiento(this.tipo_membresia),
              id_entrenador: 1,
              id_socio: idSocio,
              monto_total: this.calcularMonto(this.tipo_membresia)
            };

            this.apiService.crearMembresia(nuevaMembresia).subscribe({
              next: () => {
                alert('Socio registrado exitosamente');

                this.registrar.emit({
                  nombre: `${this.primer_nombre_usuario} ${this.apellidos_usuario}`,
                  membresia: this.tipo_membresia
                });

                this.limpiarFormulario();
                this.cerrar.emit();
              },
              error: (error: any) => {
                console.error('Error al crear membresía:', error);
                alert('Error al crear membresía. Revisa el backend.');
              }
            });
          },
          error: (error: any) => {
            console.error('Error al crear socio:', error);
            alert('Error al crear socio. Revisa el backend.');
          }
        });
      },
      error: (error: any) => {
        console.error('Error al crear usuario:', error);
        alert('Error al crear usuario. Verifica que el backend esté activo.');
      }
    });
  }

  calcularMonto(tipoMembresia: string): number {
    if (tipoMembresia === 'Mensual') return 70;
    if (tipoMembresia === 'Trimestral') return 150;
    if (tipoMembresia === 'Anual') return 500;
    return 0;
  }

  calcularFechaVencimiento(tipoMembresia: string): string {
    const fechaInicio = new Date();

    if (tipoMembresia === 'Mensual') {
      fechaInicio.setMonth(fechaInicio.getMonth() + 1);
    }

    if (tipoMembresia === 'Trimestral') {
      fechaInicio.setMonth(fechaInicio.getMonth() + 3);
    }

    if (tipoMembresia === 'Anual') {
      fechaInicio.setMonth(fechaInicio.getMonth() + 12);
    }

    return fechaInicio.toISOString().split('T')[0];
  }

  limpiarFormulario() {
    this.primer_nombre_usuario = '';
    this.segundo_nombre_usuario = '';
    this.apellidos_usuario = '';
    this.documento_identidad = '';
    this.telefono = '';
    this.email = '';
    this.contrasena = '';
    this.fecha_nacimiento = '';
    this.tipo_membresia = '';
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}