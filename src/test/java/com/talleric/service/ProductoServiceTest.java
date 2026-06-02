package com.talleric.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.talleric.model.Producto;
import com.talleric.repository.ProductoRepository;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

/*
    Tests unitarios de la logica de negocio: NO tocan la base de datos
 */
class ProductoServiceTest {

    private final ProductoRepository repositorio = mock(ProductoRepository.class);
    private final ProductoService service = new ProductoService(repositorio);

    @Test
    void agregarProductoValidoLoGuarda() {
        Producto p = new Producto("Yerba Playadito", new BigDecimal("1800"), 12);
        when(repositorio.save(any(Producto.class))).thenReturn(p);

        service.agregar(p);

        verify(repositorio).save(p);
    }

    @Test
    void agregarConPrecioCeroLanzaExcepcion() {
        Producto p = new Producto("Yerba", BigDecimal.ZERO, 10);
        assertThrows(IllegalArgumentException.class, () -> service.agregar(p));
    }

    @Test
    void agregarConNombreVacioLanzaExcepcion() {
        Producto p = new Producto("   ", new BigDecimal("100"), 10);
        assertThrows(IllegalArgumentException.class, () -> service.agregar(p));
    }

    @Test
    void productoConStockEstaDisponible() {
        assertTrue(new Producto("Termo", new BigDecimal("25000"), 5).hayStock());
    }

    @Test
    void productoSinStockNoEstaDisponible() {
        assertFalse(new Producto("Termo", new BigDecimal("25000"), 0).hayStock());
    }

    @Test
    void eliminarDelegaEnElRepositorio() {
        service.eliminar(7L);
        verify(repositorio).deleteById(7L);
    }

    @Test
    void buscarRetornaLoQueDevuelveElRepositorio() {
        Producto p = new Producto("Bombilla", new BigDecimal("3500"), 4);
        when(repositorio.findById(1L)).thenReturn(java.util.Optional.of(p));

        assertEquals(p, service.buscar(1L).orElseThrow());
    }
}
