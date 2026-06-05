import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  @Output() volverInicio = new EventEmitter<void>();
  @Output() registrar = new EventEmitter<{ nombre: string; membresia: string }>();

  volver() {
    this.volverInicio.emit();
  }

  registrarSocio(nombre: string, membresia: string) {
    this.registrar.emit({
      nombre: nombre,
      membresia: membresia
    });
  }
}