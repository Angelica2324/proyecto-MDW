import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal {
  @Output() abrirRegistro = new EventEmitter<void>();
  @Output() abrirLogin = new EventEmitter<void>();

  mostrarModalServicio = false;

  servicioActual = '';
  claseActiva: 'zumba' | 'funcional' | 'cross' = 'zumba';
  rutinaActiva: 'masa' | 'peso' | 'definicion' = 'masa';
  diaActivo: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo' = 'lunes';

  tituloServicio = '';
  descripcionServicio = '';
  detalleServicio1 = '';
  detalleServicio2 = '';
  detalleServicio3 = '';

  clasesGym = {
    zumba: {
      titulo: 'Zumba',
      subtitulo: 'Baile & Cardio',
      descripcion: 'Quema calorías bailando al ritmo de la música latina. Una clase divertida, dinámica y perfecta para todos los niveles.',
      duracion: '55 min',
      instructor: 'Coach Valeria M.',
      intensidad: 'Todos los niveles',
      horario1: 'Lun / Mié / Vie — 7:00AM',
      horario2: 'Mar / Jue / Sáb — 6:00PM'
    },
    funcional: {
      titulo: 'Funcional',
      subtitulo: 'Fuerza & Resistencia',
      descripcion: 'Entrenamiento completo con ejercicios funcionales para mejorar fuerza, resistencia, coordinación y condición física.',
      duracion: '50 min',
      instructor: 'Coach Ricardo P.',
      intensidad: 'Intermedio',
      horario1: 'Lun / Mié / Vie — 8:00AM',
      horario2: 'Mar / Jue — 7:00PM'
    },
    cross: {
      titulo: 'Cross Training',
      subtitulo: 'Circuitos Intensivos',
      descripcion: 'Rutina de alta intensidad basada en circuitos para ganar potencia, velocidad, resistencia y disciplina.',
      duracion: '60 min',
      instructor: 'Coach Andrés G.',
      intensidad: 'Avanzado',
      horario1: 'Lun / Mié / Vie — 6:00AM',
      horario2: 'Sáb — 9:00AM'
    }
  };

  rutinasGym = {
    masa: {
      titulo: 'Ganar masa muscular',
      subtitulo: 'Hipertrofia · Fuerza',
      descripcion: 'Programa enfocado en aumentar masa muscular mediante ejercicios de fuerza, progresión de cargas y descanso adecuado.',
      duracion: '60 min',
      frecuencia: '4–5 días/semana',
      programa: '12 semanas',
      ejercicio1: 'Press banca',
      ejercicio2: 'Sentadillas',
      ejercicio3: 'Peso muerto',
      ejercicio4: 'Dominadas',
      ejercicio5: 'Curl bíceps',
      coach: 'Coach Rodrigo V.'
    },
    peso: {
      titulo: 'Bajar de peso',
      subtitulo: 'Quema grasa · Cardio HIIT',
      descripcion: 'Rutina diseñada para maximizar la quema calórica combinando cardio de alta intensidad con ejercicios funcionales.',
      duracion: '45–60 min',
      frecuencia: '4–5 días/semana',
      programa: '10 semanas',
      ejercicio1: 'Burpees',
      ejercicio2: 'Sprints en cinta',
      ejercicio3: 'Sentadillas con salto',
      ejercicio4: 'Plancha dinámica',
      ejercicio5: 'Remo en máquina',
      coach: 'Coach Valeria M.'
    },
    definicion: {
      titulo: 'Definición',
      subtitulo: 'Tonificación · Cardio moderado',
      descripcion: 'Plan orientado a reducir grasa corporal y mantener masa muscular mediante ejercicios controlados y entrenamiento constante.',
      duracion: '50 min',
      frecuencia: '5 días/semana',
      programa: '8 semanas',
      ejercicio1: 'Press militar',
      ejercicio2: 'Zancadas',
      ejercicio3: 'Abdominales',
      ejercicio4: 'Cuerda',
      ejercicio5: 'Elevaciones laterales',
      coach: 'Coach Andrés G.'
    }
  };
  horariosGym = {
  lunes: {
    dia: 'Lunes',
    corto: 'LUN',
    color: '#ff2f6b',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '7:00 AM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '6:30 PM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '8:00 PM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  },
  martes: {
    dia: 'Martes',
    corto: 'MAR',
    color: '#8b5cf6',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '6:00 PM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '6:30 AM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '8:00 PM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  },
  miercoles: {
    dia: 'Miércoles',
    corto: 'MIÉ',
    color: '#f59e0b',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '7:00 AM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '7:00 PM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '8:00 AM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  },
  jueves: {
    dia: 'Jueves',
    corto: 'JUE',
    color: '#06b6d4',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '6:00 PM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '6:30 AM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '7:00 PM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  },
  viernes: {
    dia: 'Viernes',
    corto: 'VIE',
    color: '#10b981',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '7:00 AM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '7:00 PM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '8:00 AM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  },
  sabado: {
    dia: 'Sábado',
    corto: 'SÁB',
    color: '#ef4444',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '6:00 PM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '8:00 AM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '7:00 AM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  },
  domingo: {
    dia: 'Domingo',
    corto: 'DOM',
    color: '#a78bfa',
    total: '3 clases programadas · 5AM – 11PM',
    clases: [
      { hora: '9:00 AM', nombre: 'Zumba', coach: 'Coach Valeria M.', sala: 'Sala A', cupos: '20 cupos' },
      { hora: '8:00 AM', nombre: 'Funcional', coach: 'Coach Rodrigo V.', sala: 'Box', cupos: '10 cupos' },
      { hora: '10:00 AM', nombre: 'Cross Training', coach: 'Coach Diego F.', sala: 'Box', cupos: '8 cupos' }
    ]
  }
};

  irARegistro() {
    this.abrirRegistro.emit();
  }

  irALogin() {
    this.abrirLogin.emit();
  }

  seleccionarClase(clase: 'zumba' | 'funcional' | 'cross') {
    this.claseActiva = clase;
  }

  seleccionarRutina(rutina: 'masa' | 'peso' | 'definicion') {
    this.rutinaActiva = rutina;
  }
  seleccionarDia(dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo') {
  this.diaActivo = dia;
}

  get claseSeleccionada() {
    return this.clasesGym[this.claseActiva];
  }

  get rutinaSeleccionada() {
    return this.rutinasGym[this.rutinaActiva];
  }
  get horarioSeleccionado() {
  return this.horariosGym[this.diaActivo];
}

  abrirServicio(servicio: string) {
    this.mostrarModalServicio = true;
    this.servicioActual = servicio;

    if (servicio === 'clases') {
      this.claseActiva = 'zumba';
      return;
    }

    if (servicio === 'rutinas') {
      this.rutinaActiva = 'masa';
      return;
    }

    if (servicio === 'horarios') {
  this.diaActivo = 'lunes';
  return;
}
  }

  cerrarModalServicio() {
    this.mostrarModalServicio = false;
    this.servicioActual = '';
  }
}