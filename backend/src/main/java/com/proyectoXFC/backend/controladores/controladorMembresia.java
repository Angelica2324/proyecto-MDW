package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoXFC.backend.entidades.Membresia;
import com.proyectoXFC.backend.repositorios.RepositorioMembresia;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/membresia")
public class controladorMembresia {
    
    @Autowired
    private RepositorioMembresia repositorioMembresia;

    @GetMapping
    public List<Membresia> obtenerMembresias(){
        return repositorioMembresia.findAll();
    }

    @PostMapping
    public Membresia crearMembresia(@RequestBody Membresia membresia){
        return repositorioMembresia.save(membresia);
    }

      @PutMapping("/{id}")
    public Membresia actualizarMembresia(@PathVariable Long id, @RequestBody Membresia membresia){
        membresia.setId_membresia(id);
        return repositorioMembresia.save(membresia);
    }

    @DeleteMapping("/{id}")
    public void eliminarMembresia(@PathVariable Long id){
        repositorioMembresia.deleteById(id);
    }
    
    
}
