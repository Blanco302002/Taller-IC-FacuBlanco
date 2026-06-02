// =====================================================================
//  Capa de datos + validaciones
//  ---------------------------------------------------------------------
//  Consume la API REST de Spring Boot (ProductoController).
//  En local el backend corre en http://localhost:8080.
//  Al deployar, cambiá API_BASE por la URL pública del backend.
// =====================================================================
const API_BASE = "http://localhost:8080/api/productos";

export const api = {
  async listar() {
    const r = await fetch(API_BASE);
    if (!r.ok) throw new Error("No se pudieron cargar los productos");
    return await r.json();
  },

  async agregar(producto) {
    const r = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      throw new Error(data.message || "No se pudo agregar el producto");
    }
    return await r.json();
  },

  async eliminar(id) {
    const r = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!r.ok) throw new Error("No se pudo eliminar el producto");
  },
};

/** Espejo de las reglas de ProductoService.agregar(). Devuelve null si es válido. */
export function validarProducto({ nombre, precio, stock }) {
  if (!nombre || !nombre.trim()) return "El nombre del producto es obligatorio";
  if (precio === null || isNaN(precio) || precio <= 0) return "El precio debe ser mayor a 0";
  if (isNaN(stock) || stock < 0) return "El stock no puede ser negativo";
  return null;
}
