import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProyectoFinalMDW');

  mostrarRegistro = false;
  mostrarLogin = false;
  mostrarModal = false;

  socioRegistrado = '';
  membresiaRegistrada = '';
  estadoRegistrado = 'Activo';

  irARegistro() {
    this.mostrarRegistro = true;
    this.mostrarLogin = false;
    this.mostrarModal = false;
  }

  irALogin() {
    this.mostrarLogin = true;
    this.mostrarRegistro = false;
    this.mostrarModal = false;
  }

  irAInicio() {
    this.mostrarRegistro = false;
    this.mostrarLogin = false;
    this.mostrarModal = false;
  }

  registrarSocio(nombre: string, membresia: string) {
    this.socioRegistrado = nombre;
    this.membresiaRegistrada = membresia;
    this.estadoRegistrado = 'Activo';
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.irAInicio();
  }
}