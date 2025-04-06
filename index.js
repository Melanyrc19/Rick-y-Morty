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
        $containerImages.innerHTML += `<div class="p-2 m-auto "><img class="w-24 h-24 md:w-48 md:h-48 object-cover rounded-lg mb-4" src="${personaje.image}" />
        <h2>${personaje.name}</h2>
        <p>Genero: ${personaje.gender}</p>
        <p>Estado: ${personaje.status}</p>`;
    }}
    else{
        for (const capitulo of array) {
            $containerImages.innerHTML += `
            <h2>${capitulo.name}</h2>
            <p>Episodio: ${capitulo.episode}</p>`;
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
        $containerImages.innerHTML += `<div class="p-2 m-auto ">
        <h2>${capitulo.name}</h2>
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



