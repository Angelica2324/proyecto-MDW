package com.proyectoXFC.backend.controladores;

import java.util.List;
import java.util.Map; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyectoXFC.backend.dto.EntrenadorRegistroDTO;
import com.proyectoXFC.backend.entidades.Entrenador;
import com.proyectoXFC.backend.repositorios.RepositorioEntrenador;
import com.proyectoXFC.backend.servicios.servicioEntrenador;

@RestController
@RequestMapping("/entrenador")
public class controladorEntrenador {
    
    @Autowired
    private RepositorioEntrenador repositorio;

    @Autowired
    private servicioEntrenador servicioEntrenador; 

    @GetMapping
    public List<Entrenador> obtenertodos(){
        return repositorio.findAll();
    }

     @PostMapping("/registro-completo")
    public ResponseEntity<?> registrarEntrenadorCompleto(@RequestBody EntrenadorRegistroDTO dto) {
        try {
            Map<String, Object> respuesta = servicioEntrenador.registrarEntrenadorCompleto(dto);
            return new ResponseEntity<>(respuesta, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
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
