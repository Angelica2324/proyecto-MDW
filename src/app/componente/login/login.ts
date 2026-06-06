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
  @Output() entrarPanelAdmin = new EventEmitter<void>();

  correo: string = '';
  
  contrasena: string = '';

  constructor(private api: ApiService) { }


  volver() {
    this.volverInicio.emit();
  }

   ingresar() {
    console.log('Correo ingresado:', this.correo);
    console.log('Contraseña ingresada:', this.contrasena);

    this.api.getUsuarios().subscribe(usuarios => {
      const usuario = usuarios.find((u: any) => 
        u.email.trim() === this.correo.trim() && 
        u.contraseña.trim() === this.contrasena.trim()
      );

      if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        switch(usuario.id_rol) {
          case 1:
            this.entrarPanelAdmin.emit();
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
    });
  }

  
}
