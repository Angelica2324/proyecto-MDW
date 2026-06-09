import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-usuario.html',
})
export class EditarUsuario implements OnInit {

  @Output() actualizado = new EventEmitter<void>(); 
  @Output() cerrar = new EventEmitter<void>();  

  @Input() entrenador: any;
  usuarioCompleto: any = {};
  idUsuario: number = 0;
  idEntrenador: number = 0;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('entrenador recibido:', this.entrenador);
    if (this.entrenador?.id) {
      this.apiService.getEntrenadores().subscribe((entrenadores: any) => {
        const entrenadorData = entrenadores.find((e: any) => e.id_entrenador === this.entrenador.id);
        
        if (entrenadorData) {
          this.idEntrenador = entrenadorData.id_entrenador;
          this.idUsuario = entrenadorData.id_usuario;
          
          this.apiService.getUsuarios().subscribe((usuarios: any) => {
            const usuario = usuarios.find((u: any) => u.id_usuario === this.idUsuario);
            
            if (usuario) {
              this.usuarioCompleto = usuario;
              this.usuarioCompleto.especialidad = entrenadorData.especialidad;
              this.cdr.detectChanges();
            }
          });
        }
      });
    }
  }

  guardar() {
    const usuarioActualizado = {
      primer_nombre_usuario: this.usuarioCompleto.primer_nombre_usuario,
      segundo_nombre_usuario: this.usuarioCompleto.segundo_nombre_usuario,
      apellidos_usuario: this.usuarioCompleto.apellidos_usuario,
      tipo_documento: 'DNI',
      documento_identidad: this.usuarioCompleto.documento_identidad,
      email: this.usuarioCompleto.email,
      contraseña: this.usuarioCompleto.contraseña,
      telefono: this.usuarioCompleto.telefono,
      estado: this.usuarioCompleto.estado,
      fecha_registro: this.usuarioCompleto.fecha_registro,
      id_rol: 2
    };
    
    this.apiService.actualizarUsuario(this.idUsuario, usuarioActualizado).subscribe({
      next: () => {
        const entrenadorActualizado = {
          id_entrenador: this.idEntrenador,
          especialidad: this.usuarioCompleto.especialidad
        };
        this.apiService.actualizarEntrenador(this.idUsuario, entrenadorActualizado).subscribe({
          next: () => {
            alert('Guardado exitosamente');
            this.actualizado.emit(); 
            this.cerrar.emit();  
          },
          error: (err: any) => console.error('Error al actualizar entrenador:', err)
        });
      },
      error: (err: any) => console.error('Error al actualizar usuario:', err)
    });
  }

  cerrarEditar() {
    this.cerrar.emit(); 
  }
}