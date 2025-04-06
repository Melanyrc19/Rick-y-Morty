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

// Función para pintar los datos de los personajes
function pintarDatos(arrayPersonajes) {
    $containerImages.innerHTML = "";
    if (arrayPersonajes.length === 0) {
        $containerImages.innerHTML = "<p>No se encontraron personajes.</p>";
    } else {
        for (const personaje of arrayPersonajes) {
            const personajeElement = document.createElement('div');
            personajeElement.classList.add('p-2', 'm-auto');
            personajeElement.innerHTML = `
                <img class="w-24 h-24 md:w-48 md:h-48 object-cover rounded-lg mb-4" src="${personaje.image}" />
                <h2>${personaje.name}</h2>
                <p>Genero: ${personaje.gender}</p>
                <p>Estado: ${personaje.status}</p>
            `;

            // Agregar un event listener para el clic en el personaje
            personajeElement.addEventListener('click', () => {
                mostrarDetalles(personaje);
            });

            $containerImages.appendChild(personajeElement);
        }
    }
}

// Función para pintar los detalles del personaje seleccionado
function mostrarDetalles(personaje) {
    $containerDetail.innerHTML = `
        <div class="p-4">
            <img class="w-32 h-32 md:w-64 md:h-64 object-cover rounded-lg mb-4" src="${personaje.image}" />
            <h2 class="text-2xl font-bold">${personaje.name}</h2>
            <p><strong>Género:</strong> ${personaje.gender}</p>
            <p><strong>Estado:</strong> ${personaje.status}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
            <p><strong>Origen:</strong> ${personaje.origin.name}</p>
            <p><strong>Ubicación actual:</strong> ${personaje.location.name}</p>
            <p><strong>Primer episodio:</strong> ${personaje.first_episode}</p>
        </div>
    `;
}

// Función para obtener los datos de la API con filtros
function obtenerDatos(page, filters) {
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;

    // Añadir filtros a la URL si existen
    if (filters.name) {
        url += `&name=${filters.name}`;  // Filtrar por nombre de personaje
    }
    if (filters.gender && filters.gender !== "todos") {
        url += `&gender=${filters.gender}`; // Filtrar por género
    }
    if (filters.status && filters.status !== "todos") {
        url += `&status=${filters.status}`; // Filtrar por estado
    }
    if (filters.episode) {
        url += `&episode=${filters.episode}`; // Filtrar por episodio
    }

    fetch(url)
        .then((res) => res.json())
        .then((response) => {
            const characters = response.results;
            pageMax = response.info.pages;
            pintarDatos(characters);
            $page.textContent = `Página ${currentPage} de ${pageMax}`;
        })
        .catch((error) => {
            $containerImages.innerHTML = "<p>Error al cargar los personajes.</p>";
        });
}

// Evento de búsqueda
$buttonSearch.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir la recarga de la página
    
    currentPage = $page; // Establece la página a 1
    
    obtenerDatos(currentPage, {
        name: $textSearch.value,
        gender: $genderFilter.value,
        status: $statusFilter.value,
        episode: $capituloFilter.value,
    });
});
// Eventos de paginación
$buttonNext.addEventListener("click", () => {
    if (currentPage < pageMax) {
        currentPage += 1;
        obtenerDatos(currentPage, {
            name: $textSearch.value,
            gender: $genderFilter.value,
            status: $statusFilter.value,
            episode: $capituloFilter.value,
        });
    }
});

$buttonPrev.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        obtenerDatos(currentPage, {
            name: $textSearch.value,
            gender: $genderFilter.value,
            status: $statusFilter.value,
            episode: $capituloFilter.value,
        });
    }
});

$buttonPrevPrev.addEventListener("click", () => {
    currentPage = 1;
    obtenerDatos(currentPage, {
        name: $textSearch.value,
        gender: $genderFilter.value,
        status: $statusFilter.value,
        episode: $capituloFilter.value,
    });
});

$buttonNextNext.addEventListener("click", () => {
    currentPage = pageMax;
    obtenerDatos(currentPage, {
        name: $textSearch.value,
        gender: $genderFilter.value,
        status: $statusFilter.value,
        episode: $capituloFilter.value,
    });
});

// Cargar datos al iniciar la página
window.onload = () => {
    obtenerDatos(currentPage, {
        name: $textSearch.value,
        gender: $genderFilter.value,
        status: $statusFilter.value,
        episode: $capituloFilter.value,
    });
};

