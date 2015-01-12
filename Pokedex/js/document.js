var pokedexNotDetected = new Pokemon("Pokemon no Detectado", 0, 0 , 
	"No tenemos datos de ese pokemon, capaz que es legendario o verifica la temporada en la que te encuentras");
var pikachu = new Pokemon("Pikachu", 100, 55, "Pika Pika!!");
var charmander = new Pokemon("Charmander", 80, 60, "Char Char!!");
var bulbasaur = new Pokemon("Bulbasaur", 90, 45, "Bulbasour!!");
var squirtle = new Pokemon("Squirtle", 95, 60, "Square Square!!");

var pokemons = [pikachu,charmander,bulbasaur,squirtle];


function Pokemon(name,life,attack,shout){
	this.name = name;
	this.life = life;
	this.attack = attack;
	this.shout = shout;
	prueba = "prueba";
	this.shoutOut = function(){

		alert(this.shout);
	}

}


function ready(){

	var pokemon;

	var election = pokemonElection.value;

	for (var i = 0; i < pokemons.length; i++) {
		
		if(pokemons[i].name.toLowerCase()==election.toLowerCase()){

			pokemonImage.src= "image/" + pokemons[i].name.toLowerCase() + ".jpg";

			pokemon = pokemons[i];

			console.warn(pokemons[i].name.toLowerCase());

			break;

		}else {

			pokemonImage.src= "image/pokedex.jpg";

			pokemon = pokedexNotDetected;
		}

	};	

	writes(pokemon);

}


function writes(pokemon){


	pokemonName.innerText= pokemon.name;
	pokemonData.innerText= "Tiene una vida de : " + pokemon.life + 
							" \n Tiene un ataque de : " + pokemon.attack ;

	pokemon.shoutOut();

}


