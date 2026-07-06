import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /* ================= ROL ================= */

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rol`);
  }

  crearRoles(rol: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rol`, rol);
  }

  eliminarRol(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rol/${id}`);
  }

  /* ================= USUARIO ================= */

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }

  /* ================= SOCIO ================= */

  getSocios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/socio`);
  }

  crearSocio(socio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/socio`, socio);
  }

  eliminarSocio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/socio/${id}`);
  }

  /* ================= ENTRENADOR ================= */

  getEntrenadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/entrenador`);
  }

  actualizarEntrenador(id: number, entrenador: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/entrenador/${id}`, entrenador);
  }

  eliminarEntrenador(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/entrenador/${id}`);
  }

  registrarEntrenadorCompleto(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entrenador/registro-completo`, datos);
  }

  /* ================= MEMBRESÍA ================= */

  getMembresias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/membresia`);
  }

  crearMembresia(membresia: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/membresia`, membresia);
  }

  actualizarMembresia(id: number, membresia: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/membresia/${id}`, membresia);
  }

  eliminarMembresia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/membresia/${id}`);
  }

  /* ================= CLASE ================= */

  getClases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clase`);
  }

  crearClase(clase: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clase`, clase);
  }

  actualizarClase(id: number, clase: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clase/${id}`, clase);
  }

  eliminarClase(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clase/${id}`);
  }

  /* ================= RUTINA ================= */

  getRutinas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutina`);
  }

  /* ================= EJERCICIO ================= */

  getEjercicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ejercicio`);
  }

    /* ================= VERIFICAR SI EMAIL Y/O DNI YA EXISTEN  ================= */

   // Verificar si el email ya existe
  verificarEmail(email: string): Observable<boolean> {
    return this.getUsuarios().pipe(
      map((usuarios: any[]) => {
        return usuarios.some((usuario: any) => 
          usuario.email.toLowerCase() === email.toLowerCase()
        );
      })
    );
  }

  // Verificar si el DNI ya existe
  verificarDNI(dni: string): Observable<boolean> {
    return this.getUsuarios().pipe(
      map((usuarios: any[]) => {
        return usuarios.some((usuario: any) => 
          usuario.documento_identidad === dni
        );
      })
    );
  }

  // Registrar nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }
}

