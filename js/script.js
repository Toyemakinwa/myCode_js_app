
// creating pokemons inside a pokemon list; characters description from pokedex.org
let pokemonRepository = (function () {
  //first we create a modal container by btargetingnthe class in the HTML
  let modalContainer= document.querySelector("#modal-container");
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
//creating a modal to show title and text
  function showModal(title, text){
    // this clears exixting html element
    modalContainer.innerHTML= "";
    //we then create a new block for the modal class
    let modal= document.createElement("div");
    modal.classList.add("modal");

    // also create a button to close the modal
    let closeButtonElement= document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText= "close";
    closeButtonElement.addEventListener("click", hideModal);

    //Now we create the title element for the modal
    let titleElement= document.createElement("h1");
    titleElement.innerText= title;

    //And we also create the contentt element
    let contentElement= document.createElement("p");
    contentElement.innerText= text;

    //Now we add it to the HTML
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }
    //this is to hide the modal container
    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }
    
    document.querySelector("#show-modal").addEventListener("click", () => {
      showModal("modal title", "This is the modal content");
    });
    //This also hides the modal container using thee escape button of the keyboard
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.classList.contains("is-visible")){
        hideModal();
      }
    });

    //this also hides the modal container when you click outside of it
    modalContainer.addEventListener("click", (e) => {
      let target= e.target;
      if (target === modalContainer){
        hideModal();
      }
    });

  // function to show more details about pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
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

  