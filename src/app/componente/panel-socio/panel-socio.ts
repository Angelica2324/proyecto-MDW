import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { ApiService } from '../api.service';

@Component({
  selector: 'app-panel-socio',
  standalone: true,
  imports: [],
  templateUrl: './panel-socio.html',
  styleUrl: './panel-socio.css'
})
export class PanelSocio implements OnInit{
  @Output() cerrarSesion = new EventEmitter<void>();
  
     

      ngOnInit(): void {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        this.socio.nombre = usuario.primer_nombre_usuario;
        this.socio.estado= usuario.estado ? 'Activo' : 'Inactivo';
      }
    }

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