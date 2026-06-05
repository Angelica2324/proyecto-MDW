import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() volverInicio = new EventEmitter<void>();
  @Output() entrarPanelSocio = new EventEmitter<void>();

  volver() {
    this.volverInicio.emit();
  }

  ingresar() {
    this.entrarPanelSocio.emit();
  }
}