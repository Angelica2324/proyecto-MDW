import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
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

  socios: any[] = [];
  usuarios: any[] = [];
  mostrarEditar = false;
  mostrarAgregar = false;
  entrenadorSeleccionado = null;
  mostrarEditarSocio = false;
  socioSeleccionado = null;
  mostrarAgregarEntrenador = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

      ngOnInit(): void {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        this.administrador.nombre = usuario.primer_nombre_usuario + " " + usuario.segundo_nombre_usuario;
        this.administrador.apellido = usuario.apellidos_usuario;
        this.administrador.telefono = usuario.telefono;
        this.administrador.correo = usuario.email ;
        this.administrador.estado = usuario.estado ? 'Activo' : 'Inactivo';
        this.administrador.fechaIngreso = usuario.fecha_registro;
        }
      this.cargarDatosDelasApis();
      }

     

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

  // socios = [
  //   { id: '01', nombre: 'Juan Pérez', estado: 'Activo', membresia: 'Mensual' },
  //   { id: '02', nombre: 'Ana López', estado: 'Inactivo', membresia: 'Trimestral' },
  //   { id: '03', nombre: 'Carlos Martín', estado: 'Activo', membresia: 'Anual' },
  //   { id: '04', nombre: 'María García', estado: 'Activo', membresia: 'Mensual' },
  //   { id: '05', nombre: 'Pedro Sánchez', estado: 'Inactivo', membresia: 'Semestral' },
  //   { id: '06', nombre: 'Lucía Torres', estado: 'Activo', membresia: 'Mensual' },
  //   { id: '07', nombre: 'Diego Ramos', estado: 'Activo', membresia: 'Trimestral' },
  //   { id: '08', nombre: 'Sofía Herrera', estado: 'Inactivo', membresia: 'Anual' }
  // ];

  entrenadores = [
    { id: '01', nombre: 'Carlos Ramos', estado: 'Activo', especialidad: 'Entrenamiento funcional' },
    { id: '02', nombre: 'Miguel Torres', estado: 'Activo', especialidad: 'Musculación' },
    { id: '03', nombre: 'Laura Méndez', estado: 'Activo', especialidad: 'Zumba' },
    { id: '04', nombre: 'Diego Herrera', estado: 'Inactivo', especialidad: 'Cross Training' },
    { id: '05', nombre: 'Andrea López', estado: 'Activo', especialidad: 'Cardio y resistencia' },
    { id: '06', nombre: 'Pedro Castillo', estado: 'Inactivo', especialidad: 'HIIT' }
  ];

  paginaSocios = 1;
  paginaEntrenadores = 1;
  elementosPorPagina = 5;

  cargarDatosDelasApis(){
      this.cargarSocios();
      this.cargarEntrenadores();
      // this.cargarUsuarios();
      // this.cargarRoles();
      
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
        
        console.log('Socios cargados:', this.socios); // Verifica en consola
      });
    });
  });
}

recargarDatos() {
  this.cargarSocios();
  this.cargarEntrenadores();
  this.cdr.detectChanges();

}


cargarEntrenadores(){
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
   this.mostrarAgregar = true ;
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
    alert('Eliminar socio: ' + socio.nombre);
  }

  agregarEntrenador() {
   this.mostrarAgregarEntrenador= true;
  }

  editarEntrenador(entrenador: any) {
    console.log('Entrenador seleccionado:', entrenador);
    this.entrenadorSeleccionado =entrenador;
    this.mostrarEditar = true;
  }

  cerrarEditar(){
    this.mostrarEditar = false;
    this.recargarDatos(); 
  }

   eliminarEntrenador(entrenador: any) {
  if (confirm(`¿Estás seguro de eliminar a ${entrenador.nombre}?`)) {
    // Primero eliminar el entrenador
    this.apiService.eliminarEntrenador(entrenador.id).subscribe({
      next: () => {
        // Luego eliminar el usuario
        this.apiService.eliminarUsuario(entrenador.id_usuario).subscribe({
          next: () => {
            alert('Entrenador y usuario eliminados exitosamente');
            this.cargarEntrenadores();
          },
          error: (err: any) => console.error('Error al eliminar usuario:', err)
        });
      },
      error: (err: any) => console.error('Error al eliminar entrenador:', err)
    });
  }
}

  salir() {
    this.cerrarSesion.emit();
  }
}