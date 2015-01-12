var opcionUsuario;
var opcionMaquina;
var resultado;

var opciones=["Piedra", "Papel", "Tijera", "Lagarto","Spock"];
var veredicto=["Ganas","Pierdes","Empatas"];

function aleatorio(minimo, maximo){

	return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);

}


function evaluar(opcion1, opcion2){

	//Opcion1 es evaluado para ver si gana o pierde o empata

	if(opcion1==opcion2){

		resultado = veredicto[2];

	}else if(opcion1 == opciones[0] && ((opcion2==opciones[2])||(opcion2==opciones[3]))){

		resultado = veredicto[0];

	}else if(opcion1 ==opciones[1] && ((opcion2==opciones[0])||(opcion2==opciones[4]))){

		resultado = veredicto[0];

	}else if(opcion1==opciones[2] && ((opcion2==opciones[1])||(opcion2==opciones[3]))){

		resultado = veredicto[0];

	}else if(opcion1==opciones[3] && ((opcion2==opciones[1])||(opcion2==opciones[4]))){

		resultado = veredicto[0];

	}else if(opcion1==opciones[4] && ((opcion2==opciones[0])||(opcion2==opciones[2]))){

		resultado = veredicto[0];

	}else{

		resultado = veredicto[1];

	}

}

opcionMaquina= opciones[aleatorio(0,4)];
opcionUsuario= opciones[prompt("¿Que eliges?\nPiedra: 0\nPapel: 1\nTijera: 2\nLagarto: 3\nSpock: 4",0)];

evaluar(opcionUsuario, opcionMaquina);

alert("Elegistes : " + opcionUsuario);
alert("JavaScript eligió :" + opcionMaquina);

alert("Resultado : "+ resultado);