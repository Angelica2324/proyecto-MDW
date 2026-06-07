import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panel-entrenador',
  standalone: true,
  imports: [],
  templateUrl: './panel-entrenador.html',
  styleUrl: './panel-entrenador.css'
})
export class PanelEntrenador {
  @Output() cerrarSesion = new EventEmitter<void>();

  clases = [
    { nombre: 'Funcional', horario: '7:00 p.m.', cupos: 15 },
    { nombre: 'Crossfit', horario: '8:00 p.m.', cupos: 12 },
    { nombre: 'HIIT', horario: '6:00 a.m.', cupos: 20 }
  ];

  rutinas = [
    { socio: 'Juan Pérez', rutina: 'Hipertrofia', objetivo: 'Masa muscular' },
    { socio: 'María García', rutina: 'Definición', objetivo: 'Perder grasa' },
    { socio: 'Carlos Martín', rutina: 'Fuerza', objetivo: 'Fuerza máxima' }
  ];

  salir() {
    this.cerrarSesion.emit();
  }

  crearRutina() {
    alert('Aquí irá la función para crear rutina.');
  }

  agregarEjercicio() {
    alert('Aquí irá la función para agregar ejercicio.');
  }

  verSocios() {
    alert('Aquí irá la función para ver socios.');
  }
}