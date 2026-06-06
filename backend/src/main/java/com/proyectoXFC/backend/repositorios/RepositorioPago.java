package com.proyectoXFC.backend.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoXFC.backend.entidades.Pago;

public interface RepositorioPago extends JpaRepository<Pago, Long> {
  
}
