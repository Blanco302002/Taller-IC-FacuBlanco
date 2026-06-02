// ===== Punto de entrada: monta los componentes en orden =====
import { Nav } from "./components/nav.js";
import { Hero } from "./components/hero.js";
import { Stack } from "./components/stack.js";
import { Demo } from "./components/demo.js";
import { Contact } from "./components/contact.js";

const app = document.getElementById("app");
app.append(Nav(), Hero(), Stack(), Demo(), Contact());
