package com.proyectoXFC.backend.controladores;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoXFC.backend.entidades.Usuario;
import com.proyectoXFC.backend.repositorios.RepositorioUsuario;
import com.proyectoXFC.backend.servicios.ServicioCorreo;

@RestController
@RequestMapping("/usuario")
public class controladorUsuario {
    
    @Autowired
    private RepositorioUsuario repositorio;

    @Autowired
    private ServicioCorreo servicioCorreo;

    @GetMapping
    public List<Usuario> obtenerTodos() {
        return repositorio.findAll();
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
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

    @PostMapping("/recuperar-password")
    public Map<String, Object> recuperarPassword(@RequestBody Map<String, String> datos) {
        String email = datos.get("email");

        Map<String, Object> respuesta = new HashMap<>();

        if (email == null || email.trim().isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El correo es obligatorio.");
            return respuesta;
        }

        Optional<Usuario> usuarioEncontrado = repositorio.findByEmail(email);

        if (usuarioEncontrado.isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El correo no está registrado.");
            return respuesta;
        }

        Usuario usuario = usuarioEncontrado.get();

        String codigo = generarCodigo();
        Long expiracion = System.currentTimeMillis() + (15 * 60 * 1000);

        usuario.setCodigo_recuperacion(codigo);
        usuario.setExpiracion_codigo(expiracion);

        repositorio.save(usuario);

        try {
            servicioCorreo.enviarCodigoRecuperacion(email, codigo);

            respuesta.put("ok", true);
            respuesta.put("mensaje", "Código enviado correctamente al correo.");
            return respuesta;

        } catch (Exception e) {
            System.out.println("Error al enviar correo: " + e.getMessage());

            respuesta.put("ok", false);
            respuesta.put("mensaje", "No se pudo enviar el correo. Revisa la configuración de Gmail.");
            return respuesta;
        }
    }

    @PostMapping("/cambiar-password")
    public Map<String, Object> cambiarPassword(@RequestBody Map<String, String> datos) {
        String email = datos.get("email");
        String codigo = datos.get("codigo");
        String nuevaContrasena = datos.get("nuevaContrasena");
        String confirmarContrasena = datos.get("confirmarContrasena");

        Map<String, Object> respuesta = new HashMap<>();

        if (email == null || email.trim().isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El correo es obligatorio.");
            return respuesta;
        }

        if (codigo == null || codigo.trim().isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El código es obligatorio.");
            return respuesta;
        }

        if (nuevaContrasena == null || nuevaContrasena.trim().isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "La nueva contraseña es obligatoria.");
            return respuesta;
        }

        if (confirmarContrasena == null || confirmarContrasena.trim().isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "Debes confirmar la contraseña.");
            return respuesta;
        }

        if (!nuevaContrasena.equals(confirmarContrasena)) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "Las contraseñas no coinciden.");
            return respuesta;
        }

        Optional<Usuario> usuarioEncontrado = repositorio.findByEmail(email);

        if (usuarioEncontrado.isEmpty()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El correo no está registrado.");
            return respuesta;
        }

        Usuario usuario = usuarioEncontrado.get();

        if (usuario.getCodigo_recuperacion() == null) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "Primero debes solicitar un código de recuperación.");
            return respuesta;
        }

        if (!usuario.getCodigo_recuperacion().equals(codigo)) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El código es incorrecto.");
            return respuesta;
        }

        if (usuario.getExpiracion_codigo() == null || System.currentTimeMillis() > usuario.getExpiracion_codigo()) {
            respuesta.put("ok", false);
            respuesta.put("mensaje", "El código ha expirado. Solicita uno nuevo.");
            return respuesta;
        }

        usuario.setContraseña(nuevaContrasena);
        usuario.setCodigo_recuperacion(null);
        usuario.setExpiracion_codigo(null);

        repositorio.save(usuario);

        respuesta.put("ok", true);
        respuesta.put("mensaje", "Contraseña actualizada correctamente.");
        return respuesta;
    }

    private String generarCodigo() {
        Random random = new Random();
        int numero = 100000 + random.nextInt(900000);
        return String.valueOf(numero);
    }

}