package com.talleric.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Traduce excepciones de la capa de negocio a respuestas HTTP.
 * Las validaciones del ProductoService lanzan IllegalArgumentException,
 * que aca se devuelve como 400 Bad Request con el mensaje en JSON.
 */
@RestControllerAdvice
public class ManejadorDeErrores {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> validacionInvalida(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
}
