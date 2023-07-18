const contenedorStats = document.getElementById("")
let date; 
let datosEvents;


fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
         datosEvents = data.events
         date = data.currentDate

        const arrayOrdenado = Array.from(datosEvents).sort(function (a, b) {
            return b.capacity - a.capacity
        })
        console.log(arrayOrdenado);

        let eventosPasados = datosEvents.filter(evento => evento.date < date)
        console.log(eventosPasados);

        eventosPasados.sort((a, b)=> calcularPorcentajeAlto( a.assistance, a.capacity ) - calcularPorcentajeAlto( b.assistance, b.capacity ))
        let eventoMayor = eventosPasados[0];
        let eventoMenor = eventosPasados[eventosPasados.length-1];

    }
    )
    .catch(error => console.log(error))

function calcularPorcentajeAlto(assistance, capacidad) {
    let porcentaje = (assistance / capacidad) * 100
    return porcentaje 
}

function tablaMayor (evento, htmlContenedor, porcentaje){
    htmlContenedor.innerHTML = `
    <td> ${evento.name} ${porcentaje} %</td> `
}