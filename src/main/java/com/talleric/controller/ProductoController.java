package com.talleric.controller;

import com.talleric.model.Producto;
import com.talleric.service.ProductoService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints REST del CRUD de Producto. Delega la logica de negocio
 * en ProductoService y solo se ocupa del transporte HTTP.
 *
 * @CrossOrigin permite que el frontend estatico (otro origen) consuma la API.
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService servicio;

    public ProductoController(ProductoService servicio) {
        this.servicio = servicio;
    }

    /** GET /api/productos -> lista todos los productos. */
    @GetMapping
    public List<Producto> listar() {
        return servicio.listar();
    }

    /** GET /api/productos/{id} -> un producto, o 404 si no existe. */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscar(@PathVariable Long id) {
        return servicio.buscar(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** POST /api/productos -> crea un producto (201). Valida en el service. */
    @PostMapping
    public ResponseEntity<Producto> agregar(@RequestBody Producto producto) {
        Producto creado = servicio.agregar(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    /** DELETE /api/productos/{id} -> elimina (204 sin contenido). */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
