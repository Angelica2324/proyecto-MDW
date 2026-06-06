package com.proyectoXFC.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoXFC.backend.entidades.Administrador;

public interface RepositorioAdministrador extends JpaRepository<Administrador, Long>{
    
}
