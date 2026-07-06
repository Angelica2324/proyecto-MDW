import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-panel-socio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-socio.html',
  styleUrl: './panel-socio.css'
})
export class PanelSocio implements OnInit {
  @Output() cerrarSesion = new EventEmitter<void>();


  // Datos estáticos
  rutinaActiva: 'masa' | 'peso' | 'definicion' = 'masa';
  diaActivo: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo' = 'lunes';

   tituloServicio = '';
  descripcionServicio = '';
  detalleServicio1 = '';
  detalleServicio2 = '';
  detalleServicio3 = '';

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

  get rutinaSeleccionada() {
    return this.rutinasGym[this.rutinaActiva];
  }

   seleccionarRutina(rutina: 'masa' | 'peso' | 'definicion') {
    this.rutinaActiva = rutina;
  }

  socio = {
    id_usuario: 0,
    id_socio: 0,
    nombre: 'Cargando...',
    membresia: 'Cargando...',
    estado: 'Cargando...',
    fechaVencimiento: 'Cargando...',
    objetivoRutina: 'Cargando...',
    rutinas: [] as any[],
    clases: [] as any[]
  };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.socio.id_usuario = usuario.id_usuario;
      this.socio.nombre = usuario.primer_nombre_usuario + " " + usuario.segundo_nombre_usuario || 'Usuario';
      this.socio.estado = usuario.estado ? 'Activo' : 'Inactivo';
      
      this.cargarDatosSocio();
    }
  }


confirmarAsistencia(clase: any) {
  if (clase.confirmada) return;

  clase.confirmada = true;

  console.log(`Asistencia confirmada para: ${clase.nombre}`);
  
}

desconfirmarAsistencia(clase: any) {
  clase.confirmada = false;
  console.log(`Asistencia cancelada para: ${clase.nombre}`);
}

  cargarDatosSocio() {
    this.apiService.getSocios().subscribe((socios: any[]) => {
      const socioEncontrado = socios.find((s: any) => s.id_usuario === this.socio.id_usuario);
      
      if (socioEncontrado) {
        this.socio.id_socio = socioEncontrado.id_socio;
        
        this.apiService.getMembresias().subscribe((membresias: any[]) => {
          const membresia = membresias.find((m: any) => m.id_socio === this.socio.id_socio);
          
          if (membresia) {
            this.socio.membresia = membresia.Tipo_membresia || 'Sin membresía';
            this.socio.fechaVencimiento = membresia.fecha_vencimiento || 'No definida';
            this.cdr.detectChanges();
          }
        });
        
        this.apiService.getRutinas().subscribe((rutinas: any[]) => {
          const rutina = rutinas?.find((r: any) => r.id_socio === this.socio.id_socio);
          
          if (rutina) {
            this.socio.objetivoRutina = rutina.objetivo || 'Sin objetivo';
            this.socio.rutinas = [{
              dia: 'Rutina asignada',
              entrenamiento: rutina.nombre_rutina || 'Rutina'
            }];
            this.cdr.detectChanges();
          } else {
            this.socio.objetivoRutina = 'Sin rutina asignada';
            this.socio.rutinas = [{ dia: 'No asignado', entrenamiento: 'No asignado' }];
            this.cdr.detectChanges();
          }
        });
        
        this.apiService.getClases().subscribe((clases: any[]) => {
  this.socio.clases = clases.map((clase: any) => ({
    nombre: clase.nombre_clase || 'Clase',
    hora_1: clase.hora_1 || '--:--',
    hora_2: clase.hora_2 || '--:--',
    dias: clase.dias_de_la_semana || 'No especificado',
    descripcion: clase.descripcion || 'Sin descripción',
    intensidad: clase.intensidad || 'Media',
    duracion: clase.Duración || '60 min'
  }));
  
  if (this.socio.clases.length === 0) {
    this.socio.clases = [{ 
      nombre: 'No asignado', 
      hora_1: '--:--', 
      hora_2: '--:--',
      dias: '--',
      descripcion: 'Sin clases',
      intensidad: '--',
      duracion: '--'
    }];
  }
  this.cdr.detectChanges();
});

      }
    });
  }

  salir() {
    this.cerrarSesion.emit();
  }
}