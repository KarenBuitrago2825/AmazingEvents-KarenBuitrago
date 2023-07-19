import {crearTarjeta, mostrarTarjetas, mostrarCheckbox,filtroCruzado}from"../scripts/module/functions.js"
let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorCheck = document.getElementById("contenedorCheck");
let search = document.getElementById("search-input");


//📌 Fetch
let eventos;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    eventos = data.events;
    let categoriasRepetidas = eventos.map((evento) => evento.category);
    let categoriasSinRepetir = Array.from(new Set(categoriasRepetidas));
    mostrarTarjetas(eventos,contenedorTarjetas,crearTarjeta);
    mostrarCheckbox(categoriasSinRepetir, contenedorCheck);
  })
  .catch((error) => console.log(error));

//📌 Escuchadores
contenedorCheck.addEventListener("change", () => {
  console.log("El usuario hizo click");
  const eventosFiltrados = filtroCruzado(
    eventos,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas,crearTarjeta);
});

search.addEventListener("keyup", () => {
  const eventosFiltrados = filtroCruzado(
    eventos,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas,crearTarjeta);
});
