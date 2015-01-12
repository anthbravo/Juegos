var messages = {

	start_title : "Elige la dificultad y Pulsa Start para empezar! - recuerda ponerte sobre la bomba para desactivarla!",
	start_canvas : "Controles: ←, ↑, ,↓, → (movimientos), space (Desactivar Bomba)",
	lose_title : "LIZ: JAJAJJAJA ESTE JUEGO TERMINO PARA TI MUAJAJA...",
	win_title : "TIFIS: GRACIAS POR SALVAR AL MUNDO Y A MI XD",
	lose_canvas : "GAME OVER",
	win_canvas : "YOU WIN",
	bomb_time : "Tiempo Explosión (S) : ",
	bomb_number : " - Bombas : "

}

var key = {

    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    space: 32
};

var anthbravo = {

	wait : new Image(),
	wait_cartoons : 3,
	wait_position : 1,
	walk : new Image(),
	walk_cartoons : 4,
	walk_position : 1,
	prevent_explosion : new Image(),
	prevent_explosion_cartoons : 4,
	prevent_explosion_position : 1,
	states : ["wait", "walk", "prevent_explosion"],
	state : "wait",
	canvas_x : 0,
	canvas_y : 0

}

var bomb= {

	bomb_wait : new Image(),
	bomb_wait_cartoons :  4,
	bomb_wait_position : 1,
	bomb_explosion : new Image(),
	bomb_explosion_cartoons : 5,
	bomb_explosion_position : 1,
	states : ["bomb_wait", "bomb_explosion"],
	state : "bomb_wait",
	canvas_x : 50,
	canvas_y : 50

}

var game = {

	canvas : undefined,
	context : undefined,
	progress : undefined,
	advance_progress : 0,	
	loadImage : 6,
	background : new Image(),
	with_general_for_image : 50,
	height_general_for_image : 50,
	number_of_bomb : 0,
	time_for_explosion_bomb : 0,
	speed : 50,
	first_screen : undefined,
	second_screen : undefined,
	message : undefined,
	drawing : undefined,
	timing : undefined,
	bomb_time : -1,
	bomb_number : -1,
	states : ["start", "win", "lose", "wait"],
	state : "wait",
	obstacles : [[200, 250, 0, 250],[0, 150, 200, 250],[150, 500, 350, 400]]
}

function loadGame(){

	game.first_screen = document.getElementById("idFirstScreen");
	game.second_screen = document.getElementById("idSecondScreen");
	game.time_for_explosion_bomb = document.getElementById("idTimeForExplosion");
	game.message = document.getElementById("idMessage");
	game.progress = document.getElementById("idProgress");
	game.canvas = document.getElementById("idCanvas");
	game.context = game.canvas.getContext("2d");	

	//Se simula una carga con la etiqueta progress
	game.background.src= "https://raw.githubusercontent.com/anthbravo/Tarea4/master/image/background.png";
	game.background.onload = setTimeout(updateProgress,500);

	anthbravo.wait.src= "https://raw.githubusercontent.com/anthbravo/Tarea4/master/image/wait.png";
	anthbravo.wait.onload = setTimeout(updateProgress,1000);

	anthbravo.walk.src= "https://raw.githubusercontent.com/anthbravo/Tarea4/master/image/walk.png";
	anthbravo.walk.onload = setTimeout(updateProgress,1500);

	anthbravo.prevent_explosion.src= "https://raw.githubusercontent.com/anthbravo/Tarea4/master/image/prevent_explosion.png";
	anthbravo.prevent_explosion.onload = setTimeout(updateProgress,2000);

	bomb.bomb_wait.src= "https://raw.githubusercontent.com/anthbravo/Tarea4/master/image/bomb_wait.png";
	bomb.bomb_wait.onload = setTimeout(updateProgress,2500);

	bomb.bomb_explosion.src= "https://raw.githubusercontent.com/anthbravo/Tarea4/master/image/bomb_explosion.png";
	bomb.bomb_explosion.onload = setTimeout(updateProgress,3000);
	//--------------------------------------------------------------

	
}

function start(){

	alert("GO!!");

	//Inicializo todo, y mato Hilos
	initialize();

	document.addEventListener("keydown", keyboard);	

	//Cambio estado de juego
	game.state = game.states[0];

	//Empieza a dibujar de forma constante
	game.drawing = setInterval(drawImage,300);

	//Inicializa ubicacion de bomba
	generateBomb();

	//Empieza controlador de tiempo de bombas
	game.timing = setInterval(time,1000);

	//document.removeEventListener("keydown", keyboard);
	//clearInterval();


}

