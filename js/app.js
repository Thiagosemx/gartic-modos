let idiomaActual = "es";
let textos = {};

async function cargarTextos(idioma) {
  try {
    const respuesta = await fetch(`langs/${idioma}.json`);
    textos = await respuesta.json();
    aplicarTraduccion();
  } catch (error) {
    console.error("Error al cargar idioma:", error);
  }
}

function aplicarTraduccion() {
  for (const id in textos) {
    const el = document.getElementById(id);
    if (el) {
      el.innerText = textos[id];
    }
  }

  if (textos["titulo"]) {
    document.title = textos["titulo"];
  }
}

function cambiarIdioma(nuevoIdioma) {
  idiomaActual = nuevoIdioma;
  cargarTextos(idiomaActual);
}

function cambiarModo(modo, link) {
  document.querySelectorAll('.modo').forEach(sec => sec.style.display = "none");
  document.getElementById(`modo-${modo}`).style.display = "block";

  document.querySelectorAll('.menu-links a').forEach(a => a.classList.remove('activo'));
  link.classList.add('activo');
}

function modoNoDisponible() {
  const mensaje = textos["modo_no_disponible"] || "Este modo aún no está disponible.";
  const alerta = document.getElementById("alerta");
  alerta.innerText = mensaje;
  alerta.style.display = "block";
  setTimeout(() => alerta.style.display = "none", 2500);
}

window.addEventListener("DOMContentLoaded", () => {
  cargarTextos(idiomaActual);
});
