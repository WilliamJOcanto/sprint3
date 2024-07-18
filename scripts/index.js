// Creando cards de peliculas:

let contenedor = document.getElementById("contenedorMovies")

function estructuraCard(lenguaje, release, duracion, status, foto, titulo, eslogan, descripcion, votos, budget, revenue, genero){
    let card = `<article class="cardFav flex flex-col items-center border-solid border-4 border-yellow-600 bg-gray-700 w-80 h-[400px] px-6 py-8 gap-2 rounded-xl mb-4 relative">
            <button class="botonFav absolute top-0 right-2 text-5xl text-white">&hearts;</button>
            <img class="w-52 border-4 border-solid border-green-800 rounded-xl" src="https://moviestack.onrender.com/static/${foto}" alt="${titulo}">
            <span class="font-bold">${titulo}</span>
            <span class="font-bold">${eslogan}</span>
            <p class="overflow-hidden mb-2 h-[100px] text-ellipsis">${descripcion}</p>
            <a href="./search.html?original_language=${lenguaje}&release_date=${release}&runtime=${duracion}&status=${status}&image=${foto}&title=${titulo}&tagline=${eslogan}&overview=${descripcion}&vote_average=${votos}&budget=${budget}&revenue=${revenue}&genres=${genero}">
            <button class="bg-yellow-500 font-bold p-2 rounded-xl border-4 border-solid border-red-900">Ver mas</button></a>
        </article>`;
    return card;
}


function crearCards(arrayPreexistente){
    // for (let i = 0; i < arrayPreexistente.length; i++) {
    //     nuevoArray[i] = estructuraCard(arrayPreexistente[i].image, arrayPreexistente[i].title, arrayPreexistente[i].tagline, arrayPreexistente[i].overview)
    // }
    let nuevoArray = ""
    arrayPreexistente.forEach(pelicula =>{
        nuevoArray += estructuraCard(pelicula.original_language, pelicula.release_date, pelicula.runtime, pelicula.status, pelicula.image, pelicula.title, pelicula.tagline, pelicula.overview, pelicula.vote_average, pelicula.budget, pelicula.revenue, pelicula.genres)
    })
    contenedor.innerHTML = nuevoArray
}


// Creando inputs de filtro de peliculas:

function armandoListaGeneros(array){
    let listaGeneros = []
    let generosSinRepetir = []
    array.forEach( pelicula => {
        listaGeneros.push((pelicula.genres))
    })
    generosSinRepetir = Array.from(new Set(listaGeneros.flat()))
    return generosSinRepetir
}

function estructuraOption(peliculas){
    let elementoOption = '<option class="font-bold" value="all">All movies</option>'
    armandoListaGeneros(peliculas).forEach(genero =>{
        elementoOption += `<option class="font-bold" value="${genero}">${genero}</option>`
    })

    return elementoSelect.innerHTML = elementoOption
}


// Filtros por genero seleccionado y luego por entrada de nombre:

function filtrarGeneros(value, arrayPeliculas){
    let peliculasSeleccionadas = []
    arrayPeliculas.forEach(pelicula =>{
        if(pelicula.genres.includes(value)){
            peliculasSeleccionadas.push(pelicula)
        }else if(value == "all"){
            peliculasSeleccionadas.push(pelicula)
        }
    })
    return peliculasSeleccionadas
}

// Filros por entrada de nombre y luego por genero seleccionado:

function filtrarNombres(value, arrayPeliculas){
    let peliculasSeleccionadas = []
    arrayPeliculas.forEach(pelicula =>{
        if(pelicula.title.toLowerCase().includes(value)){
            peliculasSeleccionadas.push(pelicula)
        }
    })
    return peliculasSeleccionadas
}

// Tomando datos de la api:

let urlApiMovies = 'https://moviestack.onrender.com/api/movies'
let apiKeyMovies = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
let moviesData 
let elementoSelect
let elementoInput

const init = {
    method: 'GET',
    headers: {
        'x-api-key': apiKeyMovies
    }
}

fetch(urlApiMovies, init)
.then(response => response.json())
.then(data => {
    moviesData = data.movies
    elementoSelect = document.getElementById("seleccionGeneros")
    elementoInput = document.getElementById("nombrePelicula")
    crearCards(moviesData)
    estructuraOption(moviesData)

    elementoSelect.addEventListener("input", (event) =>{
        let eventValue = event.target.value
        let generosSeleccionados = filtrarGeneros(eventValue, moviesData) 
        let peliculaSeleccionada = filtrarNombres(elementoInput.value, generosSeleccionados)
        crearCards(peliculaSeleccionada)
        })

    elementoInput.addEventListener("input", (event) => {
        let entradaTexto = event.target.value
        let peliculaSeleccionada = filtrarNombres(entradaTexto, moviesData)
        let generosSeleccionados = filtrarGeneros(elementoSelect.value, peliculaSeleccionada)
        crearCards(generosSeleccionados)
    })
})
    .catch(errorOcurrido => console.log(errorOcurrido))




// Generando favoritos:

let contenedorFav = document.getElementById("contenedorFavs")
let cardsFav = document.querySelectorAll(".cardFav")
let botonFav = document.querySelectorAll(".botonFav")






