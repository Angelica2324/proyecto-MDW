import { Component, signal } from '@angular/core';

import { Principal } from './componente/principal/principal';
import { Registro } from './componente/registro/registro';
import { Login } from './componente/login/login';
import { ConfirmacionRegistro } from './componente/comfirmacion-registro/comfirmacion-registro';
import { PanelSocio } from './componente/panel-socio/panel-socio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Principal, Registro, Login, ConfirmacionRegistro, PanelSocio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-MDW');

  pantallaActual = 'principal';

  socioRegistrado = '';
  membresiaRegistrada = '';
  estadoRegistrado = 'Activo';

  irARegistro() {
    this.pantallaActual = 'registro';
  }

  irALogin() {
    this.pantallaActual = 'login';
  }

  irAInicio() {
    this.pantallaActual = 'principal';
  }

  mostrarConfirmacion(datos: { nombre: string; membresia: string }) {
    this.socioRegistrado = datos.nombre;
    this.membresiaRegistrada = datos.membresia;
    this.estadoRegistrado = 'Activo';
    this.pantallaActual = 'confirmacion';
  }

  cerrarConfirmacion() {
    this.pantallaActual = 'principal';
  }

  irAPanelSocio() {
    this.pantallaActual = 'panelSocio';
  }
}