import {crearTarjeta,crearCheckbox, mostrarTarjetas, mostrarCheckbox, filtrarPorCheck, filtrarPorTexto,filtroCruzado,imprimirEventosPorConsola}from"../scripts/module/functions.js"
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

//📌Funciones
// function crearTarjeta(objeto) {
//   return `
//   <div class="col-12 col-md-6 col-xl-4 ">
//   <div class="card">
//       <img src=${objeto.image} class="card-img-top w-100 h-50" alt="food fair">
//       <div class="card-body">
//           <h5 class="card-title">${objeto.name}</h5>
//           <p class="card-text">${objeto.description}.</p>
//           <div class="d-flex justify-content-between">
//               <p>Price:${objeto.price}</p>
//               <a href="./assets/pages/details.html?parametros=${objeto._id}" class="btn btn-danger">Details</a>
//           </div>
//       </div>
//   </div>
// </div>`;
// }

// function crearCheckbox(categoria) {
//   return `<div class="row ps-3">
//     <div class="form-check col-sm-6 col-xl">
//         <input class="form-check-input" type="checkbox" value="${categoria}" id="${categoria}">
//         <label class="form-check-label" for="${categoria}">
//            ${categoria}
//         </label>
//     </div> `;
// }

// function mostrarTarjetas(eventos) {
//   if (eventos.length == 0) {
//     contenedorTarjetas.innerHTML =
//       "El evento buscado no se encuentra disponible";
//   }

//   for (let evento of eventos) {
//     contenedorTarjetas.innerHTML += crearTarjeta(evento);
//   }
// }

// function mostrarCheckbox(array, lugar) {
//   for (const categoria of array) {
//     lugar.innerHTML += crearCheckbox(categoria);
//   }
// }

// function filtrarPorCheck(array, contenedorHTML) {
//   contenedorHTML.innerHTML = "";
//   let categoriasElegida = [];
//   let checkboxSeleccionado = document.querySelectorAll(
//     'input[type="checkbox"]:checked'
//   );
//   checkboxSeleccionado.forEach((input) => {
//     categoriasElegida.push(input.value);
//   });
//   let arrayFiltrado = array.filter(
//     (evento) =>
//       categoriasElegida.includes(evento.category) ||
//       categoriasElegida.length == 0
//   );
//   return arrayFiltrado;

// }

// function filtrarPorTexto(array, textoUsuario) {
//   let arrayText = array.filter((evento) =>
//     evento.name.toLowerCase().includes(textoUsuario.toLowerCase())
//   );
//     return arrayText;
// }

// function filtroCruzado(arrayEventos, categoriasElegida, textoUsuario) {
//   const filtrarPorCheck2 = filtrarPorCheck(arrayEventos, categoriasElegida);
//   console.log(filtrarPorCheck2);
//   const filtrarPorTexto2 = filtrarPorTexto(filtrarPorCheck2, textoUsuario);
//   console.log(filtrarPorTexto2);
//   return filtrarPorTexto2;
// }

// function imprimirEventosPorConsola(array) {
//   for (evento of array) {
//     console.log(evento.name);
//   }
// }

//📌 Escuchadores
contenedorCheck.addEventListener("change", () => {
  console.log("El usuario hizo click");
  const eventosFiltrados = filtroCruzado(
    eventos,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas,crearTarjeta);
  // filtrarPorCheck(eventos, contenedorTarjetas);
});

search.addEventListener("keyup", () => {
  const eventosFiltrados = filtroCruzado(
    eventos,
    contenedorTarjetas,
    search.value
  );
  mostrarTarjetas(eventosFiltrados, contenedorTarjetas,crearTarjeta);
  // contenedorTarjetas.innerHTML = "";
  // filtrarPorTexto(eventos, search.value);
});
