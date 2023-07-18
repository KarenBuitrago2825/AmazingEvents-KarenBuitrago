import { mostrarTarjetas, mostrarCheckbox,filtroCruzado, crearTarjeta3}from"../scripts/module/functions.js"
let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorCheck = document.getElementById("contenedorCheck");
let search = document.getElementById("search-input");


//📌 Fetch
let eventosPasados;
let eventos;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    eventos = data.events;
    let categoriasRepetidas = eventos.map((evento) => evento.category);
    let categoriasSinRepetir = Array.from(new Set(categoriasRepetidas));
    eventosPasados = selectorEventos(eventos, data.currentDate);
    mostrarTarjetas(eventosPasados, contenedorTarjetas, crearTarjeta3);
    mostrarCheckbox(categoriasSinRepetir, contenedorCheck);
  })
  .catch((error) => console.log(error));

//📌 Funciones

function selectorEventos(eventos, currentDate) {
  let eventosPasadosSeleccionado = [];
  for (let evento of eventos) {
    if (evento.date < currentDate) {
      eventosPasadosSeleccionado.push(evento);
    }
  }
  return eventosPasadosSeleccionado;
}

//📌 Escuchadores
contenedorCheck.addEventListener("change", () => {
  console.log("El usuario hizo click");
  const eventosFiltrados = filtroCruzado(
    eventosPasados,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas, crearTarjeta3);
});

search.addEventListener("keyup", () => {
  console.log("El usuario escribe");
  const eventosFiltrados = filtroCruzado(
    eventosPasados,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas, crearTarjeta3);
});
