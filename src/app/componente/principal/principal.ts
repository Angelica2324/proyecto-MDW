import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal {
  @Output() abrirRegistro = new EventEmitter<void>();
  @Output() abrirLogin = new EventEmitter<void>();

  mostrarModalServicio = false;
  servicioActual = '';

  // Datos de la API
  clasesAPI: any[] = [];
  claseActiva: any = null;

  // Datos estáticos
  rutinaActiva: 'masa' | 'peso' | 'definicion' = 'masa';
  diaActivo: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo' = 'lunes';

  tituloServicio = '';
  descripcionServicio = '';
  detalleServicio1 = '';
  detalleServicio2 = '';
  detalleServicio3 = '';

  // Ya no necesitas clasesGym porque usas la API
  clasesGym = {};

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarClases();
  }

  cargarClases() {
    this.apiService.getClases().subscribe({
      next: (data) => {
        this.clasesAPI = data;
        if (this.clasesAPI.length > 0) {
          this.claseActiva = this.clasesAPI[0];
        }
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
      }
    });
  }

  get claseSeleccionada() {
    if (!this.claseActiva) {
      return {
        titulo: 'Sin clases',
        subtitulo: '',
        descripcion: 'No hay clases disponibles',
        duracion: '',
        instructor: '',
        intensidad: '',
        horario1: '',
        horario2: ''
      };
    }
    return {
      titulo: this.claseActiva.nombre_clase,
      subtitulo: this.claseActiva.subtitulo || 'Clase',
      descripcion: this.claseActiva.descripcion,
      duracion: this.claseActiva.Duración || '60 min',
      instructor: `Instructor ID: ${this.claseActiva.id_entrenador}`,
      intensidad: this.claseActiva.intensidad || 'Media',
      horario1: `${this.claseActiva.dias_de_la_semana} ${this.claseActiva.hora_1}`,
      horario2: `${this.claseActiva.dias_de_la_semana} ${this.claseActiva.hora_2}`
    };
  }

  get rutinaSeleccionada() {
    return this.rutinasGym[this.rutinaActiva];
  }

  get horarioSeleccionado() {
    return this.horariosGym[this.diaActivo];
  }

  irARegistro() {
    this.abrirRegistro.emit();
  }

  irALogin() {
    this.abrirLogin.emit();
  }

  seleccionarClase(clase: any) {
    this.claseActiva = clase;
  }

  seleccionarRutina(rutina: 'masa' | 'peso' | 'definicion') {
    this.rutinaActiva = rutina;
  }

  seleccionarDia(dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo') {
    this.diaActivo = dia;
  }

  abrirServicio(servicio: string) {
    this.mostrarModalServicio = true;
    this.servicioActual = servicio;

    if (servicio === 'clases') {
      if (this.clasesAPI.length > 0) {
        this.claseActiva = this.clasesAPI[0];
      }
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