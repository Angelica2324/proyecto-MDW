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
      this.socio.nombre = usuario.primer_nombre_usuario || 'Usuario';
      this.socio.estado = usuario.estado ? 'Activo' : 'Inactivo';
      
      this.cargarDatosSocio();
    }
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