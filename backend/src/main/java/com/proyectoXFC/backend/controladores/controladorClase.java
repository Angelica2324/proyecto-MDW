package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.proyectoXFC.backend.entidades.Clase;
import com.proyectoXFC.backend.repositorios.RepositorioClase;

@RestController
@RequestMapping("/clase")
public class controladorClase {
    
    @Autowired
    private RepositorioClase repositorioClase;

    @GetMapping
    public List<Clase> ObtenerClases(){
        return repositorioClase.findAll();
    }

    @PostMapping
    public Clase crearClase(@RequestBody Clase clase){
        return repositorioClase.save(clase);
    }

    @DeleteMapping("/{id}")
    public void eliminarClase(@PathVariable Long id){
        repositorioClase.deleteById(id);
    }
}
