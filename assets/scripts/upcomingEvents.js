import {
  mostrarTarjetas,
  mostrarCheckbox,
  filtroCruzado,
  crearTarjeta2,
} from "../scripts/module/functions.js";
let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorCheck = document.getElementById("contenedorCheck");
let search = document.getElementById("search-input");

//📌 Fetch
let eventosFuturos;
let eventos;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    eventos = data.events;
    let categoriasRepetidas = eventos.map((evento) => evento.category);
    let categoriasSinRepetir = Array.from(new Set(categoriasRepetidas));
    eventosFuturos = selectorEventos(eventos, data.currentDate);
    mostrarTarjetas(eventosFuturos, contenedorTarjetas, crearTarjeta2);
    mostrarCheckbox(categoriasSinRepetir, contenedorCheck);
  })
  .catch((error) => console.log(error));

function selectorEventos(eventos, currentDate) {
  let eventosFuturosSeleccionado = [];
  for (let evento of eventos) {
    if (evento.date > currentDate) {
      eventosFuturosSeleccionado.push(evento);
    }
  }
  return eventosFuturosSeleccionado;
}

//📌 Escuchadores
contenedorCheck.addEventListener("change", () => {
  console.log("El usuario hizo click");
  const eventosFiltrados = filtroCruzado(
    eventosFuturos,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas, crearTarjeta2);
});

search.addEventListener("keyup", () => {
  console.log("El usuario escribe");
  const eventosFiltrados = filtroCruzado(
    eventosFuturos,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas, crearTarjeta2);
});
