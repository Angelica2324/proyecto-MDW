package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.proyectoXFC.backend.entidades.Membresia;
import com.proyectoXFC.backend.repositorios.RepositorioMembresia;


@RestController
@RequestMapping("/usuario/{id_usuario}/socio/{id_socio}/membresia")
public class controladorMembresiaXUsuario {
    
    @Autowired
    private RepositorioMembresia repositorioMembresia;

    @GetMapping("/{id_membresia}")
    public String obtenerMembresia(@PathVariable Long id_usuario, 
                                   @PathVariable Long id_socio, 
                                   @PathVariable Long id_membresia) {
        return "Usuario: " + id_usuario + ", Socio: " + id_socio + ", Membresia: " + id_membresia;
    }

    @GetMapping
    public List<Membresia> obtenerMembresiasPorSocio(@PathVariable Long id_socio) {
        return repositorioMembresia.findByIdSocio(id_socio);
    }

    @PostMapping
    public Membresia crearMembresia(@RequestBody Membresia membresia) {
        return repositorioMembresia.save(membresia);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        repositorioMembresia.deleteById(id);
    }
}