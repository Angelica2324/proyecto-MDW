package com.proyectoXFC.backend.entidades;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ejercicio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_ejercicio;
    private Long id_rutina;
    private String nombre_ejercicio;
    private int series;
    private int repeticiones;
    private double peso_recomendado;
    private int descanso;

    public Ejercicio(){

    }

    public Long getId_ejercicio() {
        return id_ejercicio;
    }

    public void setId_ejercicio(Long id_ejercicio) {
        this.id_ejercicio = id_ejercicio;
    }

    public Long getId_rutina() {
        return id_rutina;
    }

    public void setId_rutina(Long id_rutina) {
        this.id_rutina = id_rutina;
    }

    public String getNombre_ejercicio() {
        return nombre_ejercicio;
    }

    public void setNombre_ejercicio(String nombre_ejercicio) {
        this.nombre_ejercicio = nombre_ejercicio;
    }

    public int getSeries() {
        return series;
    }

    public void setSeries(int series) {
        this.series = series;
    }

    public int getRepeticiones() {
        return repeticiones;
    }

    public void setRepeticiones(int repeticiones) {
        this.repeticiones = repeticiones;
    }

    public double getPeso_recomendado() {
        return peso_recomendado;
    }

    public void setPeso_recomendado(double peso_recomendado) {
        this.peso_recomendado = peso_recomendado;
    }

    public int getDescanso() {
        return descanso;
    }

    public void setDescanso(int descanso) {
        this.descanso = descanso;
    }

    
}
