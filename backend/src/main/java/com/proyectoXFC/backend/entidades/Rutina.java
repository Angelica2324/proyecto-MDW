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
private String descripcion;
private String objetivo;
private boolean estado_rutina;

public Rutina(){}

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
