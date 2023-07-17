let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorCheck = document.getElementById("contenedorCheck");
let search = document.getElementById("search-input");
const arrayEventos = data.events;
// mostrarCheckbox(categoriasSinRepetir, contenedorCheck);
// mostrarTarjetas(eventosPasados, contenedorTarjetas);

//📌 Fetch
let eventosPasados 
let eventos = [];
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    eventos = data.events;
    console.log(eventos);
    imprimirEventosPorConsola(eventos);
    // mostrarTarjetas(eventos);
    // mostrarCheckbox(eventos);
    eventosPasados = selectorEventos(eventos, data.currentDate);
    console.log(eventosPasados);
    let categoriasRepetidas = arrayEventos.map((evento) => evento.category);
    console.log(categoriasRepetidas, contenedorCheck);
    let categoriasSinRepetir = Array.from(new Set(categoriasRepetidas));
  })
  .catch((error) => console.log(error));

//📌Funciones -> Van afuera del fetch
function crearTarjeta(objeto) {
  return `
  <div class="col-12 col-md-6 col-xl-4 ">
  <div class="card h-100">
      <img src=${objeto.image} class="card-img-top h-50" alt="food fair">
      <div class="card-body">
          <h5 class="card-title">${objeto.name}</h5>
          <p class="card-text">${objeto.description}.</p>
          <div class="d-flex justify-content-between">
              <p>Price:${objeto.price}</p>
              <a href="../pages/details.html?parametros=${objeto._id}" class="btn btn-danger">Details</a>
          </div>
      </div>
  </div>
</div>`;
}

function mostrarTarjetas(eventos, contenedorTarjetas) {
  if (eventos.length == 0) {
    contenedorTarjetas.innerHTML =
      "El evento buscado no se encuentra disponible";
  }

  for (let evento of eventos) {
    contenedorTarjetas.innerHTML += crearTarjeta(evento);
  }
}

function selectorEventos(eventos, currentDate) {
  let eventosPasados = [];
  for (let evento of eventos) {
    if (evento.date < currentDate) {
      eventosPasados.push(evento);
    }
  }
  return eventosPasados;
}

function crearCheckbox(categoria) {
  return `<div class="row ps-3">
    <div class="form-check col-sm-6 col-xl">
        <input class="form-check-input" type="checkbox" value="${categoria}" id="${categoria}">
        <label class="form-check-label" for="${categoria}">
           ${categoria}
        </label>
    </div> `;
}

function mostrarCheckbox(array, lugar) {
  for (const categoria of array) {
    lugar.innerHTML += crearCheckbox(categoria);
  }
}

function filtrarPorCheck(array, contenedorHTML) {
  contenedorHTML.innerHTML = "";
  let categoriasElegida = [];
  let checkboxSeleccionado = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  checkboxSeleccionado.forEach(function (input) {
    categoriasElegida.push(input.value);
  });
  let arrayFiltrado = array.filter(
    (evento) =>
      categoriasElegida.includes(evento.category) ||
      categoriasElegida.length == 0
  );
  // mostrarTarjetas(arrayFiltrado,contenedorTarjetas);
}

function filtrarPorTexto(array, textoUsuario) {
  let arrayText = array.filter((evento) =>
    evento.name.toLowerCase().includes(textoUsuario)
  );
  // mostrarTarjetas(arrayText,contenedorTarjetas);
}

function imprimirEventosPorConsola(array) {
  for (evento of array) {
    console.log(evento.name);
  }
}

//📌 Escuchadores -> Van afuera del fetch

contenedorCheck.addEventListener("change", () => {
  filtrarPorCheck(eventosPasados, contenedorTarjetas);
});

search.addEventListener("keyup", () => {
  contenedorTarjetas.innerHTML = "";
  filtrarPorTexto(eventosPasados, search.value);
});
