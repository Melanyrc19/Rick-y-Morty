const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

let currentPage = 1;
let pageMax = 0;


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



const $personajeFilter = $("#personaje-filter");
const $capituloFilter = $("#capitulo-filter");
const $statusFilter = $("#status-filter");
const $filtroCategoria = $("#filtro-categoria");
const $genderFilter = $("#gender-filter");




function pintarDatos(arrayPersonajes) {
    $containerImages.innerHTML = "";
    if (arrayPersonajes.length === 0) {
        $containerImages.innerHTML = "<p>No se encontraron personajes.</p>";
    } else {
    for (const personaje of arrayPersonajes) {
        $containerImages.innerHTML += `<div class="p-2 m-auto "><img class="w-24 h-24 md:w-48 md:h-48 object-cover rounded-lg mb-4" src="${personaje.image}" />
        <h2>${personaje.name}</h2>
        <p>Genero: ${personaje.gender}</p>
        <p>Estado: ${personaje.status}</p>`;
    }}
}
$("#button-search").addEventListener("click", () => {
    const filters = {
        gender: $personajeFilter.value,
        status: $statusFilter.value,
        name: $genderFilter.value,
        episode: $capituloFilter.value
    };

    obtenerDatos(currentPage, filters);
});
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



function obtenerDatos(page, filters){
    let characters = []
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;


    fetch(url)
    .then (res => res.json())
    .then (response => {
        characters = response.results;
        pintarDatos(characters)
    })
    .catch (error => {
       $containerImages.innerHTML = "<p>Error al cargar los personajes.</p>"
    });

}




window.onload = () => { 
    const initialFilters = {
        gender: $personajeFilter.value,
        status: $statusFilter.value,
        name: $genderFilter.value,
        episode: $capituloFilter.value
    };
    obtenerDatos(currentPage, initialFilters);
};



