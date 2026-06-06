package com.proyectoXFC.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoXFC.backend.entidades.Usuario;

public interface RepositorioUsuario extends JpaRepository<Usuario, Long>{

    
}
