package com.talleric.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.talleric.model.Producto;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/**
 * Test de INTEGRACION de la capa de datos.
 * Testcontainers levanta un PostgreSQL real y efimero en Docker
 * (igual que Supabase, pero descartable). Verifica el CRUD real
 * sin tocar la base de produccion.
 *
 * Convencion: termina en *IT -> lo ejecuta el plugin failsafe en "mvn verify".
 */
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class ProductoRepositoryIT {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired
    private ProductoRepository repositorio;

    @Test
    void guardaYRecuperaUnProducto() {
        Producto guardado = repositorio.save(new Producto("Yerba Playadito", new BigDecimal("1800"), 12));

        assertThat(guardado.getId()).isNotNull();
        assertThat(repositorio.findById(guardado.getId())).isPresent();
    }

    @Test
    void eliminaUnProducto() {
        Producto guardado = repositorio.save(new Producto("Termo Stanley", new BigDecimal("85000"), 3));

        repositorio.deleteById(guardado.getId());

        assertThat(repositorio.findById(guardado.getId())).isEmpty();
    }

    @Test
    void buscaProductosPorNombre() {
        repositorio.save(new Producto("Bombilla", new BigDecimal("3500"), 4));

        assertThat(repositorio.findByNombre("Bombilla")).hasSize(1);
    }
}
