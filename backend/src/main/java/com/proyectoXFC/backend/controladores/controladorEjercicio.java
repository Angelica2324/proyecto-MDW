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

import com.proyectoXFC.backend.entidades.Ejercicio;
import com.proyectoXFC.backend.repositorios.RepositorioEjercicio;


@RestController
@RequestMapping("/ejercicio")
public class controladorEjercicio {

    @Autowired
    private RepositorioEjercicio repositorioEjercicio;

    @GetMapping
    private List<Ejercicio> obtenerEjercicios(){
        return repositorioEjercicio.findAll();
    }

    @PostMapping
    public Ejercicio crearEjercicio(@RequestBody Ejercicio ejercicio){
        return repositorioEjercicio.save(ejercicio);
    }

    @DeleteMapping("/{id}")
    public void eliminarEjercicio(@PathVariable Long id){
        repositorioEjercicio.deleteById(id);
    }    
}
