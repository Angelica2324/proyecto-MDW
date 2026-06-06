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

import com.proyectoXFC.backend.entidades.Rutina;
import com.proyectoXFC.backend.repositorios.RepositorioRutina;

@RestController
@RequestMapping("/rutina")
public class controladorRutina {
    
    @Autowired
    private RepositorioRutina repositorioRutina;

    @GetMapping
    public List<Rutina> obtenerRutina(){
        return repositorioRutina.findAll();
    } 

    @PostMapping
    public Rutina creRutina(@RequestBody Rutina rutina){
        return repositorioRutina.save(rutina);
    }

    @DeleteMapping("/{id}")
    public void eliminarRutina(@PathVariable Long id){
        repositorioRutina.deleteById(id);
    }
}
