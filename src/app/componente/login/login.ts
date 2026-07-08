import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() volverInicio = new EventEmitter<void>();
  @Output() entrarPanelSocio = new EventEmitter<void>();
  @Output() entrarPanelEntrenador = new EventEmitter<void>();
  @Output() entrarPanelAdministrador = new EventEmitter<void>();
  @Output() irRegistro = new EventEmitter<void>();

  correo: string = '';
  contrasena: string = '';

  modoRecuperacion: boolean = false;
  pasoCodigo: boolean = false;

  correoRecuperacion: string = '';
  codigoRecuperacion: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  cargando: boolean = false;

  constructor(private api: ApiService) { }

  volver() {
    if (this.modoRecuperacion) {
      this.volverLogin();
    } else {
      this.volverInicio.emit();
    }
  }

  ingresar() {
    if (!this.correo.trim() || !this.contrasena.trim()) {
      alert('Completa el correo y la contraseña.');
      return;
    }

    this.api.getUsuarios().subscribe({
      next: (usuarios: any[]) => {
        const usuario = usuarios.find((u: any) =>
          u.email?.trim()?.toLowerCase() === this.correo.trim().toLowerCase() &&
          u.contraseña?.trim() === this.contrasena.trim()
        );

        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));

          switch (usuario.id_rol) {
            case 1:
              this.entrarPanelAdministrador.emit();
              break;
            case 2:
              this.entrarPanelEntrenador.emit();
              break;
            case 3:
              this.entrarPanelSocio.emit();
              break;
            default:
              alert('Rol no válido');
          }
        } else {
          alert('Correo o contraseña incorrectos');
        }
      },
      error: () => {
        alert('Error al conectar con el servidor.');
      }
    });
  }

  abrirRecuperacion() {
    this.modoRecuperacion = true;
    this.pasoCodigo = false;
    this.correoRecuperacion = '';
    this.codigoRecuperacion = '';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.cargando = false;
  }

  volverLogin() {
    this.modoRecuperacion = false;
    this.pasoCodigo = false;
    this.correoRecuperacion = '';
    this.codigoRecuperacion = '';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.cargando = false;
  }

  mostrarFormularioCodigo() {
    if (!this.correoRecuperacion.trim()) {
      alert('Primero escribe tu correo.');
      return;
    }

    this.pasoCodigo = true;
    this.cargando = false;
  }

  enviarCodigo() {
    if (!this.correoRecuperacion.trim()) {
      alert('Ingresa tu correo.');
      return;
    }

    this.cargando = true;

    this.api.recuperarPassword(this.correoRecuperacion).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;

        alert(respuesta.mensaje);

        if (respuesta.ok) {
          this.pasoCodigo = true;
        }
      },
      error: () => {
        this.cargando = false;
        alert('Error al enviar el código. Inténtalo nuevamente.');
      }
    });
  }

  cambiarContrasena() {
    if (!this.codigoRecuperacion.trim()) {
      alert('Ingresa el código enviado a tu correo.');
      return;
    }

    if (!this.nuevaContrasena.trim()) {
      alert('Ingresa tu nueva contraseña.');
      return;
    }

    if (!this.confirmarContrasena.trim()) {
      alert('Confirma tu nueva contraseña.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const datos = {
      email: this.correoRecuperacion,
      codigo: this.codigoRecuperacion,
      nuevaContrasena: this.nuevaContrasena,
      confirmarContrasena: this.confirmarContrasena
    };

    this.cargando = true;

    this.api.cambiarPassword(datos).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;

        alert(respuesta.mensaje);

        if (respuesta.ok) {
          this.volverLogin();
        }
      },
      error: () => {
        this.cargando = false;
        alert('Error al cambiar la contraseña. Inténtalo nuevamente.');
      }
    });
  }
}