function keyboard(event){

	var code = event.keyCode;

	if(code == key.UP || code == key.DOWN || code == key.LEFT || code == key.RIGHT){

		if(code == key.UP)
	    {

	    	if(preventObstacles(anthbravo.canvas_x, anthbravo.canvas_x+game.with_general_for_image, 
	    		anthbravo.canvas_y-game.speed, anthbravo.canvas_y+game.height_general_for_image-game.speed)){

		    	anthbravo.state = anthbravo.states[1];
		       	anthbravo.canvas_y-=game.speed;
	       
	       }
	    }
	    if(code == key.DOWN)
	    {

	    	if(preventObstacles(anthbravo.canvas_x, anthbravo.canvas_x+game.with_general_for_image, 
	    		anthbravo.canvas_y+game.speed, anthbravo.canvas_y+game.height_general_for_image+game.speed)){

		    	anthbravo.state = anthbravo.states[1];
		     	anthbravo.canvas_y+=game.speed;

		     }
	    }
	    if(code == key.LEFT)
	    {	

	    	if(preventObstacles(anthbravo.canvas_x-game.speed, anthbravo.canvas_x+game.with_general_for_image-game.speed, 
	    		anthbravo.canvas_y, anthbravo.canvas_y+game.height_general_for_image)){

		    	anthbravo.state = anthbravo.states[1];
		        anthbravo.canvas_x-=game.speed;

		     }
	    }
	    if(code == key.RIGHT)
	    {

	    	if(preventObstacles(anthbravo.canvas_x+game.speed, anthbravo.canvas_x+game.with_general_for_image+game.speed, 
	    		anthbravo.canvas_y, anthbravo.canvas_y+game.height_general_for_image)){

		    	anthbravo.state = anthbravo.states[1];
		        anthbravo.canvas_x+=game.speed;
	    
	    	}
	    }

	}

    if(code == key.space)
    {
    	anthbravo.state = anthbravo.states[2];

    	if(anthbravo.canvas_x ==bomb.canvas_x && anthbravo.canvas_y == bomb.canvas_y){

    		game.bomb_number --;

    		if(game.bomb_number == 0){

    			win();
    		}else {

    			game.bomb_time = game.time_for_explosion_bomb;
    			//Genero ubicacion de nueva bomba
    			generateBomb();

    		}

    	}

    }

}

function time(){

	if(game.bomb_time!=-1){

		editMessage(messages.bomb_time + game.bomb_time + messages.bomb_number + game.bomb_number);
		game.bomb_time--;		

	}	

	if(game.bomb_time==0){

		lose();

	}

	

}

//Recibe de parametros Punto inicio X, Punto final X, Punto Inicio Y, Punto Final Y(de imagen a evaluar)
//Punto inicio X, Punto final X, Punto Inicio Y, Punto Final Y(de Obstaculo) 
//Devuelve true si paso validación
function preventObstacles(canvas_xa, canvas_xb, canvas_ya, canvas_yb){

	var validate = true;

	var canvas_x1, canvas_x2, canvas_y1, canvas_y2;

	if(canvas_xa<0 || canvas_xa>=game.background.width || 
		canvas_ya<0 || canvas_ya>=game.background.height){

		validate = false;

	}else{

		for (var i = game.obstacles.length - 1; i >= 0; i--) {

			canvas_x1 = game.obstacles[i][0];
			canvas_x2 = game.obstacles[i][1];
			canvas_y1 = game.obstacles[i][2];
			canvas_y2 = game.obstacles[i][3];


			if(
				((canvas_xa==canvas_x1 && canvas_xb==canvas_x2) && 
				(canvas_ya>=canvas_y1 && canvas_yb<=canvas_y2))
				)
			{

				validate = false;
			}else if(
					((canvas_xa>=canvas_x1 && canvas_xb<=canvas_x2) && 
					(canvas_ya==canvas_y1 && canvas_yb==canvas_y2))
					)
			{

				validate = false;

			}

		};

	}

	return validate;

}

function generateBomb(){

	number_of_square_x = game.background.width/game.with_general_for_image;
	number_of_square_y = game.background.height/game.height_general_for_image;

	while(true){

		x = generateRandomNumber(1, number_of_square_x) * game.with_general_for_image;
		y = generateRandomNumber(1, number_of_square_y) * game.height_general_for_image;

		if(preventObstacles(x, x + game.with_general_for_image,y , y + game.height_general_for_image)){

			bomb.canvas_x = x;
			bomb.canvas_y = y;
			break;

		}

	}


}

function generateRandomNumber(min, max){

	return Math.floor(Math.random() * (max - min) + min);
}


function win(){

	editTitle(messages.win_title)	
	editMessage(messages.win_canvas);
	end();

	(document.getElementById("idStart")).disabled = false;

}

function lose(){

	bomb.state = bomb.states[1];
	editTitle(messages.lose_title)
	editMessage(messages.lose_canvas);
	end();

	(document.getElementById("idStart")).disabled = false;

}

function end(){

	document.removeEventListener("keydown", keyboard);
	
	if(game.timing!=undefined){

		clearInterval(game.timing);
		
	}

}

