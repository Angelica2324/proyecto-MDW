package com.proyectoXFC.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoXFC.backend.entidades.Rutina;

public interface RepositorioRutina extends JpaRepository<Rutina, Long> {
    
}
