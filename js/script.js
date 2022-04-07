
// creating pokemons inside a pokemon list; characters description from pokedex.org
let pokemonRepository = (function () {
  let repository = [
    {name: "Fearrow", height: 1.2, types: ["water", "speed"]}, 
    {name: "Ivysaur", height: 1, types: ["grass", "poison"]}, 
    {name: "Charmeleon", height: 1.1, types: ["love", "weather"]}
  ];

// function for adding the new pokemon to be an object
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon 
    ) {
    repository.push(pokemon);
  } else {
    document.write('Pokémon is not correct');
  }
}
  
// function to list out all pokemons
  function getAll() {
    return repository;
  }
  //
  function addListItem(pokemon){
    //targeting class ul in html
    let repository = document.querySelector('.pokemon-list');
    // creating list inside ul
      let listItem = document.createElement('li');
      // creating buttons beside list item
      let button = document.createElement('button');
      //event listener for my addlist item
      button.addEventListener('click', showDetails(pokemon))
    
      // assigning text to my buttons with pokemon
      button.innerText = pokemon.name;
      //addinhg a class to my button for css styling
      button.classList.add('pokemon-button');
      // create new child pokemon
      listItem.appendChild(button);
      repository.appendChild(listItem);
      
  };
// function to show more details about pokemon
function showDetails(pokemon) {
  console.log(pokemon);
}
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
   
    //Add new pokemon
    pokemonRepository.add({
      name: 'Pidgey',
      height: 0.8,
      types: ['Pure', 'Flying']});

 // writing out pokemons using the foreach loop
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });

  