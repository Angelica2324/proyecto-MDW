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

  seccionActual = 'inicio';

  busquedaSocio = '';
  busquedaEntrenador = '';

  administrador = {
    nombre: 'Kevin',
    apellido: 'Quispe Salcedo',
    cargo: 'Administrador General',
    ubicacion: 'Lima, Perú',
    telefono: '959 374 711',
    correo: 'Kevin@xtremefitness.com',
    estado: 'Activo',
    fechaIngreso: '07/06/2026'
  };

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

  entrenadores = [
    { id: '01', nombre: 'Carlos Ramos', estado: 'Activo', especialidad: 'Entrenamiento funcional' },
    { id: '02', nombre: 'Miguel Torres', estado: 'Activo', especialidad: 'Musculación' },
    { id: '03', nombre: 'Laura Méndez', estado: 'Activo', especialidad: 'Zumba' },
    { id: '04', nombre: 'Diego Herrera', estado: 'Inactivo', especialidad: 'Cross Training' },
    { id: '05', nombre: 'Andrea López', estado: 'Activo', especialidad: 'Cardio y resistencia' },
    { id: '06', nombre: 'Pedro Castillo', estado: 'Inactivo', especialidad: 'HIIT' }
  ];

  paginaSocios = 1;
  paginaEntrenadores = 1;
  elementosPorPagina = 5;

  cambiarSeccion(seccion: string) {
    this.seccionActual = seccion;
  }

  buscarSocio(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaSocio = input.value.toLowerCase();
    this.paginaSocios = 1;
  }

  buscarEntrenador(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaEntrenador = input.value.toLowerCase();
    this.paginaEntrenadores = 1;
  }

  get sociosFiltrados() {
    return this.socios.filter(socio =>
      socio.nombre.toLowerCase().includes(this.busquedaSocio) ||
      socio.estado.toLowerCase().includes(this.busquedaSocio) ||
      socio.membresia.toLowerCase().includes(this.busquedaSocio)
    );
  }

  get entrenadoresFiltrados() {
    return this.entrenadores.filter(entrenador =>
      entrenador.nombre.toLowerCase().includes(this.busquedaEntrenador) ||
      entrenador.estado.toLowerCase().includes(this.busquedaEntrenador) ||
      entrenador.especialidad.toLowerCase().includes(this.busquedaEntrenador)
    );
  }

  get totalPaginasSocios(): number {
    return Math.ceil(this.sociosFiltrados.length / this.elementosPorPagina);
  }

  get totalPaginasEntrenadores(): number {
    return Math.ceil(this.entrenadoresFiltrados.length / this.elementosPorPagina);
  }

  get sociosPaginados() {
    const inicio = (this.paginaSocios - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.sociosFiltrados.slice(inicio, fin);
  }

  get entrenadoresPaginados() {
    const inicio = (this.paginaEntrenadores - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.entrenadoresFiltrados.slice(inicio, fin);
  }

  get paginasSocios(): number[] {
    return Array.from({ length: this.totalPaginasSocios }, (_, i) => i + 1);
  }

  get paginasEntrenadores(): number[] {
    return Array.from({ length: this.totalPaginasEntrenadores }, (_, i) => i + 1);
  }

  cambiarPaginaSocios(numero: number) {
    this.paginaSocios = numero;
  }

  cambiarPaginaEntrenadores(numero: number) {
    this.paginaEntrenadores = numero;
  }

  paginaAnteriorSocios() {
    if (this.paginaSocios > 1) {
      this.paginaSocios--;
    }
  }

  paginaSiguienteSocios() {
    if (this.paginaSocios < this.totalPaginasSocios) {
      this.paginaSocios++;
    }
  }

  paginaAnteriorEntrenadores() {
    if (this.paginaEntrenadores > 1) {
      this.paginaEntrenadores--;
    }
  }

  paginaSiguienteEntrenadores() {
    if (this.paginaEntrenadores < this.totalPaginasEntrenadores) {
      this.paginaEntrenadores++;
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

  agregarEntrenador() {
    alert('Aquí irá la función para agregar entrenador.');
  }

  editarEntrenador(entrenador: any) {
    alert('Editar entrenador: ' + entrenador.nombre);
  }

  eliminarEntrenador(entrenador: any) {
    alert('Eliminar entrenador: ' + entrenador.nombre);
  }

  salir() {
    this.cerrarSesion.emit();
  }
}