import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditarUsuario } from '../editar-usuario/editar-usuario';
import { AgregarSocio } from "../agregar-socio/agregar-socio";
import { EditarSocio } from '../editar-socio/editar-socio';
import { AgregarEntrenador } from "../agregar-entrenador/agregar-entrenador";

@Component({
  selector: 'app-panel-administrador',
  standalone: true,
  imports: [FormsModule, CommonModule, EditarUsuario, AgregarSocio, EditarSocio, AgregarEntrenador],
  templateUrl: './panel-administrador.html',
  styleUrl: './panel-administrador.css'
})
export class PanelAdministrador implements OnInit {
  @Output() cerrarSesion = new EventEmitter<void>();

  socios: any[] = [
  {
    id_socio: '01',
    id_usuario: 201,
    nombre: 'Juan Carlos',
    apellidos: 'Pérez Ramos',
    estado: 'Activo',
    email: 'juan.perez@gmail.com',
    telefono: '987654321',
    membresia: 'Plan Premium'
  },
  {
    id_socio: '02',
    id_usuario: 202,
    nombre: 'María Fernanda',
    apellidos: 'López Torres',
    estado: 'Activo',
    email: 'maria.lopez@gmail.com',
    telefono: '956789123',
    membresia: 'Plan Básico'
  },
  {
    id_socio: '03',
    id_usuario: 203,
    nombre: 'Luis Alberto',
    apellidos: 'García Díaz',
    estado: 'Inactivo',
    email: 'luis.garcia@gmail.com',
    telefono: '912345678',
    membresia: 'Plan Elite'
  },
  {
    id_socio: '04',
    id_usuario: 204,
    nombre: 'Camila',
    apellidos: 'Ramírez Soto',
    estado: 'Activo',
    email: 'camila.ramirez@gmail.com',
    telefono: '945678123',
    membresia: 'Plan Premium'
  },
  {
    id_socio: '05',
    id_usuario: 205,
    nombre: 'Andrés',
    apellidos: 'Mendoza Flores',
    estado: 'Inactivo',
    email: 'andres.mendoza@gmail.com',
    telefono: '978945612',
    membresia: 'Plan Básico'
  }
];
  usuarios: any[] = [];
  mostrarEditar = false;
  mostrarAgregar = false;
  entrenadorSeleccionado: any = null;
  mostrarEditarSocio = false;
  socioSeleccionado: any = null;
  mostrarAgregarEntrenador = false;

  seccionActual = 'inicio';

  busquedaSocio = '';
  busquedaEntrenador = '';

  administrador = {
    nombre: '',
    apellido: '',
    cargo: 'Administrador General',
    ubicacion: 'Lima, Perú',
    telefono: '',
    correo: '',
    estado: '',
    fechaIngreso: ''
  };
  
