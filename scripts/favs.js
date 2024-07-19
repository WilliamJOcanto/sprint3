let contenedorFav = document.getElementById("contenedorFavs")

let favorites2 = localStorage.getItem("fav")
  ? JSON.parse(localStorage.getItem("fav"))
  : [];

console.log(favorites2);

function estructuraCard2(
  id,
  lenguaje,
  release,
  duracion,
  status,
  foto,
  titulo,
  eslogan,
  descripcion,
  votos,
  budget,
  revenue,
  genero
) {
  let isFav = favSelect2(id);
  let card = `<article class="flex flex-col items-center border-solid border-4 border-yellow-600 bg-gray-700 w-80 h-[400px] px-6 py-8 gap-2 rounded-xl mb-4 relative">
            <button data-fav="true" data-id="${id}" class="botonFav absolute top-0 right-2 text-5xl ${
    isFav ? "text-red-600" : "text-white"
  }">&hearts;</button>
            <img class="w-52 border-4 border-solid border-green-800 rounded-xl" src="https://moviestack.onrender.com/static/${foto}" alt="${titulo}">
            <span class="font-bold">${titulo}</span>
            <span class="font-bold">${eslogan}</span>
            <p class="overflow-hidden mb-2 h-[100px] text-ellipsis">${descripcion}</p>
            <a href="./search.html?original_language=${lenguaje}&release_date=${release}&runtime=${duracion}&status=${status}&image=${foto}&title=${titulo}&tagline=${eslogan}&overview=${descripcion}&vote_average=${votos}&budget=${budget}&revenue=${revenue}&genres=${genero}">
            <button class="bg-yellow-500 font-bold p-2 rounded-xl border-4 border-solid border-red-900">Ver mas</button></a>
        </article>`;
  return card;
}


function crearCardFav(arrayIdMovie) {
    let favMovies = [];
    favorites2.forEach(id => {
        let pelicula = arrayIdMovie.find(movie => movie.id === id);
        if (pelicula) {
            favMovies.push(pelicula);
        }
    });
    
    let nuevoArray = "";
    favMovies.forEach(pelicula => {
        nuevoArray += estructuraCard2(pelicula.id, pelicula.original_language, pelicula.release_date, pelicula.runtime, pelicula.status, pelicula.image, pelicula.title, pelicula.tagline, pelicula.overview, pelicula.vote_average, pelicula.budget, pelicula.revenue, pelicula.genres);
    });
    
    contenedorFav.innerHTML = nuevoArray
}

let urlApiMovies2 = "https://moviestack.onrender.com/api/movies";
let apiKeyMovies2 = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
let moviesData2;

const init = {
  method: "GET",
  headers: {
    "x-api-key": apiKeyMovies2,
  },
};

fetch(urlApiMovies2, init)
  .then((response) => response.json())
  .then((data) => {
    moviesData2 = data.movies
    crearCardFav(moviesData2)
  })
  .catch((errorOcurrido) => console.log(errorOcurrido));

  function favSelect2(idMovie) {
    return favorites2.includes(idMovie);
  }
  