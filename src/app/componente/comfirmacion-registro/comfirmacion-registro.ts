import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmacion-registro',
  standalone: true,
  imports: [],
  templateUrl: './comfirmacion-registro.html',
  styleUrl: './comfirmacion-registro.css'
})
export class ConfirmacionRegistro {
  @Input() socio = '';
  @Input() membresia = '';
  @Input() estado = '';

  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}