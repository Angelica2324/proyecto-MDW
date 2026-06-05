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
  loginExitoso = false;
  loginError = '';

  socioRegistrado = '';
  membresiaRegistrada = '';
  estadoRegistrado = 'Activo';
  usuarioRegistrado = '';
  passwordRegistrado = '';

  irARegistro() {
    this.mostrarRegistro = true;
    this.mostrarLogin = false;
    this.mostrarModal = false;
    this.loginError = '';
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

  registrarSocio(nombre: string, membresia: string, usuario: string, contrasena: string) {
    this.socioRegistrado = nombre;
    this.membresiaRegistrada = membresia;
    this.usuarioRegistrado = usuario;
    this.passwordRegistrado = contrasena;
    this.estadoRegistrado = 'Activo';
    this.mostrarModal = true;
    this.loginError = '';
  }

  iniciarSesion(usuario: string, contrasena: string) {
    this.loginError = '';
    this.loginExitoso = false;

    if (!usuario || !contrasena) {
      this.loginError = 'Debes ingresar usuario y contraseña.';
      return;
    }

    if (usuario === this.usuarioRegistrado && contrasena === this.passwordRegistrado) {
      this.loginExitoso = true;
      this.mostrarLogin = false;
      this.mostrarRegistro = false;
      return;
    }

    this.loginError = this.usuarioRegistrado
      ? 'Usuario o contraseña incorrectos.'
      : 'No hay un usuario registrado. Regístrate primero.';
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.irAInicio();
  }
}