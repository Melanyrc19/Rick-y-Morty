const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

let currentPage = 1;
let pageMax = 0;
let esLaVistaDePersonajes = true;


const $textSearch = $("#input-search");

const $containerImages = $("#container-images");
const $containerDetail = $("#container-detail");
const $containerButtons = $("#container-buttons");

const $page = $("#page");

// botones:
const $buttonSearch = $("#button-search");
const $buttonPrev = $("#button-prev");
const $buttonNext = $("#button-next");
const $buttonPrevPrev = $("#button-prev-prev");
const $buttonNextNext = $("#button-next-next");


const $statusFilter = $("#status-filter");
const $filtroCategoria = $("#filtro-categoria");
const $genderFilter = $("#gender-filter");

const obtenerDatosPersonaje = async() => {
    const status = $statusFilter.value && $statusFilter.value !== "todos" ? `&status=${$statusFilter.value}` : "";
    const gender = $genderFilter.value && $genderFilter.value != "todos" ?`&gender=${$genderFilter.value}` :"";
    const character = $textSearch.value ?`&name=${$textSearch.value}` :"";
    let url = `https://rickandmortyapi.com/api/character?page=${currentPage}${character}${gender}${status}`;

    const res = await fetch(url);
    const data = await res.json();
    // pageMax = data.info.pages;
    return data;
}

const obtenerDatosCapitulo = async() => {   
    const url = `https://rickandmortyapi.com/api/episode/`;

    const res = await fetch(url);
    const data = await res.json();
    // pageMax = data.info.pages;
    return data;
}

function pintarDatos(array) {
    $containerImages.innerHTML = "";
    if (array.length === 0) {
        $containerImages.innerHTML = "<p>No se encontraron personajes.</p>";
    } 
    if(esLaVistaDePersonajes) {

    for (const personaje of array) {
        $containerImages.innerHTML += ` <div class="sm:w-4/6 md:w-60 p-6 flex flex-col justify-start items-center m-4 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 shadow-lg md:transform md:transition md:duration-300 md:ease-in-out md:hover:scale-110 md:hover:rotate-3">
        <img class="w-auto h-24 md:w-56 md:h-56 md:object-cover rounded-lg mb-4 border-4 border-yellow-500 md:transition md:duration-300 md:ease-in-out md:transform md:hover:scale-110" src="${personaje.image}" />
        <h2 class="md:text-2xl font-bold text-white mb-2 font-[Comic Sans MS], sans-serif">${personaje.name}</h2>
        <p class="text-white mb-1"><strong>Género:</strong> ${personaje.gender}</p>
        <p class="text-white mb-4"><strong>Estado:</strong> ${personaje.status}</p>
        <button class="bg-yellow-400 text-black py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 focus:outline-none">
            Ver Más
        </button>
    </div>
    `;
    }}
    else{
        for (const capitulo of array) {
            $containerImages.innerHTML += `
         <div class="sm:w-4/6 sm:w-60 p-6 flex flex-col justify-start items-center m-6 my-12 rounded-lg shadow-2xl bg-gradient-to-br from-green-500 to-blue-600 h-60 md:transform md:transition duration-300 md:ease-in-out md:hover:scale-110 md:hover:rotate-3">
            <h2 class="md:text-2xl font-extrabold text-white mb-3 text-center font-[Comic Sans MS], sans-serif">${capitulo.name}</h2>
            <p class="text-lg text-white mb-3 text-center">Episodio: ${capitulo.episode}</p>
            <button class="bg-yellow-400 text-black py-2 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 focus:outline-none">
                Ver Más
            </button>
        </div>
        `;
    }
}}




const dibujarPantalla = async() =>{
    
        const data = esLaVistaDePersonajes ?await obtenerDatosPersonaje() :await obtenerDatosCapitulo() 
        pintarDatos(data.results);
}



function pintarCapitulos(arrayCapitulos) {  
    $containerImages.innerHTML = "";
    if (arrayPersonajes.length === 0) {
        $containerImages.innerHTML = "<p>No se encontraron capitulos.</p>";
    } else {
    for (const capitulo of arrayCapitulos) {
        $containerImages.innerHTML += `<div class="b-2 flex w-24 h-12 p-2 m-auto ">
        <h2 class="text-3xl">${capitulo.name}</h2>
        <p>Genero: ${capitulo.gender}</p>
        <p>Estado: ${capitulo.status}</p>`;
    }}
}

$buttonNext.addEventListener('click', () =>{
    currentPage += 1
    obtenerDatos(currentPage) //

})
$buttonPrev.addEventListener('click', () =>{
    currentPage -= 1
    obtenerDatos(currentPage) //

})
$buttonPrevPrev.addEventListener('click', () =>{
    currentPage = 1
    obtenerDatos(currentPage) //

})
$buttonNextNext.addEventListener('click', () =>{
    currentPage = 20
    obtenerDatos(currentPage) //

})

// Cambiar entre personajes y capitulos
$filtroCategoria.addEventListener("click", (e) => {
    esLaVistaDePersonajes = e.target.value === "nombre";
    dibujarPantalla()
       
});

// Filtros
$buttonSearch.addEventListener("click", (e) => {
    e.preventDefault();
    dibujarPantalla();
});

$genderFilter.addEventListener("change", (e) => {
    dibujarPantalla();
});
$statusFilter.addEventListener("change", (e) => {
    dibujarPantalla();
});


 
window.onload = () => { 
    dibujarPantalla();
};



