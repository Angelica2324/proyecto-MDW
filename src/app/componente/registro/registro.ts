import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private apiService: ApiService) {}

   registrarSocio() {
  
  const nuevoUsuario = {
    primer_nombre_usuario: this.primer_nombre_usuario,
    segundo_nombre_usuario: this.segundo_nombre_usuario,
    apellidos_usuario: this.apellidos_usuario,
    email: this.email,
    telefono: this.telefono,
    documento_identidad: this.documento_identidad,
    tipo_documento: 'DNI',
    contraseña: this.contrasena,
    fecha_nacimiento: this.fecha_nacimiento,
    fecha_registro: new Date().toISOString().split('T')[0],
    id_rol: 3,
    estado: true
  };

  this.apiService.crearUsuario(nuevoUsuario).subscribe({
    next: (respuestaUsuario: any) => {
      const idUsuario = respuestaUsuario.id_usuario;
      console.log('Usuario creado con ID:', idUsuario);

      
      const nuevoSocio = {
        id_usuario: idUsuario
      };

      this.apiService.crearSocio(nuevoSocio).subscribe({
        next: (respuestaSocio: any) => {
          const idSocio = respuestaSocio.id_socio;
          console.log('Socio creado con ID:', idSocio);

          
          let montoTotal = 0;
          if (this.tipo_membresia === 'Mensual') montoTotal = 70;
          else if (this.tipo_membresia === 'Trimestral') montoTotal = 150;
          else if (this.tipo_membresia === 'Anual') montoTotal = 500;

          const nuevaMembresia = {
            Tipo_membresia: this.tipo_membresia,
            estado_membresia: true,
            fecha_inicio: new Date().toISOString().split('T')[0],
            fecha_vencimiento: this.calcularFechaVencimiento(this.tipo_membresia),
            id_entrenador: 1,
            id_socio: idSocio,
            monto_total: montoTotal
          };

          this.apiService.crearMembresia(nuevaMembresia).subscribe({
            next: (respuestaMembresia) => {
              console.log('Todo registrado exitosamente');
              alert('Socio registrado exitosamente');
              this.volverInicio.emit();
            },
            error: (error) => {
              console.error('Error al crear membresía:', error);
              alert('Error al crear membresía');
            }
          });
        },
        error: (error) => {
          console.error('Error al crear socio:', error);
          alert('Error al crear socio');
        }
      });
    },
    error: (error) => {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario');
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

  volver() {
    this.volverInicio.emit();
  }
}