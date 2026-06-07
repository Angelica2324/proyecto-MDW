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

  busquedaClase = '';
  busquedaRutina = '';

  clases = [
    {
      id: '01',
      nombre: 'Funcional',
      diaSemana: 'Lunes',
      horaInicio: '7:00 p.m.',
      horaFin: '8:00 p.m.'
    },
    {
      id: '02',
      nombre: 'Crossfit',
      diaSemana: 'Miércoles',
      horaInicio: '8:00 p.m.',
      horaFin: '9:00 p.m.'
    },
    {
      id: '03',
      nombre: 'HIIT',
      diaSemana: 'Viernes',
      horaInicio: '6:00 a.m.',
      horaFin: '7:00 a.m.'
    }
  ];

  rutinas = [
    {
      id: '01',
      socio: 'Juan Pérez',
      rutina: 'Hipertrofia',
      objetivo: 'Masa muscular',
      descripcion: 'Realizaremos ejercicios de fuerza con peso moderado, 4 series de 10 repeticiones por grupo muscular.'
    },
    {
      id: '02',
      socio: 'María García',
      rutina: 'Definición',
      objetivo: 'Perder grasa',
      descripcion: 'Se trabajará cardio combinado con ejercicios funcionales, circuitos de alta intensidad y descansos cortos.'
    },
    {
      id: '03',
      socio: 'Carlos Martín',
      rutina: 'Fuerza',
      objetivo: 'Fuerza máxima',
      descripcion: 'Haremos levantamiento de pesas con cargas altas, 3 series de 10 repeticiones, cuidando la técnica.'
    }
  ];

  get clasesFiltradas() {
    return this.clases.filter(clase =>
      clase.nombre.toLowerCase().includes(this.busquedaClase) ||
      clase.diaSemana.toLowerCase().includes(this.busquedaClase) ||
      clase.horaInicio.toLowerCase().includes(this.busquedaClase) ||
      clase.horaFin.toLowerCase().includes(this.busquedaClase)
    );
  }

  get rutinasFiltradas() {
    return this.rutinas.filter(rutina =>
      rutina.socio.toLowerCase().includes(this.busquedaRutina) ||
      rutina.rutina.toLowerCase().includes(this.busquedaRutina) ||
      rutina.objetivo.toLowerCase().includes(this.busquedaRutina) ||
      rutina.descripcion.toLowerCase().includes(this.busquedaRutina)
    );
  }

  buscarClase(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaClase = input.value.toLowerCase();
  }

  buscarRutina(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaRutina = input.value.toLowerCase();
  }

  editarClase(clase: any) {
    alert('Editar clase: ' + clase.nombre);
  }

  eliminarClase(clase: any) {
    alert('Eliminar clase: ' + clase.nombre);
  }

  editarRutina(rutina: any) {
    alert('Editar rutina de: ' + rutina.socio);
  }

  eliminarRutina(rutina: any) {
    alert('Eliminar rutina de: ' + rutina.socio);
  }

  crearRutina() {
    alert('Aquí irá la función para crear rutina.');
  }

  agregarClase() {
  alert('Aquí irá la función para agregar clase.');
}

  salir() {
    this.cerrarSesion.emit();
  }
}