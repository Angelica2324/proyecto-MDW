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

  tituloServicio = '';
  descripcionServicio = '';
  detalleServicio1 = '';
  detalleServicio2 = '';
  detalleServicio3 = '';

  irARegistro() {
    this.abrirRegistro.emit();
  }

  irALogin() {
    this.abrirLogin.emit();
  }

  abrirServicio(servicio: string) {
    this.mostrarModalServicio = true;

    if (servicio === 'clases') {
      this.tituloServicio = 'CLASES DISPONIBLES';
      this.descripcionServicio = 'El gimnasio ofrece clases grupales para mejorar la condición física, quemar calorías y entrenar de forma dinámica.';
      this.detalleServicio1 = 'Zumba: clases de baile y cardio';
      this.detalleServicio2 = 'Funcional: entrenamiento de fuerza y resistencia';
      this.detalleServicio3 = 'Cross Training: ejercicios intensivos por circuitos';
    }

    if (servicio === 'rutinas') {
      this.tituloServicio = 'RUTINAS DE ENTRENAMIENTO';
      this.descripcionServicio = 'Los socios pueden acceder a rutinas según su objetivo físico y nivel de experiencia.';
      this.detalleServicio1 = 'Ganar masa muscular';
      this.detalleServicio2 = 'Bajar de peso y quemar grasa';
      this.detalleServicio3 = 'Mejorar resistencia y condición física';
    }

    if (servicio === 'membresias') {
      this.tituloServicio = 'PLANES DE MEMBRESÍA';
      this.descripcionServicio = 'Contamos con planes flexibles para que cada socio elija la opción que mejor se adapte a sus necesidades.';
      this.detalleServicio1 = 'Plan mensual: acceso por 30 días';
      this.detalleServicio2 = 'Plan trimestral: acceso por 3 meses';
      this.detalleServicio3 = 'Plan anual: acceso por 12 meses';
    }

    if (servicio === 'horarios') {
      this.tituloServicio = 'HORARIOS DE ATENCIÓN';
      this.descripcionServicio = 'El gimnasio cuenta con horarios amplios para que los socios puedan entrenar según su disponibilidad.';
      this.detalleServicio1 = 'Lunes a viernes: 6:00 a.m. - 10:00 p.m.';
      this.detalleServicio2 = 'Sábados: 7:00 a.m. - 6:00 p.m.';
      this.detalleServicio3 = 'Domingos: 8:00 a.m. - 1:00 p.m.';
    }
  }

  cerrarModalServicio() {
    this.mostrarModalServicio = false;
  }
}