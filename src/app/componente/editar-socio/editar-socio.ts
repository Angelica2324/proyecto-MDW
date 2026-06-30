import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-editar-socio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-socio.html',
  styleUrl: './editar-socio.css'
})
export class EditarSocio implements OnInit, OnChanges {

  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizado = new EventEmitter<void>();

  @Input() socio: any;

  usuario: any = {
    id_usuario: 0,
    primer_nombre_usuario: '',
    segundo_nombre_usuario: '',
    apellidos_usuario: '',
    tipo_documento: 'DNI',
    documento_identidad: '',
    email: '',
    contraseña: '',
    contrasena: '',
    telefono: '',
    estado: true,
    fecha_registro: '',
    id_rol: 3
  };

  membresia: any = {
    tipo_membresia: 'Mensual',
    Tipo_membresia: 'Mensual',
    estado_membresia: 'Activa',
    fecha_inicio: '',
    fecha_vencimiento: '',
    id_entrenador: null,
    monto_total: 0
  };

  idSocio: number = 0;
  idMembresia: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarDatosDesdeInput();

    if (this.socio?.id_usuario) {
      this.cargarDatosDesdeBackend();
    }
  }

  ngOnChanges() {
    if (this.socio) {
      this.cargarDatosDesdeInput();
    }
  }

  cargarDatosDesdeInput() {
    if (!this.socio) {
      return;
    }

    this.idSocio = Number(this.socio.id_socio || 0);

    this.usuario = {
      ...this.usuario,

      id_usuario: Number(this.socio.id_usuario || 0),

      primer_nombre_usuario:
        this.socio.primer_nombre_usuario ||
        this.socio.nombre ||
        '',

      segundo_nombre_usuario:
        this.socio.segundo_nombre_usuario ||
        this.socio.segundo_nombre ||
        '',

      apellidos_usuario:
        this.socio.apellidos_usuario ||
        this.socio.apellidos ||
        '',

      tipo_documento:
        this.socio.tipo_documento ||
        'DNI',

      documento_identidad:
        this.socio.documento_identidad ||
        this.socio.dni ||
        '',

      email:
        this.socio.email ||
        '',

      contraseña:
        this.socio.contraseña ||
        this.socio.contrasena ||
        '',

      contrasena:
        this.socio.contrasena ||
        this.socio.contraseña ||
        '',

      telefono:
        this.socio.telefono ||
        '',

      estado:
        this.socio.estado === 'Activo' || this.socio.estado === true,

      fecha_registro:
        this.socio.fecha_registro ||
        '',

      id_rol: 3
    };

    this.membresia = {
      ...this.membresia,

      tipo_membresia:
        this.socio.tipo_membresia ||
        this.socio.Tipo_membresia ||
        this.socio.membresia ||
        'Mensual',

      Tipo_membresia:
        this.socio.Tipo_membresia ||
        this.socio.tipo_membresia ||
        this.socio.membresia ||
        'Mensual',

      estado_membresia:
        this.socio.estado_membresia ||
        'Activa',

      fecha_inicio:
        this.socio.fecha_inicio ||
        '',

      fecha_vencimiento:
        this.socio.fecha_vencimiento ||
        '',

      id_entrenador:
        this.socio.id_entrenador ||
        null,

      monto_total:
        this.socio.monto_total ||
        0
    };
  }

  cargarDatosDesdeBackend() {
    const idUsuario = Number(this.socio?.id_usuario);

    if (!idUsuario) {
      console.warn('No se recibió id_usuario para el socio.');
      return;
    }

    this.apiService.getUsuarios().subscribe({
      next: (usuarios: any[]) => {
        const usuarioEncontrado = usuarios.find((u: any) =>
          Number(u.id_usuario) === idUsuario
        );

        if (usuarioEncontrado) {
          this.usuario = {
            ...usuarioEncontrado,
            estado: usuarioEncontrado.estado === true || usuarioEncontrado.estado === 'Activo'
          };
        }
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
      }
    });

    this.apiService.getSocios().subscribe({
      next: (socios: any[]) => {
        const socioData = socios.find((s: any) =>
          Number(s.id_usuario) === idUsuario
        );

        if (socioData) {
          this.idSocio = Number(socioData.id_socio);

          this.apiService.getMembresias().subscribe({
            next: (membresias: any[]) => {
              const membresiaData = membresias.find((m: any) =>
                Number(m.id_socio) === Number(this.idSocio)
              );

              if (membresiaData) {
                this.idMembresia = Number(membresiaData.id_membresia);

                this.membresia = {
                  ...membresiaData,
                  tipo_membresia:
                    membresiaData.tipo_membresia ||
                    membresiaData.Tipo_membresia ||
                    'Mensual',

                  Tipo_membresia:
                    membresiaData.Tipo_membresia ||
                    membresiaData.tipo_membresia ||
                    'Mensual'
                };
              }
            },
            error: (err: any) => {
              console.error('Error al cargar membresías:', err);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error al cargar socios:', err);
      }
    });
  }

  guardar() {
    const usuarioActualizado = {
      primer_nombre_usuario: this.usuario.primer_nombre_usuario,
      segundo_nombre_usuario: this.usuario.segundo_nombre_usuario || '',
      apellidos_usuario: this.usuario.apellidos_usuario,
      tipo_documento: this.usuario.tipo_documento || 'DNI',
      documento_identidad: this.usuario.documento_identidad,
      email: this.usuario.email,

      contraseña: this.usuario.contraseña || this.usuario.contrasena || '123456',
      contrasena: this.usuario.contrasena || this.usuario.contraseña || '123456',

      telefono: this.usuario.telefono,
      estado: this.usuario.estado,
      fecha_registro: this.usuario.fecha_registro,
      id_rol: 3
    };

    const membresiaActualizada = {
      Tipo_membresia: this.membresia.tipo_membresia || this.membresia.Tipo_membresia,
      tipo_membresia: this.membresia.tipo_membresia || this.membresia.Tipo_membresia,
      estado_membresia: this.membresia.estado_membresia,
      fecha_inicio: this.membresia.fecha_inicio,
      fecha_vencimiento: this.membresia.fecha_vencimiento,
      id_entrenador: this.membresia.id_entrenador,
      id_socio: this.idSocio,
      monto_total: this.membresia.monto_total
    };

    if (!this.usuario?.id_usuario || !this.idSocio || !this.idMembresia) {
      alert('No se pudo guardar en backend, pero se guardó visualmente para prueba.');
      this.guardarVisualmente();
      return;
    }

    this.apiService.actualizarUsuario(this.usuario.id_usuario, usuarioActualizado).subscribe({
      next: () => {
        this.apiService.actualizarMembresia(this.idMembresia, membresiaActualizada).subscribe({
          next: () => {
            alert('Socio actualizado exitosamente');
            this.actualizado.emit();
            this.cerrar.emit();
          },
          error: (err: any) => {
            console.error('Error al actualizar membresía:', err);
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
    if (this.socio) {
      this.socio.primer_nombre_usuario = this.usuario.primer_nombre_usuario;
      this.socio.segundo_nombre_usuario = this.usuario.segundo_nombre_usuario;
      this.socio.apellidos_usuario = this.usuario.apellidos_usuario;

      this.socio.nombre = this.usuario.primer_nombre_usuario;
      this.socio.segundo_nombre = this.usuario.segundo_nombre_usuario;
      this.socio.apellidos = this.usuario.apellidos_usuario;

      this.socio.documento_identidad = this.usuario.documento_identidad;
      this.socio.dni = this.usuario.documento_identidad;
      this.socio.email = this.usuario.email;
      this.socio.telefono = this.usuario.telefono;
      this.socio.estado = this.usuario.estado ? 'Activo' : 'Inactivo';

      this.socio.membresia = this.membresia.tipo_membresia || this.membresia.Tipo_membresia;
      this.socio.tipo_membresia = this.membresia.tipo_membresia || this.membresia.Tipo_membresia;
      this.socio.Tipo_membresia = this.membresia.Tipo_membresia || this.membresia.tipo_membresia;
      this.socio.estado_membresia = this.membresia.estado_membresia;
      this.socio.fecha_inicio = this.membresia.fecha_inicio;
      this.socio.fecha_vencimiento = this.membresia.fecha_vencimiento;
      this.socio.monto_total = this.membresia.monto_total;
    }

    alert('Cambios guardados visualmente');
    this.actualizado.emit();
    this.cerrar.emit();
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}