var numbers = [1,2,3,4,5,6,7,8,9,10,
				11,12,13,14,15,16,17,18,19,20,
				21,22,23,24,25,26,27,28,29,30,
				31,32,33,34,35,36,37,38,39,40,
				41,42,43,44,45,46,47,48,49,50,
				51,52,53,54,55,56,57,58,59,60,
				61,62,63,64,65,66,67,68,69,70,
				71,72,73,74,75,76,77,78,79,80,
				81,82,83,84,85,86,87,88,89,90];
var selectionsNumbers = [];

var message = {

	gameOver: "Juego terminado, f5 para empezar nuevamente"

}

var key = {

    SPACE: 32,
    F5: 116
};

var state = true;

function start(){

	document.addEventListener("keydown", keyboard);	


}

function fill(){

	if(selectionsNumbers.length>0){

		for (var i = 0; i < selectionsNumbers.length; i++) {

			if(i==(selectionsNumbers.length-1)){

				(document.getElementById(""+selectionsNumbers[i])).innerHTML = "<div>"+selectionsNumbers[i]+"</div>";

			}else{

			(document.getElementById(""+selectionsNumbers[i])).innerHTML = selectionsNumbers[i];
		
			}
		};

	}


}

function generateRandomNumber(min, max){

	return Math.floor(Math.random() * (max - min) + min);
}

function keyboard(event){

	var code = event.keyCode;

	if(code == key.SPACE && state == true){

		state = false;

		if(numbers.length>0){
		var number = generateRandomNumber(0,numbers.length);

		(document.getElementById("idMessage")).innerHTML = "<div>"+numbers[number]+"</div>";

		selectionsNumbers.push(numbers[number]);

		numbers.splice(number,1);

		fill();

		state = true;

		}else{

			state = false;
			(document.getElementById("idMessage")).innerHTML = "<div>"+message.gameOver+"</div>";

		}

	}

}	