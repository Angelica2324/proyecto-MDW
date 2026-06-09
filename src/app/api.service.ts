import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

//rol
getRoles(): Observable<any>{
  return this.http.get(`${this.apiUrl}/rol`);
}

crearRoles(rol:any): Observable<any>{
return this.http.post(`${this.apiUrl}/rol`, rol);
}

eliminarRol(id:number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/rol/{id}`);
}

 // Usuario  
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

// socio
getSocios():  Observable<any> {
  return this.http.get(`${this.apiUrl}/socio`);
}

crearSocio(socio: any): Observable<any>{
  return this.http.post(`${this.apiUrl}/socio`, socio);
}

eliminarSocio(id: number): Observable<any>{
  return this.http.delete(`${this.apiUrl}/socio/${id}`);
}

// entrenador
getEntrenadores(): Observable<any>{
  return this.http.get(`${this.apiUrl}/entrenador`);
}

actualizarEntrenador(id: number, entrenador: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/entrenador/${id}`, entrenador);
}


  // Membresia
getMembresias(): Observable<any> {
  return this.http.get(`${this.apiUrl}/membresia`);
}
crearMembresia(membresia: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/membresia`, membresia);
}

  // Clase
  getClases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clase`);
  }

  crearClase(clase: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clase`, clase);
  }
}