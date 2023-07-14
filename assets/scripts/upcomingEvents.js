let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorCheck = document.getElementById("contenedorCheck");
let search = document.getElementById("search-input");
const arrayEventos = data.events;

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
  let eventosFuturos = [];
  for (let evento of eventos) {
    if (evento.date > currentDate) {
      eventosFuturos.push(evento);
    }
  }
  return eventosFuturos;
}

let eventosFuturos = selectorEventos(arrayEventos, data.currentDate);
console.log(eventosFuturos);

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
mostrarTarjetas(eventosFuturos, contenedorTarjetas);

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
  mostrarTarjetas(arrayFiltrado,contenedorTarjetas);
}

contenedorCheck.addEventListener("change", () => {
  filtrarPorCheck(eventosFuturos, contenedorTarjetas);
});

function filtrarPorTexto(array, textoUsuario) {
  let arrayText = array.filter((evento) =>
    evento.name.toLowerCase().includes(textoUsuario)
  );
  mostrarTarjetas(arrayText,contenedorTarjetas);
}

search.addEventListener("keyup", () => {
  contenedorTarjetas.innerHTML = "";
  filtrarPorTexto(eventosFuturos, search.value);
});


function filtrarCheck(eventos, categoria){
  if(categoria ==""){
    return eventos
  }
  const aux = eventos.filter(evento =>evento.category == categoria)
  return aux
}
