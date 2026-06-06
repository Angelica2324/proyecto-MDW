package com.proyectoXFC.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoXFC.backend.entidades.Entrenador;

public interface RepositorioEntrenador extends JpaRepository<Entrenador, Long> {
    
}
