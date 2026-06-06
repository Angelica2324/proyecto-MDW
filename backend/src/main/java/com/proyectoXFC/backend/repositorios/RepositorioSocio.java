package com.proyectoXFC.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoXFC.backend.entidades.Socio;

public interface RepositorioSocio extends JpaRepository<Socio, Long> {
    
}
