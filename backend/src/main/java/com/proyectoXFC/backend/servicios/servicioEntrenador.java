package com.proyectoXFC.backend.servicios;

import com.proyectoXFC.backend.dto.EntrenadorRegistroDTO;
import com.proyectoXFC.backend.entidades.Entrenador;
import com.proyectoXFC.backend.entidades.Usuario;
import com.proyectoXFC.backend.repositorios.RepositorioEntrenador;
import com.proyectoXFC.backend.repositorios.RepositorioUsuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class servicioEntrenador {
    
    @Autowired
    private RepositorioUsuario repositorioUsuario;
    
    @Autowired
    private RepositorioEntrenador repositorioEntrenador;
    
    @Transactional
    public Map<String, Object> registrarEntrenadorCompleto(EntrenadorRegistroDTO dto) {
        
        Usuario usuario = new Usuario();
        usuario.setPrimer_nombre_usuario(dto.getPrimer_nombre_usuario());
        usuario.setSegundo_nombre_usuario(dto.getSegundo_nombre_usuario());
        usuario.setApellidos_usuario(dto.getApellidos_usuario());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefono(dto.getTelefono());
        usuario.setDocumento_identidad(dto.getDocumento_identidad());
        usuario.setTipo_documento(dto.getTipo_documento());
        usuario.setContraseña(dto.getContraseña());
        usuario.setFecha_nacimiento(dto.getFecha_nacimiento());
        usuario.setFecha_registro(LocalDate.now().toString());
        usuario.setId_rol(2L);
        usuario.setEstado(true); 
        
        Usuario usuarioGuardado = repositorioUsuario.save(usuario);
        
        Entrenador entrenador = new Entrenador();
        entrenador.setId_usuario(usuarioGuardado.getId_usuario());
        entrenador.setEspecialidad(dto.getEspecialidad());
        
        Entrenador entrenadorGuardado = repositorioEntrenador.save(entrenador);
        
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Entrenador registrado exitosamente");
        respuesta.put("id_usuario", usuarioGuardado.getId_usuario());
        respuesta.put("id_entrenador", entrenadorGuardado.getId_entrenador());
        respuesta.put("nombre", usuarioGuardado.getPrimer_nombre_usuario() + " " + usuarioGuardado.getApellidos_usuario());
        respuesta.put("email", usuarioGuardado.getEmail());
        respuesta.put("especialidad", entrenadorGuardado.getEspecialidad());
        
        return respuesta;
    }
}