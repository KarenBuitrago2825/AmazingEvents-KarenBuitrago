let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorCheck = document.getElementById("contenedorCheck");
let search = document.getElementById("search-input");
const arrayEventos = data.events;

function crearTarjeta(objeto) {
  return `
  <div class="col-12 col-md-6 col-xl-4 ">
  <div class="card">
      <img src=${objeto.image} class="card-img-top w-100 h-50" alt="food fair">
      <div class="card-body">
          <h5 class="card-title">${objeto.name}</h5>
          <p class="card-text">${objeto.description}.</p>
          <div class="d-flex justify-content-between">
              <p>Price:${objeto.price}</p>
              <a href="./assets/pages/details.html?parametros=${objeto._id}" class="btn btn-danger">Details</a>
          </div>
      </div>
  </div>
</div>`;
}

function mostrarTarjetas(eventos) {
  if (eventos.length == 0) {
    contenedorTarjetas.innerHTML =
      "El evento buscado no se encuentra disponible";
  }

  for (let evento of eventos) {
    contenedorTarjetas.innerHTML += crearTarjeta(evento);
  }
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

let categoriasRepetidas = arrayEventos.map((evento) => evento.category);
console.log(categoriasRepetidas, contenedorCheck);

let categoriasSinRepetir = Array.from(new Set(categoriasRepetidas));

mostrarCheckbox(categoriasSinRepetir, contenedorCheck);

mostrarTarjetas(arrayEventos);

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
  mostrarTarjetas(arrayFiltrado);
}

contenedorCheck.addEventListener("change", () => {
  filtrarPorCheck(arrayEventos, contenedorTarjetas);
});

function filtrarPorTexto(array, textoUsuario) {
  let arrayText = array.filter((evento) =>
    evento.name.toLowerCase().includes(textoUsuario)
  );
  mostrarTarjetas(arrayText);
}

search.addEventListener("keyup", () => {
  contenedorTarjetas.innerHTML = "";
  filtrarPorTexto(arrayEventos, search.value);
});

