package com.proyectoXFC.backend.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; 

@Entity
public class Administrador {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id_administrador;
 
private Long id_usuario;



public Long getId_usuario() {
    return id_usuario;
}

public void setId_usuario(Long id_usuario) {
    this.id_usuario = id_usuario;
}

public Administrador(){}

public Long getId_administrador() {
    return id_administrador;
}
public void setId_administrador(Long id_administrador) {
    this.id_administrador = id_administrador;
}
 



}
