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

import com.proyectoXFC.backend.entidades.Pago;
import com.proyectoXFC.backend.repositorios.RepositorioPago;

@RestController
@RequestMapping("/pago")
public class controladorPago {
    
    @Autowired
    private RepositorioPago repositorioPago;

    @GetMapping
    public List<Pago> obtenerPagos(){
        return repositorioPago.findAll();
    }

    @PostMapping
    public Pago crearPago(@RequestBody Pago pago){
        return repositorioPago.save(pago);
    }

    @DeleteMapping("/{id}")
    public void eliminarPago(@PathVariable Long id){
        repositorioPago.deleteById(id);
    }

}
