const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

let currentPage = 1;
let pageMax = {};
let esLaVistaDePersonajes = true;


const $textSearch = $("#input-search");

const $containerImages = $("#container-images");
const $containerDetail = $("#container-detail");
const $containerButtons = $("#container-buttons");

const $page = $("#page");

const $loader = $("#loader");

// botones:
const $buttonSearch = $("#button-search");
const $buttonPrev = $("#button-prev");
const $buttonNext = $("#button-next");
const $buttonPrevPrev = $("#button-prev-prev");
const $buttonNextNext = $("#button-next-next");
let personajeSeleccionado = null;


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
    pageMax = data.info.pages;
    return data;
}

const obtenerDatosCapitulo = async() => {   
    const url = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;

    const res = await fetch(url);
    const data = await res.json();
    pageMax = data.info.pages;
    return data;
}

function pintarDatos(array) {
    $containerImages.innerHTML = "";
    if (array.length === 0) {
        $containerImages.innerHTML = "<p>No se encontraron personajes.</p>";
    } 
    if(esLaVistaDePersonajes) {

    for (const personaje of array) {
        $containerImages.innerHTML += ` <div class="w-32 md:w-60 p-2 lg:p-6 flex flex-col justify-start items-center m-2 lg:m-4 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 shadow-lg md:transform md:transition md:duration-300 md:ease-in-out md:hover:scale-110 md:hover:rotate-3">
        <img class=" w-[70%] h-[70%] md:w-auto md:h-24 lg:w-60 lg:h-60 md:object-cover rounded-lg mb-4 border-4 border-yellow-500 md:transition md:duration-300 md:ease-in-out md:transform md:hover:scale-110" src="${personaje.image}" />
        <h2 class="md:text-2xl font-bold text-white mb-2 font-[Comic Sans MS], sans-serif">${personaje.name}</h2>
        <p class="text-white mb-1"><strong>Género:</strong> ${personaje.gender}</p>
        <p class="text-white mb-4"><strong>Estado:</strong> ${personaje.status}</p>
       <button class="ver-mas bg-yellow-400 text-black py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 focus:outline-none"
    data-id="${personaje.id}"
    onclick="verDetallePersonaje(${personaje.id})">
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
            <button class="ver-mas  bg-yellow-400 text-black py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 focus:outline-none" data-id="${capitulo.id}" onclick="verDetalleCapitulo(${capitulo.id})">
   Ver Más
</button>

        </div>
        `;
    }
}}


function mostrarDetallePersonaje(personaje) {
    $containerDetail.innerHTML = `
        <div class="bg-white p-4 rounded shadow-lg">
            <h2 class="text-2xl font-bold">${personaje.name}</h2>
            <img src="${personaje.image}" class="w-40 rounded my-4" />
            <p><strong>Género:</strong> ${personaje.gender}</p>
            <p><strong>Estado:</strong> ${personaje.status}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
            <p><strong>Origen:</strong> ${personaje.origin.name}</p>
            <p><strong>Ubicación:</strong> ${personaje.location.name}</p>
        </div>
    `;
    
}



const dibujarPantalla = async() =>{
    mostrarLoader();
    
    const data = esLaVistaDePersonajes ?await obtenerDatosPersonaje() :await obtenerDatosCapitulo() 
    pageMax = data.info?.pages 
    pintarDatos(data.results);
    ocultarLoader(); 
    $page.innerHTML = `Página ${currentPage} de ${pageMax}`;
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




function mostrarDetallePersonaje(personaje) {
    $containerDetail.innerHTML = `
        <div class="bg-white p-4 rounded shadow-lg">
            <h2 class="text-2xl font-bold">${personaje.name}</h2>
            <img src="${personaje.image}" class="w-40 rounded my-4" />
            <p><strong>Género:</strong> ${personaje.gender}</p>
            <p><strong>Estado:</strong> ${personaje.status}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
            <p><strong>Origen:</strong> ${personaje.origin.name}</p>
        </div>
    `;
    $containerDetail.classList.remove("hidden");
}
function mostrarDetalleCapitulo(capitulo) {
    $containerDetail.innerHTML = `
        <div class="bg-white p-4 rounded shadow-lg">
            <h2 class="text-2xl font-bold mb-2">${capitulo.name}</h2>
            <p><strong>Episodio:</strong> ${capitulo.episode}</p>
            <p><strong>Fecha de emisión:</strong> ${capitulo.air_date}</p>
        </div>
    `;
    $containerDetail.classList.remove("hidden");
}


async function verDetallePersonaje(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const personaje = await res.json();
    mostrarDetallePersonaje(personaje);
}

async function verDetalleCapitulo(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    const capitulo = await res.json();
    mostrarDetalleCapitulo(capitulo);
}




function mostrarLoader() {
    $loader.classList.remove("hidden");
}

function ocultarLoader() {
    $loader.classList.add("hidden");
}

$buttonNext.addEventListener('click', () =>{
    if (currentPage < pageMax) {
        currentPage += 1;
        dibujarPantalla();
       
    }


})
$buttonPrev.addEventListener('click', () =>{
    if (currentPage>1){
        currentPage -= 1
        dibujarPantalla(currentPage)
         //
    }
  

})
$buttonPrevPrev.addEventListener('click', () =>{
    currentPage = 1
    dibujarPantalla(currentPage) //

})
$buttonNextNext.addEventListener('click', () =>{
    currentPage = pageMax;
    dibujarPantalla();
   

})



$opcionesPersonajes = $("#opcionesPersonajes")
// Cambiar entre personajes y capitulos
$filtroCategoria.addEventListener("click", (e) => {
    esLaVistaDePersonajes = e.target.value === "nombre";
    dibujarPantalla();
    if ($filtroCategoria.value === "nombre") {
        $opcionesPersonajes.classList.remove("hidden");
    } else {
        $opcionesPersonajes.classList.add("hidden");
    }  
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



// me falta arreglar botones,V loaadingV, detalle. coomo hago para saber cuantas paginas poner.V 

