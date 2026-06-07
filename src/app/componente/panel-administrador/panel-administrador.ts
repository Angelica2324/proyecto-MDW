import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panel-administrador',
  standalone: true,
  imports: [],
  templateUrl: './panel-administrador.html',
  styleUrl: './panel-administrador.css'
})
export class PanelAdministrador {
  @Output() cerrarSesion = new EventEmitter<void>();

  socios = [
    { id: '01', nombre: 'Juan Pérez', estado: 'Activo', membresia: 'Mensual' },
    { id: '02', nombre: 'Ana López', estado: 'Inactivo', membresia: 'Trimestral' },
    { id: '03', nombre: 'Carlos Martín', estado: 'Activo', membresia: 'Anual' },
    { id: '04', nombre: 'María García', estado: 'Activo', membresia: 'Mensual' },
    { id: '05', nombre: 'Pedro Sánchez', estado: 'Inactivo', membresia: 'Semestral' },
    { id: '06', nombre: 'Lucía Torres', estado: 'Activo', membresia: 'Mensual' },
    { id: '07', nombre: 'Diego Ramos', estado: 'Activo', membresia: 'Trimestral' },
    { id: '08', nombre: 'Sofía Herrera', estado: 'Inactivo', membresia: 'Anual' }
  ];

  paginaActual = 1;
  elementosPorPagina = 5;

  get totalPaginas(): number {
    return Math.ceil(this.socios.length / this.elementosPorPagina);
  }

  get sociosPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.socios.slice(inicio, fin);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(numero: number) {
    this.paginaActual = numero;
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  agregarSocio() {
    alert('Aquí irá la función para agregar socio.');
  }

  editarSocio(socio: any) {
    alert('Editar socio: ' + socio.nombre);
  }

  eliminarSocio(socio: any) {
    alert('Eliminar socio: ' + socio.nombre);
  }

  salir() {
    this.cerrarSesion.emit();
  }
}