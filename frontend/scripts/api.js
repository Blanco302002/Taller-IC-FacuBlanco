// =====================================================================
//  Capa de datos + validaciones
//  ---------------------------------------------------------------------
//  Demo standalone: guarda los productos en localStorage del navegador,
//  así funciona sin backend (ideal para el deploy estático en Vercel).
//  El backend REST de Spring Boot vive en la rama `development`; para
//  conectarlo, se reemplaza esta capa por llamados fetch a la API.
// =====================================================================
const STORAGE_KEY = "taller-ic-productos";

export const api = {
  async listar() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  async agregar(producto) {
    const items = await this.listar();
    producto.id = Date.now();
    items.push(producto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return producto;
  },

  async eliminar(id) {
    const items = (await this.listar()).filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
};

/** Espejo de las reglas de ProductoService.agregar(). Devuelve null si es válido. */
export function validarProducto({ nombre, precio, stock }) {
  if (!nombre || !nombre.trim()) return "El nombre del producto es obligatorio";
  if (precio === null || isNaN(precio) || precio <= 0) return "El precio debe ser mayor a 0";
  if (isNaN(stock) || stock < 0) return "El stock no puede ser negativo";
  return null;
}
