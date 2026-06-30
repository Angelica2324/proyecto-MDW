import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css'
})
export class EditarUsuario implements OnInit, OnChanges {

  @Output() actualizado = new EventEmitter<void>();
  @Output() cerrar = new EventEmitter<void>();

  @Input() entrenador: any;

  usuarioCompleto: any = {
    primer_nombre_usuario: '',
    segundo_nombre_usuario: '',
    apellidos_usuario: '',
    tipo_documento: 'DNI',
    documento_identidad: '',
    email: '',
    contrasena: '',
    contraseña: '',
    telefono: '',
    estado: true,
    fecha_registro: '',
    id_rol: 2,
    especialidad: ''
  };

  idUsuario: number = 0;
  idEntrenador: number = 0;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('Entrenador recibido en ngOnInit:', this.entrenador);

    this.cargarDatosDesdeInput();

    if (this.entrenador?.id || this.entrenador?.id_entrenador) {
      this.cargarDatosDesdeBackend();
    }
  }

  ngOnChanges() {
    console.log('Entrenador recibido en ngOnChanges:', this.entrenador);

    if (this.entrenador) {
      this.cargarDatosDesdeInput();
    }
  }

  cargarDatosDesdeInput() {
    if (!this.entrenador) {
      return;
    }

    this.idEntrenador = Number(this.entrenador.id_entrenador || this.entrenador.id || 0);
    this.idUsuario = Number(this.entrenador.id_usuario || 0);

    this.usuarioCompleto = {
      ...this.usuarioCompleto,

      primer_nombre_usuario:
        this.entrenador.primer_nombre_usuario ||
        this.entrenador.nombre ||
        '',

      segundo_nombre_usuario:
        this.entrenador.segundo_nombre_usuario ||
        this.entrenador.segundo_nombre ||
        '',

      apellidos_usuario:
        this.entrenador.apellidos_usuario ||
        this.entrenador.apellidos ||
        '',

      tipo_documento:
        this.entrenador.tipo_documento ||
        'DNI',

      documento_identidad:
        this.entrenador.documento_identidad ||
        '',

      email:
        this.entrenador.email ||
        '',

      contrasena:
        this.entrenador.contrasena ||
        '',

      contraseña:
        this.entrenador.contraseña ||
        this.entrenador.contrasena ||
        '',

      telefono:
        this.entrenador.telefono ||
        '',

      estado:
        this.entrenador.estado === 'Activo' || this.entrenador.estado === true,

      fecha_registro:
        this.entrenador.fecha_registro ||
        '',

      id_rol: 2,

      especialidad:
        this.entrenador.especialidad ||
        ''
    };

    this.cdr.detectChanges();
  }

  cargarDatosDesdeBackend() {
    this.apiService.getEntrenadores().subscribe({
      next: (entrenadores: any) => {
        const idEntrenador = Number(this.entrenador.id_entrenador || this.entrenador.id);

        const entrenadorData = entrenadores.find((e: any) =>
          Number(e.id_entrenador) === idEntrenador
        );

        if (entrenadorData) {
          this.idEntrenador = entrenadorData.id_entrenador;
          this.idUsuario = entrenadorData.id_usuario;

          this.apiService.getUsuarios().subscribe({
            next: (usuarios: any) => {
              const usuario = usuarios.find((u: any) =>
                Number(u.id_usuario) === Number(this.idUsuario)
              );

              if (usuario) {
                this.usuarioCompleto = {
                  ...usuario,
                  especialidad: entrenadorData.especialidad,
                  estado: usuario.estado === true || usuario.estado === 'Activo'
                };

                this.cdr.detectChanges();
              }
            },
            error: (err: any) => {
              console.error('Error al cargar usuario:', err);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error al cargar entrenadores:', err);
      }
    });
  }

  guardar() {
    const usuarioActualizado = {
      primer_nombre_usuario: this.usuarioCompleto.primer_nombre_usuario,
      segundo_nombre_usuario: this.usuarioCompleto.segundo_nombre_usuario,
      apellidos_usuario: this.usuarioCompleto.apellidos_usuario,
      tipo_documento: this.usuarioCompleto.tipo_documento || 'DNI',
      documento_identidad: this.usuarioCompleto.documento_identidad,
      email: this.usuarioCompleto.email,

      contraseña: this.usuarioCompleto.contraseña || this.usuarioCompleto.contrasena || '123456',
      contrasena: this.usuarioCompleto.contrasena || this.usuarioCompleto.contraseña || '123456',

      telefono: this.usuarioCompleto.telefono,
      estado: this.usuarioCompleto.estado,
      fecha_registro: this.usuarioCompleto.fecha_registro,
      id_rol: 2
    };

    const entrenadorActualizado = {
      id_entrenador: this.idEntrenador,
      id_usuario: this.idUsuario,
      especialidad: this.usuarioCompleto.especialidad
    };

    // Si no hay ID real, se guarda solo visualmente para pruebas
    if (!this.idUsuario || !this.idEntrenador) {
      this.guardarVisualmente();
      return;
    }

    this.apiService.actualizarUsuario(this.idUsuario, usuarioActualizado).subscribe({
      next: () => {
        this.apiService.actualizarEntrenador(this.idEntrenador, entrenadorActualizado).subscribe({
          next: () => {
            alert('Guardado exitosamente');
            this.actualizado.emit();
            this.cerrar.emit();
          },
          error: (err: any) => {
            console.error('Error al actualizar entrenador:', err);
            alert('No se pudo guardar en backend, pero se guardó visualmente para prueba.');
            this.guardarVisualmente();
          }
        });
      },
      error: (err: any) => {
        console.error('Error al actualizar usuario:', err);
        alert('No se pudo guardar en backend, pero se guardó visualmente para prueba.');
        this.guardarVisualmente();
      }
    });
  }

  guardarVisualmente() {
    if (this.entrenador) {
      this.entrenador.primer_nombre_usuario = this.usuarioCompleto.primer_nombre_usuario;
      this.entrenador.segundo_nombre_usuario = this.usuarioCompleto.segundo_nombre_usuario;
      this.entrenador.apellidos_usuario = this.usuarioCompleto.apellidos_usuario;

      this.entrenador.nombre = this.usuarioCompleto.primer_nombre_usuario;
      this.entrenador.segundo_nombre = this.usuarioCompleto.segundo_nombre_usuario;
      this.entrenador.apellidos = this.usuarioCompleto.apellidos_usuario;

      this.entrenador.email = this.usuarioCompleto.email;
      this.entrenador.telefono = this.usuarioCompleto.telefono;
      this.entrenador.estado = this.usuarioCompleto.estado ? 'Activo' : 'Inactivo';
      this.entrenador.especialidad = this.usuarioCompleto.especialidad;
    }

    alert('Cambios guardados visualmente');
    this.actualizado.emit();
    this.cerrar.emit();
  }

  cerrarEditar() {
    this.cerrar.emit();
  }
}