  mostrarEditarPerfil = false;

adminEditado = {
  nombre: '',
  apellido: '',
  cargo: '',
  ubicacion: '',
  telefono: '',
  correo: '',
  estado: '',
  fechaIngreso: ''
};

entrenadores = [
  {
    id: '01',
    id_entrenador: '01',
    id_usuario: 101,
    primer_nombre_usuario: 'Carlos',
    segundo_nombre_usuario: '',
    apellidos_usuario: 'Ramos',
    nombre: 'Carlos',
    segundo_nombre: '',
    apellidos: 'Ramos',
    estado: 'Activo',
    email: 'carlos.ramos@gmail.com',
    telefono: '987654321',
    especialidad: 'Entrenamiento funcional'
  },
  {
    id: '02',
    id_entrenador: '02',
    id_usuario: 102,
    primer_nombre_usuario: 'Miguel',
    segundo_nombre_usuario: '',
    apellidos_usuario: 'Torres',
    nombre: 'Miguel',
    segundo_nombre: '',
    apellidos: 'Torres',
    estado: 'Activo',
    email: 'miguel.torres@gmail.com',
    telefono: '956789123',
    especialidad: 'Musculación'
  },
  {
    id: '03',
    id_entrenador: '03',
    id_usuario: 103,
    primer_nombre_usuario: 'Laura',
    segundo_nombre_usuario: '',
    apellidos_usuario: 'Méndez',
    nombre: 'Laura',
    segundo_nombre: '',
    apellidos: 'Méndez',
    estado: 'Activo',
    email: 'laura.mendez@gmail.com',
    telefono: '912345678',
    especialidad: 'Zumba'
  },
  {
    id: '04',
    id_entrenador: '04',
    id_usuario: 104,
    primer_nombre_usuario: 'Diego',
    segundo_nombre_usuario: '',
    apellidos_usuario: 'Herrera',
    nombre: 'Diego',
    segundo_nombre: '',
    apellidos: 'Herrera',
    estado: 'Inactivo',
    email: 'diego.herrera@gmail.com',
    telefono: '945678123',
    especialidad: 'Cross Training'
  },
  {
    id: '05',
    id_entrenador: '05',
    id_usuario: 105,
    primer_nombre_usuario: 'Andrea',
    segundo_nombre_usuario: '',
    apellidos_usuario: 'López',
    nombre: 'Andrea',
    segundo_nombre: '',
    apellidos: 'López',
    estado: 'Activo',
    email: 'andrea.lopez@gmail.com',
    telefono: '978945612',
    especialidad: 'Cardio y resistencia'
  }
];

