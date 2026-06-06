package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.proyectoXFC.backend.entidades.Socio;
import com.proyectoXFC.backend.repositorios.RepositorioSocio;

@RestController
@RequestMapping("/socio")
public class controladorSocio {
    
@Autowired
private RepositorioSocio repositorio;

@GetMapping
public List<Socio> obtenersocios(){
    return repositorio.findAll();
}

@PostMapping
public Socio crearSocio(@RequestBody Socio socio){
    return repositorio.save(socio);
}
 
@DeleteMapping("/{id}")
public void eliminarSocio(@PathVariable Long id){
    repositorio.deleteById(id);
}
}
