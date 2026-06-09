import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-editar-socio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-socio.html'
})
export class EditarSocio implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<void>();
  @Input() socio: any;

  // Usa 'any' para simplificar, pero es mejor definir una interfaz
  usuario: any = { estado: true }; // Valor por defecto para el select
  membresia: any = { tipo_membresia: 'Mensual' }; // Valor por defecto para el select
  idSocio: number = 0;
  idMembresia: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  // Método principal para cargar todos los datos
  cargarDatos() {
    const idUsuario = this.socio?.id_usuario;
    if (!idUsuario) {
      console.error('No se recibió id_usuario para el socio.');
      return;
    }

    // 1. Cargar datos del usuario desde /usuarios
    this.apiService.getUsuarios().subscribe({
      next: (usuarios: any[]) => {
        const usuarioEncontrado = usuarios.find(u => u.id_usuario === idUsuario);
        if (usuarioEncontrado) {
          // Asigna una COPIA del objeto para romper cualquier referencia
          this.usuario = { ...usuarioEncontrado };
        } else {
          console.error('Usuario no encontrado para ID:', idUsuario);
        }
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });

    // 2. Cargar el ID del socio y luego la membresía
    this.apiService.getSocios().subscribe({
      next: (socios: any[]) => {
        const socioData = socios.find(s => s.id_usuario === idUsuario);
        if (socioData) {
          this.idSocio = socioData.id_socio;
          // Cargar membresía SOLO después de tener el idSocio
          this.apiService.getMembresias().subscribe({
            next: (membresias: any[]) => {
              const membresiaData = membresias.find(m => m.id_socio === this.idSocio);
              if (membresiaData) {
                // Asigna una COPIA del objeto
                this.membresia = { ...membresiaData };
                // Guarda el ID de la membresía para la actualización
                this.idMembresia = membresiaData.id_membresia;
              } else {
                console.warn('Membresía no encontrada para socio ID:', this.idSocio);
              }
            },
            error: (err) => console.error('Error al cargar membresías:', err)
          });
        } else {
          console.error('Socio no encontrado para usuario ID:', idUsuario);
        }
      },
      error: (err) => console.error('Error al cargar socios:', err)
    });
  }

  guardar() {
    // Verificar que los datos necesarios existan
    if (!this.usuario?.id_usuario || !this.idSocio || !this.idMembresia) {
      alert('Error: No se pudieron cargar los datos completos para guardar.');
      return;
    }

    // Preparar payload para actualizar usuario
    const usuarioActualizado = {
      primer_nombre_usuario: this.usuario.primer_nombre_usuario,
      segundo_nombre_usuario: this.usuario.segundo_nombre_usuario || '',
      apellidos_usuario: this.usuario.apellidos_usuario,
      tipo_documento: 'DNI',
      documento_identidad: this.usuario.documento_identidad,
      email: this.usuario.email,
      contraseña: this.usuario.contraseña,
      telefono: this.usuario.telefono,
      estado: this.usuario.estado,
      fecha_registro: this.usuario.fecha_registro,
      id_rol: 3
    };

    // Actualizar usuario
    this.apiService.actualizarUsuario(this.usuario.id_usuario, usuarioActualizado).subscribe({
      next: () => {
        // Preparar payload para actualizar membresía
        const membresiaActualizada = {
          Tipo_membresia: this.membresia.tipo_membresia,
          estado_membresia: this.membresia.estado_membresia,
          fecha_inicio: this.membresia.fecha_inicio,
          fecha_vencimiento: this.membresia.fecha_vencimiento,
          id_entrenador: this.membresia.id_entrenador,
          id_socio: this.idSocio,
          monto_total: this.membresia.monto_total
        };
        // Actualizar membresía
        this.apiService.actualizarMembresia(this.idMembresia, membresiaActualizada).subscribe({
          next: () => {
            alert('Socio actualizado exitosamente');
            this.actualizado.emit(); // Notificar al padre para recargar
            this.cerrar.emit();      // Cerrar el modal
          },
          error: (err) => console.error('Error al actualizar membresía:', err)
        });
      },
      error: (err) => console.error('Error al actualizar usuario:', err)
    });
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}