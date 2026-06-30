import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-agregar-entrenador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-entrenador.html',
  styleUrl: './agregar-entrenador.css'
})
export class AgregarEntrenador {

  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<void>();

  primer_nombre_usuario: string = '';
  segundo_nombre_usuario: string = '';
  apellidos_usuario: string = '';
  documento_identidad: string = '';
  telefono: string = '';
  email: string = '';
  especialidad: string = '';
  contrasena: string = '';

  constructor(private apiService: ApiService) {}

  registrarEntrenador() {
    if (
      !this.primer_nombre_usuario ||
      !this.apellidos_usuario ||
      !this.documento_identidad ||
      !this.telefono ||
      !this.email ||
      !this.especialidad ||
      !this.contrasena
    ) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const datos = {
      primer_nombre_usuario: this.primer_nombre_usuario,
      segundo_nombre_usuario: this.segundo_nombre_usuario,
      apellidos_usuario: this.apellidos_usuario,
      email: this.email,
      telefono: this.telefono,
      documento_identidad: this.documento_identidad,
      tipo_documento: 'DNI',
      contraseña: this.contrasena,
      contrasena: this.contrasena,
      fecha_nacimiento: null,
      especialidad: this.especialidad
    };

    this.apiService.registrarEntrenadorCompleto(datos).subscribe({
      next: () => {
        alert('Entrenador registrado exitosamente');
        this.limpiarFormulario();
        this.actualizado.emit();
        this.cerrar.emit();
      },
      error: (error) => {
        console.error('Error al registrar entrenador:', error);
        alert('No se pudo registrar el entrenador. Verifica que el backend esté activo.');
      }
    });
  }

  limpiarFormulario() {
    this.primer_nombre_usuario = '';
    this.segundo_nombre_usuario = '';
    this.apellidos_usuario = '';
    this.documento_identidad = '';
    this.telefono = '';
    this.email = '';
    this.especialidad = '';
    this.contrasena = '';
  }

  cerrarFormulario() {
    this.cerrar.emit();
  }
}