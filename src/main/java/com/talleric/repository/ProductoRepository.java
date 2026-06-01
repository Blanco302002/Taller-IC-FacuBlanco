package com.talleric.repository;

import com.talleric.model.Producto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio CRUD de Producto. Spring Data genera la implementacion
 * (save, findById, findAll, deleteById, etc.) automaticamente.
 */
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombre(String nombre);
}
