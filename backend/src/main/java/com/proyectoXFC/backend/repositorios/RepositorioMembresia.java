package com.proyectoXFC.backend.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.proyectoXFC.backend.entidades.Membresia;

public interface RepositorioMembresia extends JpaRepository<Membresia, Long> {
    
    @Query("SELECT m FROM Membresia m WHERE m.id_socio = :id_socio")
    List<Membresia> findByIdSocio(@Param("id_socio") Long id_socio);
}