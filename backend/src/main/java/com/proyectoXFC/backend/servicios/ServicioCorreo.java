package com.proyectoXFC.backend.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ServicioCorreo {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCodigoRecuperacion(String destino, String codigo) {
        SimpleMailMessage mensaje = new SimpleMailMessage();

        mensaje.setTo(destino);
        mensaje.setSubject("Recuperación de contraseña - Xtreme Fitness Center");

        mensaje.setText(
            "Hola,\n\n" +
            "Has solicitado recuperar tu contraseña en Xtreme Fitness Center.\n\n" +
            "Tu código de recuperación es: " + codigo + "\n\n" +
            "Este código vence en 15 minutos.\n\n" +
            "Si no solicitaste este cambio, ignora este mensaje.\n\n" +
            "Atentamente,\n" +
            "Xtreme Fitness Center"
        );

        mailSender.send(mensaje);
    }

    public void enviarAlertaLoginFallido(String destino) {
        SimpleMailMessage mensaje = new SimpleMailMessage();

        mensaje.setTo(destino);
        mensaje.setSubject("Alerta de intento de inicio de sesión - Xtreme Fitness Center");

        mensaje.setText(
            "Hola,\n\n" +
            "Detectamos un intento de inicio de sesión fallido en tu cuenta de Xtreme Fitness Center.\n\n" +
            "Alguien intentó ingresar usando tu correo, pero la contraseña fue incorrecta.\n\n" +
            "Si fuiste tú, puedes ignorar este mensaje.\n\n" +
            "Si no fuiste tú, te recomendamos cambiar tu contraseña lo antes posible.\n\n" +
            "Atentamente,\n" +
            "Xtreme Fitness Center"
        );

        mailSender.send(mensaje);
    }
}