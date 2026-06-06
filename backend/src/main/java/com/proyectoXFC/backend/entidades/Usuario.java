package com.proyectoXFC.backend.entidades;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;
    private String primer_nombre_usuario;
    private String segundo_nombre_usuario;
    private String apellidos_usuario;
    private String tipo_documento;
    private String documento_identidad;
    private LocalDate fecha_nacimiento;
    private String email;
    private String contraseña;
    private String telefono;
    private Boolean estado;
    private LocalDate fecha_registro;
    private Long id_rol;
    
    public Usuario(){}

    public Long getId_usuario() {
        return id_usuario;
    }
    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }
    public String getPrimer_nombre_usuario() {
        return primer_nombre_usuario;
    }
    public void setPrimer_nombre_usuario(String primer_nombre_usuario) {
        this.primer_nombre_usuario = primer_nombre_usuario;
    }
    public String getSegundo_nombre_usuario() {
        return segundo_nombre_usuario;
    }
    public void setSegundo_nombre_usuario(String segundo_nombre_usuario) {
        this.segundo_nombre_usuario = segundo_nombre_usuario;
    }
    public String getApellidos_usuario() {
        return apellidos_usuario;
    }
    public void setApellidos_usuario(String apellidos_usuario) {
        this.apellidos_usuario = apellidos_usuario;
    }
    public String getTipo_documento() {
        return tipo_documento;
    }
    public void setTipo_documento(String tipo_documento) {
        this.tipo_documento = tipo_documento;
    }
    public String getDocumento_identidad() {
        return documento_identidad;
    }
    public void setDocumento_identidad(String documento_identidad) {
        this.documento_identidad = documento_identidad;
    }
    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }
    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getContraseña() {
        return contraseña;
    }
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public Boolean getEstado() {
        return estado;
    }
    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
    public LocalDate getFecha_registro() {
        return fecha_registro;
    }
    public void setFecha_registro(LocalDate fecha_registro) {
        this.fecha_registro = fecha_registro;
    }
    public Long getId_rol() {
        return id_rol;
    }
    public void setId_rol(Long id_rol) {
        this.id_rol = id_rol;
    }

    
}
