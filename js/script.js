
// creating pokemons inside a pokemon list; characters description from pokedex.org
let pokemonRepository = (function () {
  //first we create a modal container by btargetingnthe class in the HTML
  let pokemonModal= document.querySelector("#pokemonModal");
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
      listPokemon.classList.add('list-group-item');
      // creating buttons beside list item
      let button = document.createElement('button');
      // assigning text to my buttons with pokemon
      button.innerText = pokemon.name;
      console.log(button);
      //addinhg a class to my button for css styling
      button.classList.add("btn", "btn-info", "btn-lg", "w-100");
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target','#pokemon-modal')
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
      return item;
    }).catch(function (e) {
      console.error(e);
    });
  }
//creating a modal to show title and text
  function showModal(pokemon){
    // this clears exixting html element
    pokemonModal.innerHTML= "";
    //we then create a new block for the modal class
    let modal= document.createElement("div");
    modal.classList.add("modal-content");

    // also create a button to close the modal
    let closeButtonElement= document.createElement("button");
    closeButtonElement.classList.add("close");
    closeButtonElement.setAttribute("data-dismiss", "modal");
    closeButtonElement.innerText= "X";

    //Now we create the title element for the modal
    let titleElement= document.createElement("h1");
    titleElement.innerText= pokemon.name;

    //And we also create the contentt element
    let contentElement= document.createElement("p");
    contentElement.innerText = "Height: " + pokemon.height + "m, " +
            "Type: " + pokemon.types[0].type.name;

    let pokemonImg = document.createElement('img');
     pokemonImg.src = pokemon.imageUrl;

    //Now we add it to the HTML
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonImg);
    pokemonModal.appendChild(modal);
  }
  
  // function to show more details about pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then((pokemon) => {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();
   
  
 // writing out pokemons using the foreach loop
 pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


  