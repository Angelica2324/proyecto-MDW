package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyectoXFC.backend.entidades.Entrenador;
import com.proyectoXFC.backend.repositorios.RepositorioEntrenador;

@RestController
@RequestMapping("/entrenador")
public class controladorEntrenador {
    
    @Autowired
    private RepositorioEntrenador repositorio;

    @GetMapping
    public List<Entrenador> obtenertodos(){
        return repositorio.findAll();
    }

    @PostMapping
    public Entrenador crearEntrenador(@RequestBody Entrenador entrenador){
        return repositorio.save(entrenador);
    }
 

      @PutMapping("/{id}")
    public Entrenador actualizarEntrenador(@PathVariable Long id, @RequestBody Entrenador entrenador) {
        entrenador.setId_usuario(id);
        return repositorio.save(entrenador);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        repositorio.deleteById(id);
    }
}
