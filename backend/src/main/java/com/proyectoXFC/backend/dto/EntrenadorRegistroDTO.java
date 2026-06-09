package com.proyectoXFC.backend.dto;


public class EntrenadorRegistroDTO {
    
    private String primer_nombre_usuario;
    private String segundo_nombre_usuario;
    private String apellidos_usuario;
    private String email;
    private String telefono;
    private String documento_identidad;
    private String tipo_documento;
    private String contraseña;
    private String fecha_nacimiento;
    
    private String especialidad;
    
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
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getTelefono() {
        return telefono;
    }
    
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
    public String getDocumento_identidad() {
        return documento_identidad;
    }
    
    public void setDocumento_identidad(String documento_identidad) {
        this.documento_identidad = documento_identidad;
    }
    
    public String getTipo_documento() {
        return tipo_documento;
    }
    
    public void setTipo_documento(String tipo_documento) {
        this.tipo_documento = tipo_documento;
    }
    
    public String getContraseña() {
        return contraseña;
    }
    
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
    
    public String getFecha_nacimiento() {
        return fecha_nacimiento;
    }
    
    public void setFecha_nacimiento(String fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }
    
    public String getEspecialidad() {
        return especialidad;
    }
    
    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }
}