public class Mate {
    private String tipo;
    private int temperatura;

    public Mate(String tipo, int temperatura) {
        this.tipo = tipo;
        this.temperatura = temperatura;
    }

    public boolean estaListo() {
        return temperatura >= 60 && temperatura <= 80;
    }

    public String getTipo() { return tipo; }
    public int getTemperatura() { return temperatura; }
}