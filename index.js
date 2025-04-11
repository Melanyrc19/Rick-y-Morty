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

const $butonDetalleCapitulo = $("#button-detalle-capitulo")
const $butonDetallePersonaje= $("#button-detalle-personaje")
 
// filtros

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
        <button data-id="${personaje.id}"  class="bg-yellow-400 text-black py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 focus:outline-none">
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
            <button data-id="${capitulo.id}"  class="bg-yellow-400 text-black py-2 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 focus:outline-none">
                Ver Más
            </button>
        </div>
        `;
    }

    
}}




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
        <div class="p-4 rounded shadow-lg">
            <h2 class="text-2xl font-bold text-white">${personaje.name}</h2>
            <img src="${personaje.image}" class="w-40 rounded my-4" />
            <p class="text-white"><strong>Género:</strong> ${personaje.gender}</p>
            <p class="text-white"><strong>Estado:</strong> ${personaje.status}</p>
            <p class="text-white"><strong>Especie:</strong> ${personaje.species}</p>
            <p class="text-white"><strong>Origen:</strong> ${personaje.origin.name}</p>
            <button class="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-600" onclick="cerrarDetalle()">Cerrar</button>
        </div>
    `;
    $containerDetail.classList.remove("hidden");
}
async function mostrarDetalleCapitulo(capitulo) {
    const personajes = await Promise.all(
        capitulo.characters.map(url => fetch(url).then(res => res.json()))
    );

    $containerDetail.innerHTML = `
        <div class="bg-blue-800 p-6 rounded-lg text-white shadow-lg mt-6">
            <h2 class="text-2xl font-bold mb-4">${capitulo.name}</h2>
            <p><strong>Episodio:</strong> ${capitulo.episode}</p>
            <p><strong>Fecha de emisión:</strong> ${capitulo.air_date}</p>
            <h3 class="text-xl mt-4 mb-2 font-bold">Personajes:</h3>
            <div class="flex flex-wrap gap-4">
                ${personajes.map(p => `
                    <div class="bg-green-600 p-2 rounded shadow w-40 text-center">
                        <img src="${p.image}" class="rounded w-full h-28 object-cover" />
                        <p class="font-bold">${p.name}</p>
                    </div>
                `).join("")}
            </div>
            <button class="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-600" onclick="cerrarDetalle()">Cerrar</button>
        </div>
    `;
}

function cerrarDetalle() {
    $containerDetail.classList.add("hidden");
    $containerImages.classList.remove("hidden"); 
}

function mostrarLoader() {
    $loader.classList.remove("hidden");
}

function ocultarLoader() {
    $loader.classList.add("hidden");
}



// eventos:

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
         
    }
  

})
$buttonPrevPrev.addEventListener('click', () =>{
    currentPage = 1
    dibujarPantalla(currentPage) //

})
$buttonNextNext.addEventListener('click', () =>{
    if (esLaVistaDePersonajes){
        currentPage = 42
        dibujarPantalla(currentPage)
    }
    if (!esLaVistaDePersonajes){
        currentPage = 3
        dibujarPantalla(currentPage)
    }
   

})



$opcionesPersonajes = $("#opcionesPersonajes")

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
$containerImages.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = e.target.getAttribute("data-id");

        if (esLaVistaDePersonajes) {
            const data = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const personaje = await data.json();
            mostrarDetallePersonaje(personaje);
         
        } else {
            const data = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            const capitulo = await data.json();
            await mostrarDetalleCapitulo(capitulo);
        }

        $containerDetail.classList.remove("hidden");
        $containerImages.classList.add("hidden");
    }
});
