package com.proyectoXFC.backend.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Rutina {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id_rutina;
private Long id_entrenador;
private Long id_socio;
private String nombre_rutina;
private String subtitulo;
private String programa;
private String descripcion;
private String ejercicio1;
private String ejercicio2;
private String ejercicio3;
private String ejercicio4;
private String ejercicio5;
private String frecuencia;
private String duracion;
private String objetivo;
private boolean estado_rutina;

public Rutina(){}



public String getSubtitulo() {
    return subtitulo;
}



public void setSubtitulo(String subtitulo) {
    this.subtitulo = subtitulo;
}



public String getPrograma() {
    return programa;
}



public void setPrograma(String programa) {
    this.programa = programa;
}



public String getEjercicio1() {
    return ejercicio1;
}



public void setEjercicio1(String ejercicio1) {
    this.ejercicio1 = ejercicio1;
}



public String getEjercicio2() {
    return ejercicio2;
}



public void setEjercicio2(String ejercicio2) {
    this.ejercicio2 = ejercicio2;
}



public String getEjercicio3() {
    return ejercicio3;
}



public void setEjercicio3(String ejercicio3) {
    this.ejercicio3 = ejercicio3;
}



public String getEjercicio4() {
    return ejercicio4;
}



public void setEjercicio4(String ejercicio4) {
    this.ejercicio4 = ejercicio4;
}



public String getEjercicio5() {
    return ejercicio5;
}



public void setEjercicio5(String ejercicio5) {
    this.ejercicio5 = ejercicio5;
}



public String getFrecuencia() {
    return frecuencia;
}



public void setFrecuencia(String frecuencia) {
    this.frecuencia = frecuencia;
}



public String getDuracion() {
    return duracion;
}



public void setDuracion(String duracion) {
    this.duracion = duracion;
}



public Long getId_rutina() {
    return id_rutina;
}

public void setId_rutina(Long id_rutina) {
    this.id_rutina = id_rutina;
}

public Long getId_entrenador() {
    return id_entrenador;
}

public void setId_entrenador(Long id_entrenador) {
    this.id_entrenador = id_entrenador;
}

public Long getId_socio() {
    return id_socio;
}

public void setId_socio(Long id_socio) {
    this.id_socio = id_socio;
}

public String getNombre_rutina() {
    return nombre_rutina;
}

public void setNombre_rutina(String nombre_rutina) {
    this.nombre_rutina = nombre_rutina;
}

public String getDescripcion() {
    return descripcion;
}

public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
}

public String getObjetivo() {
    return objetivo;
}

public void setObjetivo(String objetivo) {
    this.objetivo = objetivo;
}

public boolean isEstado_rutina() {
    return estado_rutina;
}

public void setEstado_rutina(boolean estado_rutina) {
    this.estado_rutina = estado_rutina;
}


}
