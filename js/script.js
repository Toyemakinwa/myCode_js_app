
// creating pokemons inside a pokemon list; characters description from pokedex.org
let pokemonRepository = (function () {
  let pokemonList = [];
  // creating the variable to access the API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


// function for adding the new pokemon to be an object
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon 
    ) {
    pokemonList.push(pokemon);
  } else {
    document.write('Pokémon is not correct');
  }
}
  
// function to list out all pokemons
  function getAll() {
    return pokemonList;
  }

  //
  function addListItem(pokemon){
    //targeting class ul in html
    let pokemonList = document.querySelector('.pokemon-list');
    // creating list inside ul
      let listPokemon = document.createElement('li');
      // creating buttons beside list item
      let button = document.createElement('button');
      // assigning text to my buttons with pokemon
      button.innerText = pokemon.name;
      //addinhg a class to my button for css styling
      button.classList.add('pokemon-button');
      // create new child pokemon
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      //event listener for my addlist item
      button.addEventListener('click', function () {
        showDetails(pokemon);
        });
    }

    // loading pokemons from API list
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // function to show more details about pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
   
  
 // writing out pokemons using the foreach loop
 pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

  