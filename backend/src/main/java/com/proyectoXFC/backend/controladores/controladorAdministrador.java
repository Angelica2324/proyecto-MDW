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
import com.proyectoXFC.backend.entidades.Administrador;
import com.proyectoXFC.backend.repositorios.RepositorioAdministrador;

@RestController
@RequestMapping("/administrador")
public class controladorAdministrador {
    
    @Autowired
    private RepositorioAdministrador repositorioAdministrador;

    @GetMapping
    public List<Administrador> obtenertodos(){
        return repositorioAdministrador.findAll();
    }

    @PostMapping
    public Administrador crearAdministrador(@RequestBody Administrador administrador){
        return repositorioAdministrador.save(administrador);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        repositorioAdministrador.deleteById(id);
    }

}
