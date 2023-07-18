let contenedorDetalles = document.getElementById("contenedorDetails");
const arrayEventos = data.events;

let parametro = location.search;
let parametroEvento = new URLSearchParams(parametro);

const idEvento = parametroEvento.get("parametros");
const eventoTarjeta = arrayEventos.find((evento) => evento._id === idEvento);

function mostrarTarjeta(array, lugarHTML) {
  lugarHTML.innerHTML = `            <div class="card mb-3 p-3 bg-danger text-light">
    <div class="row g-0">
        <div class="col-md-4 d-sm-flex justify-content-sm-center" >
            <img src="${array.image}" class="img-fluid rounded-start " alt="food">
        </div>
        <div class="col-md-8 d-flex align-items-center">
            <div class="card-body">
                <h5 class="card-title">${array.name}</h5>
                <p class="card-text">${array.description}</p>
                <p>Date: ${array.date}</p>
                <p>Category:${array.category}</p>
                <p>Place: ${array.place}</p>
                <p>Capacity: ${array.capacity}</p>
                <p>Assistance:${array.assitance}</p>
                <p>Price: ${array.price}</p>
            </div>
        </div>
    </div>
</div> `;
}



let eventos;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    eventos = data.events;
    let categoriasRepetidas = eventos.map((evento) => evento.category);
    let categoriasSinRepetir = Array.from(new Set(categoriasRepetidas));
    mostrarTarjeta(eventoTarjeta,contenedorDetalles)
  })
  .catch((error) => console.log(error));