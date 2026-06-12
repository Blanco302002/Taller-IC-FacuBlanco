// ===== Componente: Demo (CRUD de Productos) =====
import { api, validarProducto } from "../api.js";

const fmtMoney = (n) =>
  "$" + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

export function Demo() {
  const el = document.createElement("section");
  el.className = "demo";
  el.id = "demo";
  el.innerHTML = `
    <div class="container">
      <h2>Demo · CRUD de Productos</h2>
      <p class="sub">Probá las operaciones del CRUD en vivo. Reproduce las validaciones del <code>ProductoService</code>.</p>
      <div class="demo__wrap">
        <div class="panel">
          <h3>Agregar producto</h3>
          <form class="form">
            <div class="field">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Ej: Teclado mecánico" />
            </div>
            <div class="field">
              <label for="precio">Precio</label>
              <input type="number" id="precio" step="0.01" min="0" placeholder="Ej: 15000.00" />
            </div>
            <div class="field">
              <label for="stock">Stock</label>
              <input type="number" id="stock" min="0" placeholder="Ej: 10" />
            </div>
            <div class="form__msg js-msg"></div>
            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">+ Agregar</button>
          </form>
        </div>

        <div class="panel">
          <h3>Productos</h3>
          <div class="table-scroll">
            <table class="table">
              <thead>
                <tr><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr>
              </thead>
              <tbody class="js-tbody"></tbody>
            </table>
            <div class="empty js-empty">Todavía no hay productos. ¡Agregá el primero! 👈</div>
          </div>

          <div class="summary">
            <div class="stat"><div class="n js-count">0</div><div class="l">Productos</div></div>
            <div class="stat"><div class="n js-stock">0</div><div class="l">Unidades en stock</div></div>
            <div class="stat"><div class="n js-value">$0</div><div class="l">Valor de inventario</div></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // --- Referencias y lógica del componente ---
  const form = el.querySelector(".form");
  const msg = el.querySelector(".js-msg");
  const tbody = el.querySelector(".js-tbody");
  const empty = el.querySelector(".js-empty");
  const elCount = el.querySelector(".js-count");
  const elStock = el.querySelector(".js-stock");
  const elValue = el.querySelector(".js-value");
  const inputs = {
    nombre: el.querySelector("#nombre"),
    precio: el.querySelector("#precio"),
    stock: el.querySelector("#stock"),
  };

  async function render() {
    const items = await api.listar();

    tbody.innerHTML = "";
    empty.style.display = items.length ? "none" : "block";

    let totalStock = 0;
    let totalValue = 0;
    for (const p of items) {
      totalStock += Number(p.stock);
      totalValue += Number(p.precio) * Number(p.stock);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="name">${escapeHtml(p.nombre)}</td>
        <td>${fmtMoney(p.precio)}</td>
        <td>${p.stock}</td>
        <td style="text-align:right;"><button class="icon-btn" data-id="${p.id}">🗑 Eliminar</button></td>
      `;
      tbody.appendChild(tr);
    }

    elCount.textContent = items.length;
    elStock.textContent = totalStock;
    elValue.textContent = fmtMoney(totalValue);

    tbody.querySelectorAll(".icon-btn").forEach((btn) =>
      btn.addEventListener("click", async () => {
        try {
          await api.eliminar(Number(btn.dataset.id));
          render();
        } catch (err) {
          msg.textContent = "✖ " + err.message;
          msg.className = "form__msg error";
        }
      })
    );
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const producto = {
      nombre: inputs.nombre.value,
      precio: parseFloat(inputs.precio.value),
      stock: parseInt(inputs.stock.value, 10),
    };

    const error = validarProducto(producto);
    if (error) {
      msg.textContent = "✖ " + error;
      msg.className = "form__msg error";
      return;
    }

    try {
      await api.agregar({ nombre: producto.nombre.trim(), precio: producto.precio, stock: producto.stock });
      msg.textContent = "✔ Producto agregado";
      msg.className = "form__msg ok";
      form.reset();
      render();
      setTimeout(() => { msg.textContent = ""; }, 2500);
    } catch (err) {
      msg.textContent = "✖ " + err.message;
      msg.className = "form__msg error";
    }
  });

  render();
  return el;
}
