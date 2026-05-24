import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MateTest {
    @Test
    void mateEnTemperaturaCorrectaEstaListo() {
        Mate m = new Mate("amargo", 70);
        assertTrue(m.estaListo());
    }

    @Test
    void mateMuyCalienteNoEstaListo() {
        Mate m = new Mate("dulce", 95);
        assertFalse(m.estaListo());
    }
}