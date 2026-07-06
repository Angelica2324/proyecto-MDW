import { Component, signal } from '@angular/core';
import { Principal } from './componente/principal/principal';
import { Registro } from './componente/registro/registro';
import { Login } from './componente/login/login';
import { ConfirmacionRegistro } from './componente/comfirmacion-registro/comfirmacion-registro';
import { PanelSocio } from './componente/panel-socio/panel-socio';
import { PanelAdministrador } from './componente/panel-administrador/panel-administrador';
import { PanelEntrenador } from './componente/panel-entrenador/panel-entrenador';
import { Pago } from "./componente/pago/pago";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Principal, Registro, Login, ConfirmacionRegistro, PanelSocio, PanelAdministrador, PanelEntrenador,Pago],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-MDW');

  pantallaActual = 'principal'; // Cambiar a 'principal' para iniciar en la pantalla principal
  datosPago: any = null;
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
    this.datosPago = null;
  }

  irPago(datosRegistro: any){
    console.log(' Datos recibidos en AppComponent:', datosRegistro);
    this.datosPago = datosRegistro;
    this.pantallaActual = 'pago';
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

  irAPanelAdministrador() {
    this.pantallaActual = 'panelAdministrador';
  }

  irAPanelEntrenador() {
    this.pantallaActual = 'panelEntrenador';
  }


}