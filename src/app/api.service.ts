import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Usuario
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }

  // Clase
  getClases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clase`);
  }

  crearClase(clase: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clase`, clase);
  }
}