  paginaSocios = 1;
  paginaEntrenadores = 1;
  elementosPorPagina = 5;
  totalSocios: number = 0;
  sociosActivos: number = 0;
  sociosInactivos: number = 0;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioGuardado = localStorage.getItem('usuario');

      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);

        this.administrador.nombre = usuario.primer_nombre_usuario + ' ' + (usuario.segundo_nombre_usuario || '');
        this.administrador.apellido = usuario.apellidos_usuario;
        this.administrador.telefono = usuario.telefono;
        this.administrador.correo = usuario.email;
        this.administrador.estado = 'Activo';
        this.administrador.fechaIngreso = usuario.fecha_registro;
      }
    }

    this.cargarDatosDelasApis();
  }

  cargarDatosDelasApis() {
    this.cargarSocios();
    this.cargarEntrenadores();
  }

  cargarSocios() {
    this.apiService.getUsuarios().subscribe((usuarios: any) => {
      console.log('Usuarios:', usuarios);
      console.log('Usuarios con rol 3:', usuarios.filter((u: any) => u.id_rol === 3));

      const sociosFiltrados = usuarios.filter((usuario: any) => usuario.id_rol === 3);

      this.apiService.getSocios().subscribe((sociosData: any) => {
        console.log('Socios data:', sociosData);

        this.apiService.getMembresias().subscribe((membresias: any) => {
          console.log('Membresias:', membresias);

          this.socios = sociosFiltrados.map((usuario: any) => {
            const socio = sociosData.find((s: any) => s.id_usuario === usuario.id_usuario);
            const membresia = membresias.find((m: any) => m.id_socio === socio?.id_socio);

            return {
              id_socio: socio ? socio.id_socio : usuario.id_usuario,
              id_usuario: usuario.id_usuario,
              nombre: `${usuario.primer_nombre_usuario} ${usuario.segundo_nombre_usuario || ''}`,
              apellidos: usuario.apellidos_usuario,
              estado: usuario.estado ? 'Activo' : 'Inactivo',
              email: usuario.email,
              telefono: usuario.telefono,
              membresia: membresia ? membresia.Tipo_membresia : 'Sin membresía'
            };
          });

          // Calcular estadísticas
        this.totalSocios = this.socios.length;
        this.sociosActivos = this.socios.filter(s => s.estado === 'Activo').length;
        this.sociosInactivos = this.socios.filter(s => s.estado === 'Inactivo').length;
          console.log('Socios cargados:', this.socios);
        });
      });
    });
  }

  recargarDatos() {
    this.cargarSocios();
    this.cargarEntrenadores();
    this.cdr.detectChanges();
  }

  cargarEntrenadores() {
    this.apiService.getUsuarios().subscribe((usuarios: any) => {
      const entrenadoresFiltrados = usuarios.filter((usuario: any) => usuario.id_rol === 2);
      console.log('Entrenadores filtrados:', entrenadoresFiltrados);

      this.apiService.getEntrenadores().subscribe((entrenadoresData: any) => {
        console.log('Entrenadores data desde API:', entrenadoresData);

        this.entrenadores = entrenadoresFiltrados.map((usuario: any) => {
          const entrenadorInfo = entrenadoresData.find((e: any) => e.id_usuario === usuario.id_usuario);

          console.log('EntrenadorInfo para usuario', usuario.id_usuario, ':', entrenadorInfo);
          console.log('Buscando entrenador para id_usuario:', usuario.id_usuario);
          console.log('entrenadoresData completo:', entrenadoresData);

          return {
            id: entrenadorInfo ? entrenadorInfo.id_entrenador : '',
            id_usuario: usuario.id_usuario,
            nombre: `${usuario.primer_nombre_usuario} ${usuario.segundo_nombre_usuario}`,
            apellidos: usuario.apellidos_usuario,
            estado: usuario.estado ? 'Activo' : 'Inactivo',
            email: usuario.email,
            telefono: usuario.telefono,
            especialidad: entrenadorInfo ? entrenadorInfo.especialidad : 'Sin especialidad'
          };
        });

        console.log('Entrenadores final:', this.entrenadores);
      });
    });
  }

  cambiarSeccion(seccion: string) {
    this.seccionActual = seccion;
  }

  buscarSocio(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaSocio = input.value.toLowerCase();
    this.paginaSocios = 1;
  }

  buscarEntrenador(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.busquedaEntrenador = input.value.toLowerCase();
    this.paginaEntrenadores = 1;
  }

  get sociosFiltrados() {
    return this.socios.filter(socio =>
      socio.nombre.toLowerCase().includes(this.busquedaSocio) ||
      socio.estado.toLowerCase().includes(this.busquedaSocio) ||
      socio.membresia.toLowerCase().includes(this.busquedaSocio)
    );
  }

  get entrenadoresFiltrados() {
    return this.entrenadores.filter(entrenador =>
      entrenador.nombre.toLowerCase().includes(this.busquedaEntrenador) ||
      entrenador.estado.toLowerCase().includes(this.busquedaEntrenador) ||
      entrenador.especialidad.toLowerCase().includes(this.busquedaEntrenador)
    );
  }

  get totalPaginasSocios(): number {
    return Math.ceil(this.sociosFiltrados.length / this.elementosPorPagina);
  }

  get totalPaginasEntrenadores(): number {
    return Math.ceil(this.entrenadoresFiltrados.length / this.elementosPorPagina);
  }

  get sociosPaginados() {
    const inicio = (this.paginaSocios - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.sociosFiltrados.slice(inicio, fin);
  }

  get entrenadoresPaginados() {
    const inicio = (this.paginaEntrenadores - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.entrenadoresFiltrados.slice(inicio, fin);
  }

  get paginasSocios(): number[] {
    return Array.from({ length: this.totalPaginasSocios }, (_, i) => i + 1);
  }

  get paginasEntrenadores(): number[] {
    return Array.from({ length: this.totalPaginasEntrenadores }, (_, i) => i + 1);
  }

  cambiarPaginaSocios(numero: number) {
    this.paginaSocios = numero;
  }

  cambiarPaginaEntrenadores(numero: number) {
    this.paginaEntrenadores = numero;
  }

  paginaAnteriorSocios() {
    if (this.paginaSocios > 1) {
      this.paginaSocios--;
    }
  }

  paginaSiguienteSocios() {
    if (this.paginaSocios < this.totalPaginasSocios) {
      this.paginaSocios++;
    }
  }

  paginaAnteriorEntrenadores() {
    if (this.paginaEntrenadores > 1) {
      this.paginaEntrenadores--;
    }
  }

  paginaSiguienteEntrenadores() {
    if (this.paginaEntrenadores < this.totalPaginasEntrenadores) {
      this.paginaEntrenadores++;
    }
  }

  agregarSocio() {
    this.mostrarAgregar = true;
  }

  editarSocio(socio: any) {
    console.log('Socio recibido:', socio);
    this.socioSeleccionado = socio;
    this.mostrarEditarSocio = true;
  }

  cerrarEditarSocio() {
    this.mostrarEditarSocio = false;
    this.recargarDatos();
  }

 eliminarSocio(socio: any) {
  const confirmar = confirm(`¿Estás seguro de eliminar a ${socio.nombre} ${socio.apellidos || ''}?`);

  if (!confirmar) {
    return;
  }

  const idSocio = Number(socio.id_socio);
  const idUsuario = Number(socio.id_usuario);

  if (!idSocio || !idUsuario) {
    this.eliminarSocioVisualmente(socio);
    return;
  }

  this.apiService.eliminarSocio(idSocio).subscribe({
    next: () => {
      this.apiService.eliminarUsuario(idUsuario).subscribe({
        next: () => {
          alert('Socio eliminado correctamente');
          this.socios = this.socios.filter((item: any) =>
            Number(item.id_socio) !== idSocio
          );
          this.recargarDatos();
        },
        error: (err: any) => {
          console.error('Error al eliminar usuario:', err);
          alert('No se pudo eliminar en backend, pero se eliminará visualmente para prueba.');
          this.eliminarSocioVisualmente(socio);
        }
      });
    },
    error: (err: any) => {
      console.error('Error al eliminar socio:', err);
      alert('No se pudo eliminar en backend, pero se eliminará visualmente para prueba.');
      this.eliminarSocioVisualmente(socio);
    }
  });
}

eliminarSocioVisualmente(socio: any) {
  this.socios = this.socios.filter((item: any) =>
    item !== socio &&
    String(item.id_socio) !== String(socio.id_socio)
  );
  alert('Socio eliminado visualmente');
}

  agregarEntrenador() {
    this.mostrarAgregarEntrenador = true;
  }

editarEntrenador(entrenador: any) {
  console.log('Entrenador seleccionado:', entrenador);

  this.entrenadorSeleccionado = {
    id: entrenador.id,
    id_entrenador: entrenador.id_entrenador || entrenador.id,
    id_usuario: entrenador.id_usuario,

    primer_nombre_usuario: entrenador.primer_nombre_usuario || entrenador.nombre || '',
    segundo_nombre_usuario: entrenador.segundo_nombre_usuario || entrenador.segundo_nombre || '',
    apellidos_usuario: entrenador.apellidos_usuario || entrenador.apellidos || '',

    nombre: entrenador.nombre || entrenador.primer_nombre_usuario || '',
    segundo_nombre: entrenador.segundo_nombre || entrenador.segundo_nombre_usuario || '',
    apellidos: entrenador.apellidos || entrenador.apellidos_usuario || '',

    email: entrenador.email || '',
    telefono: entrenador.telefono || '',
    estado: entrenador.estado || 'Activo',
    especialidad: entrenador.especialidad || ''
  };

  this.mostrarEditar = true;
}

  cerrarEditar() {
    this.mostrarEditar = false;
    this.recargarDatos();
  }

eliminarEntrenador(entrenador: any) {
  const confirmar = confirm(`¿Estás seguro de eliminar a ${entrenador.nombre} ${entrenador.apellidos || ''}?`);

  if (!confirmar) {
    return;
  }

  const idEntrenador = Number(entrenador.id_entrenador || entrenador.id);
  const idUsuario = Number(entrenador.id_usuario);

  // Si no tiene IDs reales, se elimina solo visualmente
  if (!idEntrenador || !idUsuario) {
    this.eliminarEntrenadorVisualmente(entrenador);
    return;
  }

  this.apiService.eliminarEntrenador(idEntrenador).subscribe({
    next: () => {
      this.apiService.eliminarUsuario(idUsuario).subscribe({
        next: () => {
          alert('Entrenador eliminado correctamente');

          this.entrenadores = this.entrenadores.filter((item: any) =>
            Number(item.id_entrenador || item.id) !== idEntrenador
          );

          this.recargarDatos();
        },
        error: (err: any) => {
          console.error('Error al eliminar usuario:', err);

          alert('No se pudo eliminar en backend, pero se eliminará visualmente para prueba.');
          this.eliminarEntrenadorVisualmente(entrenador);
        }
      });
    },
    error: (err: any) => {
      console.error('Error al eliminar entrenador:', err);

      alert('No se pudo eliminar en backend, pero se eliminará visualmente para prueba.');
      this.eliminarEntrenadorVisualmente(entrenador);
    }
  });
}

eliminarEntrenadorVisualmente(entrenador: any) {
  this.entrenadores = this.entrenadores.filter((item: any) =>
    item !== entrenador &&
    String(item.id) !== String(entrenador.id) &&
    String(item.id_entrenador) !== String(entrenador.id_entrenador)
  );

  alert('Entrenador eliminado visualmente');
}
  abrirEditarPerfil() {
  this.adminEditado = { ...this.administrador };
  this.mostrarEditarPerfil = true;
}

cancelarEditarPerfil() {
  this.mostrarEditarPerfil = false;
}

guardarPerfil() {

   this.mostrarEditarPerfil = false;
  // Validar campos obligatorios
  if (!this.adminEditado.nombre || !this.adminEditado.apellido) {
    alert('El nombre y apellido son obligatorios');
    return;
  }

  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.adminEditado.correo)) {
    alert('Por favor ingrese un correo electrónico válido');
    return;
  }

  // Guardar localmente
  this.administrador = { ...this.adminEditado };

  // Obtener el ID del usuario desde localStorage
  if (isPlatformBrowser(this.platformId)) {
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        const idUsuario = usuario.id_usuario || usuario.id;

        // Preparar los datos para enviar a la API
        const datosActualizar = {
          primer_nombre_usuario: this.administrador.nombre.split(' ')[0] || this.administrador.nombre,
          segundo_nombre_usuario: this.administrador.nombre.split(' ').slice(1).join(' ') || '',
          apellidos_usuario: this.administrador.apellido,
          tipo_documento: usuario.tipo_documento || 'dni',
          documento_identidad: usuario.documento_identidad || '',
          fecha_nacimiento: usuario.fecha_nacimiento || '2000-01-01',
          email: this.administrador.correo,
          contraseña: usuario.contraseña || '',
          telefono: this.administrador.telefono,
          estado: this.administrador.estado === 'Activo',
          fecha_registro: this.administrador.fechaIngreso || usuario.fecha_registro,
          id_rol: 1 // Siempre 1 para administrador
        };
 
        this.apiService.actualizarUsuario(idUsuario, datosActualizar).subscribe({
          next: (respuesta) => {
            console.log('Usuario actualizado correctamente:', respuesta);
            
            // Actualizar datos en localStorage
            usuario.primer_nombre_usuario = datosActualizar.primer_nombre_usuario;
            usuario.segundo_nombre_usuario = datosActualizar.segundo_nombre_usuario;
            usuario.apellidos_usuario = datosActualizar.apellidos_usuario;
            usuario.email = datosActualizar.email;
            usuario.telefono = datosActualizar.telefono;
            usuario.estado = datosActualizar.estado;
            usuario.fecha_registro = datosActualizar.fecha_registro;
            
            localStorage.setItem('usuario', JSON.stringify(usuario));
            
            alert('Perfil actualizado correctamente');
             
          },
          error: (error) => {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar el perfil. Por favor, intenta nuevamente.');
          }
        });

      } catch (error) {
        console.error('Error al procesar datos:', error);
        alert('Error al procesar los datos');
      }
    } else {
      alert('No se encontró información del usuario');
    }
  }
}

  salir() {
    this.cerrarSesion.emit();
  }
}