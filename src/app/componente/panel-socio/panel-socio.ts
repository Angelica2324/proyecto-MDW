import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panel-socio',
  standalone: true,
  imports: [],
  templateUrl: './panel-socio.html',
  styleUrl: './panel-socio.css'
})
export class PanelSocio {
  @Output() cerrarSesion = new EventEmitter<void>();

  socio = {
    nombre: 'No asignado',
    membresia: 'No asignado',
    estado: 'No asignado',
    fechaVencimiento: 'No asignado',
    objetivoRutina: 'No asignado',
    rutinas: [
      {
        dia: 'No asignado',
        entrenamiento: 'No asignado'
      }
    ],
    clases: [
      {
        nombre: 'No asignado',
        hora: 'No asignado'
      }
    ]
  };

  salir() {
    this.cerrarSesion.emit();
  }
}