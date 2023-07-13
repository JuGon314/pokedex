const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

// Função para realizar a requisição das informações da API;
// Para utilizar o await(retornar o que foi solicitado) do fetch, é necessário que a função em questão seja assíncrona (async);
const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status === 200) {
        // Extrair os dados
        const data = await apiResponse.json();
        return data;
    }
}

// Renderizar as imagens dos Pokemons
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Searching...";
    pokemonNumber.innerHTML = "";

    // Buscar dados do pokemon
    const data = await fetchPokemon(pokemon);

    // Se o número/nome do pokemon for encontrado
    if(data) {
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        searchPokemon = data.id;
    // Caso não seja encontrado
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
    }
}

// Comportamento do form
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Comportamento botão prev
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

// Comportamento botão next
buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

// Mostrar o primeiro pokemon quando abrir a página
renderPokemon(searchPokemon);