function initialize(){

	editTitle(messages.start_title);

	(document.getElementById("idStart")).disabled = true;

	game.number_of_bomb = (Number)((document.getElementById("idNumberOfBomb")).value);
	game.time_for_explosion_bomb = (Number)((document.getElementById("idTimeForExplosion")).value);

	game.bomb_time = game.time_for_explosion_bomb;
	game.bomb_number = game.number_of_bomb;

	anthbravo.state = anthbravo.states[0];
	bomb.state = bomb.states[0];
	
	anthbravo.canvas_x = 0;
	anthbravo.canvas_y = 0; 

	end();

	if(game.drawing!=undefined){

		clearInterval(game.drawing);
		
	}

}


function editTitle(message){

	game.message.innerHTML = message;

}

function editMessage(message){

	game.context.beginPath(); 
	game.context.fillStyle   = "black";
	game.context.strokeStyle = "black";
	game.context.fillRect(0,500,500,50);
	game.context.lineWidth  = 3;
	game.context.fill();
	game.context.stroke();

	game.context.beginPath();
	game.context.fillStyle = "white"; 
	game.context.textAlign = "center";
	game.context.textBaseline = "middle";
	game.context.font = "15px Comic Sans MS";
	game.context.fillText(message,250,510);
}


function updateProgress(){

	if(game.loadImage>game.advance_progress){

		game.advance_progress++;

		var interval_progress = 100/game.loadImage;

		game.progress.value = game.advance_progress * interval_progress;
		game.progress.title = (game.advance_progress * interval_progress)+"%";

		if (game.loadImage == game.advance_progress){
		
			alert("Carga completa!");
			
			game.first_screen.style.visibility = 'hidden';
			game.second_screen.style.visibility = 'visible';

			game.context.drawImage(game.background, 0, 0);

			editTitle(messages.start_title);
			editMessage(messages.start_canvas);

		}

	}
}

function drawImage(){
	
	game.context.drawImage(game.background, 0, 0);


	if(bomb.state == bomb.states[0]){

		drawMovingImage(bomb.bomb_wait, bomb.canvas_x, bomb.canvas_y, bomb.bomb_wait_cartoons, bomb.bomb_wait_position);

		if(bomb.bomb_wait_cartoons>bomb.bomb_wait_position){

			bomb.bomb_wait_position++;

		}else if(bomb.bomb_wait_cartoons==bomb.bomb_wait_position){

			bomb.bomb_wait_position = 1;
		}

	}else if(bomb.state == bomb.states[1]){

		drawMovingImage(bomb.bomb_explosion, bomb.canvas_x, bomb.canvas_y, bomb.bomb_explosion_cartoons, bomb.bomb_explosion_position);

		if(bomb.bomb_explosion_cartoons>bomb.bomb_explosion_position){

			bomb.bomb_explosion_position++;

		}else if(bomb.bomb_explosion_cartoons==bomb.bomb_explosion_position){

			bomb.bomb_explosion_position = 1;
		}

	}	


	if(anthbravo.state == anthbravo.states[0]){

		drawMovingImage(anthbravo.wait, anthbravo.canvas_x, anthbravo.canvas_y, anthbravo.wait_cartoons, anthbravo.wait_position);

		if(anthbravo.wait_cartoons>anthbravo.wait_position){

			anthbravo.wait_position++;

		}else if(anthbravo.wait_cartoons==anthbravo.wait_position){

			anthbravo.wait_position = 1;
		}

	}else if(anthbravo.state == anthbravo.states[1]){

		drawMovingImage(anthbravo.walk, anthbravo.canvas_x, anthbravo.canvas_y, anthbravo.walk_cartoons, anthbravo.walk_position);

		if(anthbravo.walk_cartoons>anthbravo.walk_position){

			anthbravo.walk_position++;

		}else if(anthbravo.walk_cartoons==anthbravo.walk_position){

			anthbravo.walk_position = 1;
		}

	}else if(anthbravo.state == anthbravo.states[2]){

		drawMovingImage(anthbravo.prevent_explosion, anthbravo.canvas_x, anthbravo.canvas_y, anthbravo.prevent_explosion_cartoons, anthbravo.prevent_explosion_position);

		if(anthbravo.prevent_explosion_cartoons>anthbravo.prevent_explosion_position){

			anthbravo.prevent_explosion_position++;

		}else if(anthbravo.prevent_explosion_cartoons==anthbravo.prevent_explosion_position){

			anthbravo.prevent_explosion_position = 1;
		}

	}

}



function drawMovingImage(image, canvas_x, canvas_y, cartoons, position){

	//Tamaño WITH como se dividara en la imagen original
	var interval_with = image.width/cartoons;

	//Posicion incial X que se tomara le imagen original
	var source_x = interval_with * (position-1);
	//Posicion incial X que se tomara le imagen original(Se coje desde la posicion inicial)
	var source_y = 0;

	//Tamaño WITH como se dividara en la imagen original
	var source_with = interval_with;
	//Tamaño HEIGHT como se dividara en la imagen original(No se altera de la original)
	var source_height = image.height;

	var canvas_with = game.with_general_for_image;
	var canvas_height = game.height_general_for_image;
	

	game.context.drawImage(image, source_x, source_y, source_with, source_height
		,canvas_x, canvas_y, canvas_with, canvas_height);




}