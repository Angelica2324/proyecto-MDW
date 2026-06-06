package com.proyectoXFC.backend.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Socio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id_socio;
    
    private Long id_usuario;
    
    public Socio(){}
    
    public Long getId_socio() {
        return id_socio;
    }
    public void setId_socio(Long id_socio) {
        this.id_socio = id_socio;
    }
    public Long getId_usuario() {
        return id_usuario;
    }
    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }
}