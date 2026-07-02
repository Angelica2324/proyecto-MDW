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
    private String subtitulo;
    private String descripcion;
    private String intensidad;
    private String dias_de_la_semana;
    private String hora_1;
    private String hora_2;
    private String Duración;
    private String imagen;
    
    public Clase(){}

    

    public String getSubtitulo() {
        return subtitulo;
    }



    public void setSubtitulo(String subtitulo) {
        this.subtitulo = subtitulo;
    }



    public String getIntensidad() {
        return intensidad;
    }



    public void setIntensidad(String intensidad) {
        this.intensidad = intensidad;
    }



    public String getDuración() {
        return Duración;
    }



    public void setDuración(String duración) {
        Duración = duración;
    }



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

    public String getHora_1() {
        return hora_1;
    }

    public void setHora_1(String hora_inicio) {
        this.hora_1 = hora_inicio;
    }

    public String getHora_2() {
        return hora_2;
    }

    public void setHora_2(String hora_fin) {
        this.hora_2 = hora_fin;
    }



    public String getImagen() {
        return imagen;
    }



    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}