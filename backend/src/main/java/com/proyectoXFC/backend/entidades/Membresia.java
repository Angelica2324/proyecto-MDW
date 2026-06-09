package com.proyectoXFC.backend.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Membresia {
    
    @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_membresia;
    private Long id_socio;
    private Long id_entrenador;
    private String Tipo_membresia;
    private String fecha_inicio;
    private String fecha_vencimiento;
    private boolean estado_membresia;
    private double monto_total;

    public Membresia(){}

    public Long getId_membresia() {
        return id_membresia;
    }

    public void setId_membresia(Long id_membresia) {
        this.id_membresia = id_membresia;
    }

    public Long getId_socio() {
        return id_socio;
    }

    public void setId_socio(Long id_socio) {
        this.id_socio = id_socio;
    }

    public Long getId_entrenador() {
        return id_entrenador;
    }

    public void setId_entrenador(Long id_entrenador) {
        this.id_entrenador = id_entrenador;
    }

    public String getTipo_membresia() {
        return Tipo_membresia;
    }

    public void setTipo_membresia(String tipo_membresia) {
        Tipo_membresia = tipo_membresia;
    }

    public String getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(String fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public String getFecha_vencimiento() {
        return fecha_vencimiento;
    }

    public void setFecha_vencimiento(String fecha_vencimiento) {
        this.fecha_vencimiento = fecha_vencimiento;
    }

    public boolean isEstado_membresia() {
        return estado_membresia;
    }

    public void setEstado_membresia(boolean estado_membresia) {
        this.estado_membresia = estado_membresia;
    }

    public double getMonto_total() {
        return monto_total;
    }

    public void setMonto_total(double monto_total) {
        this.monto_total = monto_total;
    }

    

}
