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
    { id: '05', nombre: 'Pedro Sánchez', estado: 'Inactivo', membresia: 'Semestral' }
  ];

  salir() {
    this.cerrarSesion.emit();
  }

  agregar() {
    alert('Función para agregar socio aún no implementada.');
  }

  editar() {
    alert('Función para editar socio aún no implementada.');
  }

  eliminar() {
    alert('Función para eliminar socio aún no implementada.');
  }
}