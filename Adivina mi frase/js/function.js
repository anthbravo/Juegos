var game = {

	show_hide_Phrase: false,
	message: undefined,
	attempts: undefined,	
	numberOfOpportunities: 0,
	phrase: "",
	advancePhrase: "",
	trying: "",
	state: 2,
	states: {
		ready: 1,
		wait: 2,
		gameOver: 3
	},
	letterReservation:{

		missing : "*",
	}


}

var message = {

	indications: "Completa la frase colocando letras en el cacillero Intentar y luego pulsa el boton PROBAR",
	win: "You Win",
	lose: "You lose",
	gameOver: "Aprieta F5 para empezar nuevamente"
}


function load(){

	game.message = obtainElement("idMessage");
	game.attempts = obtainElement("idAttempts");

	editMessage(message.indications);

}

function start(){

	var phrase = (obtainValueOfElement("idPhrase").trim()).toUpperCase();

	game.phrase = phrase;
	obtainElement("idPhrase").value = phrase;

	game.numberOfOpportunities = obtainValueOfElement("idNumberOfOpportunities");
	game.attempts.innerHTML = game.numberOfOpportunities;

	initializeAdvancePhrase();

	lockElement("idNumberOfOpportunities");
	lockElement("idPhrase");
	unlockElement("idTryOut");
	unlockElement("idTrying");
	unlockElement("idShow_hide_Phrase");
	lockElement("idStart");
}

function tryOut(){

	var phrase = game.phrase;

	var error = false;

	var trying = (obtainValueOfElement("idTrying").trim()).toUpperCase();

	game.trying = trying;
	obtainElement("idTrying").value = trying;

	if(game.trying!=""){
		var position =  (phrase).search(game.trying);

		if(position==-1){

			error = true;
		}

		while(position != -1){			

			for (var i = 0; i < game.trying.length; i++) {

				game.advancePhrase = updateAdvancePhrase(game.advancePhrase, position+i, game.trying[i]);
				phrase = updateAdvancePhrase(phrase, position+i, game.letterReservation.missing);
			};

			position = (phrase).search(game.trying);

		}

	}

	if(error){

		game.numberOfOpportunities --;
		game.attempts.innerHTML = game.numberOfOpportunities;
	}else{

		editAdvancePhrase(game.advancePhrase);
	}

	
	if(game.numberOfOpportunities==0){

		lose();
	}else{

		var win_lose = true;

		for (var i = 0; i < game.advancePhrase.length; i++) {


			if(game.advancePhrase[i]==game.letterReservation.missing){

				win_lose = false;
				break;
			}
		};

		if(win_lose){

			win();
		}

	}




}

function win(){

	editMessage(message.win + "<br/>" + message.gameOver);

}

function lose(){

	editMessage(message.lose + "<br/>" + message.gameOver);

}

function updateAdvancePhrase(word, position, letter){

	var newWord = "";

	for (var i = 0; i < word.length; i++) {
		
		if(position == i){
			newWord = newWord + letter;

		}else{

			newWord = newWord + word[i];
		}
	};

	return newWord;


}

function initializeAdvancePhrase(){

	var advancePhrase = "";


	if(game.advancePhrase == ""){

		for (var i = 0; i < (game.phrase).length; i++) {
			if((game.phrase)[i]!= " "){
				advancePhrase = advancePhrase + game.letterReservation.missing;
			}else{

				advancePhrase = advancePhrase + (game.phrase)[i];
			}
		};

		game.advancePhrase = advancePhrase;
		editAdvancePhrase(advancePhrase);
	}

}

function show_hide_Phrase(){
	if(game.show_hide_Phrase){

		obtainElement("idPhrase").value = game.phrase;
		game.show_hide_Phrase = false;

	}else{

		obtainElement("idPhrase").value = game.advancePhrase;
		game.show_hide_Phrase = true;
	}

}

function obtainValueOfElement(id){

	return document.getElementById(id).value;

}

function obtainElement(id){

	return document.getElementById(id);

}


function unlockElement(id){

	document.getElementById(id).disabled=false;

}

function lockElement(id){

	document.getElementById(id).disabled=true;

}

function editMessage(message){

	game.message.innerHTML = message;
}

function editAdvancePhrase(advancePhrase){

	obtainElement("idAdvancePhrase").innerHTML = advancePhrase;
}




