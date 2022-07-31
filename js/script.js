const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonAbility = document.querySelector('.pokemon__ability');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonHp = document.querySelector('.pokemon__hp');
const pokemonAttack = document.querySelector('.pokemon__atk');
const pokemonDefense = document.querySelector('.pokemon__def');
const pokemonSAttack = document.querySelector('.pokemon__s-atk');
const pokemonSDefense = document.querySelector('.pokemon__s-def');
const pokemonSpeed = document.querySelector('.pokemon__speed');
const pokemonSAbility = document.querySelector('.pokemon__s-ability');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const btnAvancar = document.getElementById("btn__avancar");
const btnVoltar = document.getElementById("btn__voltar");
const pokeInfo = document.querySelectorAll(".pokemon__info");

let searchPokemon = 1;

let displayAtual = 0;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonHeight.innerHTML = data.height / 10;
    pokemonType.innerHTML = data['types']['0']['type']['name'];
    pokemonAbility.innerHTML = data['abilities']['0']['ability']['name'];
    pokemonWeight.innerHTML = data.weight/10;
    pokemonHp.innerHTML = data['stats']['0']['base_stat'];
    pokemonAttack.innerHTML = data['stats']['1']['base_stat'];
    pokemonDefense.innerHTML = data['stats']['2']['base_stat'];
    pokemonSAttack.innerHTML = data['stats']['3']['base_stat'];
    pokemonSDefense.innerHTML = data['stats']['4']['base_stat'];
    pokemonSpeed.innerHTML = data['stats']['5']['base_stat'];
    pokemonSAbility.innerHTML = data['abilities']['1']['ability']['name'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    input.value = '';

  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    displayAtual = 0;
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
  displayAtual = 0;
});

function mostrarDisplay(indiceDisplay){
  pokeInfo[indiceDisplay].classList.add("select");
}
function ocultarDisplay(){
  const displaySelecionado = document.querySelector(".select");
  displaySelecionado.classList.remove("select");
}

btnAvancar.addEventListener('click', function(){
  
  if(displayAtual === pokeInfo.length -1) displayAtual = -1;
  ocultarDisplay();
  displayAtual++;
  mostrarDisplay(displayAtual);
})
btnVoltar.addEventListener('click', function(){
  
  if(displayAtual === 0) displayAtual = pokeInfo.length -1;
  ocultarDisplay();
  displayAtual--;
  mostrarDisplay(displayAtual);

})

renderPokemon(searchPokemon);
