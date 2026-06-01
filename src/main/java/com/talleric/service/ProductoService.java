package com.talleric.service;

import com.talleric.model.Producto;
import com.talleric.repository.ProductoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * Logica de negocio de Producto: valida y delega la persistencia
 * en el repositorio. Aca van las reglas para agregar y eliminar.
 */
@Service
public class ProductoService {

    private final ProductoRepository repositorio;

    public ProductoService(ProductoRepository repositorio) {
        this.repositorio = repositorio;
    }

    public Producto agregar(Producto producto) {
        if (producto.getNombre() == null || producto.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre del producto es obligatorio");
        }
        if (producto.getPrecio() == null || producto.getPrecio().signum() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a 0");
        }
        if (producto.getStock() < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }
        return repositorio.save(producto);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }

    public List<Producto> listar() {
        return repositorio.findAll();
    }

    public Optional<Producto> buscar(Long id) {
        return repositorio.findById(id);
    }
}
