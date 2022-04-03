
// creating pokemons inside a pokemon list; characters description from pokedex.org

 let pokemonList =  [
    {name: "Fearrow", height: 1.2, type: ["water", "speed"]}, 
    {name: "Ivysaur", height: 1, type: ["grass", "poison"]}, 
    {name: "Charmeleon", height: 1.1, type: ["love", "weather"]}
    ];

 // writing out the special pokemon's name with their height  

//for (let i = 0; i < pokemonList.length; i++){
  //  if(pokemonList[i].height >1.1){
    //        document.write( pokemonList[i].name + " (Height: " + pokemonList[i].height + ".)" + " - " + " Wow, that/'s big! " + "<br>");
      //    }else{
        //    document.write( pokemonList[i].name + " (Height: " + pokemonList[i].height + ".)" + "<br>"); 
        //}
   // }
    


// writing out pokemons using the foreach loop
    pokemonList.forEach(function(pokemon) {
      if(pokemon.height >1.1){
        document.write( pokemon.name + " (Height: " + pokemon.height + ".)" + " - " + " Wow, that/'s big! " + "<br>");
      }else{
        document.write( pokemon.name + " (Height: " + pokemon.height + ".)" + "<br>"); 
    }
  });