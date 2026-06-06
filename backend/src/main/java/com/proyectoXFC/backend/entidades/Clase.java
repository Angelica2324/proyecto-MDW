package com.proyectoXFC.backend.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Clase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_clase;
    private Long id_entrenador;
    private String nombre_clase;
    private String descripcion;
    private String dias_de_la_semana;
    private String hora_incio;
    private String hora_fin;

    public Clase(){}

    public Long getId_clase() {
        return id_clase;
    }

    public void setId_clase(Long id_clase) {
        this.id_clase = id_clase;
    }

    public Long getId_entrenador() {
        return id_entrenador;
    }

    public void setId_entrenador(Long id_entrenador) {
        this.id_entrenador = id_entrenador;
    }

    public String getNombre_clase() {
        return nombre_clase;
    }

    public void setNombre_clase(String nombre_clase) {
        this.nombre_clase = nombre_clase;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDias_de_la_semana() {
        return dias_de_la_semana;
    }

    public void setDias_de_la_semana(String dias_de_la_semana) {
        this.dias_de_la_semana = dias_de_la_semana;
    }

    public String getHora_incio() {
        return hora_incio;
    }

    public void setHora_incio(String hora_incio) {
        this.hora_incio = hora_incio;
    }

    public String getHora_fin() {
        return hora_fin;
    }

    public void setHora_fin(String hora_fin) {
        this.hora_fin = hora_fin;
    }
}