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

  irARegistro() {
    this.abrirRegistro.emit();
  }

  irALogin() {
    this.abrirLogin.emit();
  }
}