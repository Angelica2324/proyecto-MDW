package com.proyectoXFC.backend.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.proyectoXFC.backend.entidades.Usuario;
import com.proyectoXFC.backend.repositorios.RepositorioUsuario;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/usuario")
public class controladorUsuario {
    
    @Autowired
    private RepositorioUsuario repositorio;

    @GetMapping
    public List<Usuario> obtenerTodos(){
        return repositorio.findAll();
        }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario){
        return repositorio.save(usuario);
    }    

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId_usuario(id);
        return repositorio.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repositorio.deleteById(id);
    }

}
