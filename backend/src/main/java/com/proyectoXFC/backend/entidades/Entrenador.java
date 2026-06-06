package com.proyectoXFC.backend.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;

@Entity
@Table(name = "entrenador")
public class Entrenador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_entrenador;

     private Long id_usuario;
     private String especialidad;

    public Entrenador(){}

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
         this.id_usuario = id_usuario;
     }
 
    public Long getId_entrenador() {
        return id_entrenador;
    }
    public void setId_entrenador(Long id_entrenador) {
        this.id_entrenador = id_entrenador;
    }
    
    public String getEspecialidad() {
        return especialidad;
    }
    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }
    
    
}
