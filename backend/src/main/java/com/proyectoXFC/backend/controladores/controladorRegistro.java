package com.proyectoXFC.backend.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoXFC.backend.entidades.Usuario;
import com.proyectoXFC.backend.entidades.Socio;
import com.proyectoXFC.backend.entidades.Membresia;
import com.proyectoXFC.backend.repositorios.RepositorioUsuario;
import com.proyectoXFC.backend.repositorios.RepositorioSocio;
import com.proyectoXFC.backend.repositorios.RepositorioMembresia;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/registro")
public class controladorRegistro {

    @Autowired
    private RepositorioUsuario repositorioUsuario;

    @Autowired
    private RepositorioSocio repositorioSocio;

    @Autowired
    private RepositorioMembresia repositorioMembresia;

    @PostMapping("/completo")
    @Transactional
    public ResponseEntity<?> registroCompleto(@RequestBody Map<String, Object> datosRegistro) {
        try {
            System.out.println("📝 Datos recibidos: " + datosRegistro);
            
            // Obtener datos del JSON
            Map<String, Object> usuarioData = (Map<String, Object>) datosRegistro.get("usuario");
            String membresiaTipo = (String) datosRegistro.get("membresia");
            Double monto = Double.parseDouble(datosRegistro.get("monto").toString());

            // 1. Crear usuario
            Usuario usuario = new Usuario();
            usuario.setPrimer_nombre_usuario((String) usuarioData.get("primer_nombre_usuario"));
            usuario.setSegundo_nombre_usuario((String) usuarioData.get("segundo_nombre_usuario"));
            usuario.setApellidos_usuario((String) usuarioData.get("apellidos_usuario"));
            usuario.setEmail((String) usuarioData.get("email"));
            usuario.setTelefono((String) usuarioData.get("telefono"));
            usuario.setDocumento_identidad((String) usuarioData.get("documento_identidad"));
            usuario.setTipo_documento((String) usuarioData.get("tipo_documento"));
            usuario.setContraseña((String) usuarioData.get("contraseña"));
            
            // ✅ Convertir fechas a String (formato yyyy-MM-dd)
            String fechaNacimientoStr = (String) usuarioData.get("fecha_nacimiento");
            usuario.setFecha_nacimiento(fechaNacimientoStr); // Ya viene como String del frontend
            
            // ✅ Fecha registro como String (formato yyyy-MM-dd)
            LocalDate hoy = LocalDate.now();
            String fechaRegistroStr = hoy.format(DateTimeFormatter.ISO_LOCAL_DATE);
            usuario.setFecha_registro(fechaRegistroStr); // Asignar String
            
            usuario.setId_rol(3L); // Rol de socio
            usuario.setEstado(true);

            Usuario usuarioGuardado = repositorioUsuario.save(usuario);
            System.out.println("✅ Usuario creado con ID: " + usuarioGuardado.getId_usuario());

            // 2. Crear socio
            Socio socio = new Socio();
            socio.setId_usuario(usuarioGuardado.getId_usuario());
            Socio socioGuardado = repositorioSocio.save(socio);
            System.out.println("✅ Socio creado con ID: " + socioGuardado.getId_socio());

            // 3. Calcular fecha de vencimiento según membresía
            LocalDate fechaVencimiento = LocalDate.now();
            if (membresiaTipo.equals("Mensual")) {
                fechaVencimiento = fechaVencimiento.plusMonths(1);
            } else if (membresiaTipo.equals("Trimestral")) {
                fechaVencimiento = fechaVencimiento.plusMonths(3);
            } else if (membresiaTipo.equals("Anual")) {
                fechaVencimiento = fechaVencimiento.plusMonths(12);
            }

            // 4. Crear membresía
            Membresia membresia = new Membresia();
            membresia.setTipo_membresia(membresiaTipo);
            membresia.setEstado_membresia(true);
            
            // ✅ Convertir fechas a String para membresía
            String fechaInicioStr = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
            String fechaVencimientoStr = fechaVencimiento.format(DateTimeFormatter.ISO_LOCAL_DATE);
            
            membresia.setFecha_inicio(fechaInicioStr);
            membresia.setFecha_vencimiento(fechaVencimientoStr);
            membresia.setId_entrenador(1L); // Entrenador por defecto
            membresia.setId_socio(socioGuardado.getId_socio());
            membresia.setMonto_total(monto);

            repositorioMembresia.save(membresia);
            System.out.println("✅ Membresía creada para socio ID: " + socioGuardado.getId_socio());

            // Respuesta exitosa
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("success", true);
            respuesta.put("message", "Registro completado exitosamente");
            respuesta.put("id_usuario", usuarioGuardado.getId_usuario());
            respuesta.put("id_socio", socioGuardado.getId_socio());
            respuesta.put("membresia", membresiaTipo);
            respuesta.put("fecha_vencimiento", fechaVencimientoStr);

            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorRespuesta = new HashMap<>();
            errorRespuesta.put("success", false);
            errorRespuesta.put("error", "Error al completar el registro: " + e.getMessage());
            return ResponseEntity.status(500).body(errorRespuesta);
        }
    }
}