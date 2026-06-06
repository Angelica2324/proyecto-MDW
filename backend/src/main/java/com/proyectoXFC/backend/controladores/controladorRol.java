package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyectoXFC.backend.entidades.Rol;
import com.proyectoXFC.backend.repositorios.RepositorioRol;

@RestController
@RequestMapping("/rol")
public class controladorRol {

    @Autowired
    private RepositorioRol repositorio;

    @GetMapping
    public List<Rol> obtenerRols(){
     return repositorio.findAll();
    }

    @PostMapping
    public Rol crearRol(@RequestBody Rol rol){
        return repositorio.save(rol);
    }

    @PutMapping("/{id}")
    public Rol actualizarRol(@PathVariable Long id, @RequestBody Rol rol){
        rol.setId_rol(id);
        return repositorio.save(rol);
    }

    @DeleteMapping("/{id}")
    public void eliminarRol(@PathVariable Long id){
        repositorio.deleteById(id);
    }


    
}
