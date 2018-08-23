let canv=document.getElementById("gc");
let ctx=canv.getContext("2d");

let coinsGained=0;

if (localStorage.getItem("speed")==null) {
	localStorage.setItem("speed", 150);

}

if (localStorage.getItem("coins")==null) {
	localStorage.setItem("coins", 0);

}



let coinsHad= parseInt(localStorage.getItem("coins"));



let foodColor=(Math.floor(Math.random() * 5));
let foodColorString;
let foodType=(Math.floor(Math.random() * 3));

let speed = localStorage.getItem("speed");

let snakeSize = 10;
let w = 351;
let h = 351;

let score = 0;

let snake;
let food=[];

const LEFT_KEY = 97;
const RIGHT_KEY = 100;
const UP_KEY = 119;
const DOWN_KEY = 115;

let leftDirection = false;
let rightDirection = true;
let downDirection = false;
let upDirection = false;

let x = [];
let y = [];

window.addEventListener("keypress",function(){
	let key = event.keyCode;
	switch (key) {
		case LEFT_KEY:
		if (!rightDirection) {leftDirection = true;
			rightDirection = false;
			downDirection = false;
			upDirection = false;}

			break;
		case RIGHT_KEY:
		if (!leftDirection) {leftDirection = false;
			rightDirection = true;
			downDirection = false;
			upDirection = false;}

			break;
		case UP_KEY:
		if (!downDirection) {leftDirection = false;
			rightDirection = false;
			downDirection = false;
			upDirection = true;}

			break;
		case DOWN_KEY:
		if (!upDirection) {leftDirection = false;
			rightDirection = false;
			downDirection = true;
			upDirection = false;}

			break;
}})

function init()
{
	createSnake();
  	drawSnake();
  	update();
	setInterval(update, speed);
	createFood();
	drawFood();

}
function update()
{
	ctx.clearRect(0,0,w,h);
	ctx.strokeRect(0,0,w,h);
	move();
	drawSnake();
	drawFood();
	checkFoodCollision();


}

function createSnake()
{
	let dots = 5;


	for (let z = 0; z < dots;z++)
	{
		x[z] = 70 - z*10;
		y[z] = 50;
	}
}




function drawSnake()
{
	for (let i = 0; i < x.length; i++)
	{
		ctx.fillRect(x[i],y[i],snakeSize,snakeSize);

	}


}
function move()
{

	for(let i = x.length-1; i >= 1; i--)
	{

		x[i]=x[i-1];
		y[i]=y[i-1];
	}





	if(leftDirection == true){
		x[0] -=10;


	}else if(rightDirection == true){
		x[0]+=10;


	}else if(downDirection == true){
		y[0] +=10;


	}else if(upDirection == true){
		y[0] -=10;

	}
	checkBord();

}
function checkBord()
{
	for (let i = 1; i < x.length; i++)
	{
		if(x[0]==x[i] && y[0]==y[i])
		{
			
			die();
		}

	}


	if (x[0]>=350) {
		die();
	}
	if (y[0]>=350) {
		die();
	}
	if (x[0]<=-1) {
		die();
	}
	if (y[0]<=-1) {
		die();
	}
		


function drawFood() {
	ctx.fillStyle = foodColorString;
	ctx.fillRect(food[0],food[1], 10, 10);
	ctx.fillStyle = "black";
}

function createFood()
{
	foodColor=(Math.floor(Math.random() * 5));
	switch (foodColor) {
		case 0:
		foodColorString = "blue";
		break;
		case 1:
		foodColorString = "red";
		break;
		case 2:
		foodColorString = "green";
		break;
		case 3:
		foodColorString = "purple";
		break;
		case 4:
		foodColorString = "orange";
		break;
		default:
		console.log("error unable to determine food color")
		break;





	}
	food[0]=(Math.floor(Math.random() * 33))*10;
	food[1]=(Math.floor(Math.random() * 33))*10;
	console.log(food[0]+food[1]);
  if (food[0]&10==0)
	{

	}


}
function checkFoodCollision()
{
	if(x[0]==food[0]&&y[0]==food[1])
	{
		if (foodType==0) {
			x.splice(x.length-1, 1);
			y.splice(y.length-1, 1);
			score--;

		}else if(foodType>= 2){
			x[x.length] = x[x.length - 1] + 10;
			y[y.length] = y[y.length - 1] + 10;
			score++;
		}else if(foodType==1){
			for(let i = 0; i<10;i++){
				
					x[x.length] = x[x.length - 1] + 10;
					y[y.length] = y[y.length - 1] + 10;


				
			}
			score+=10;
		}
		createFood();
		
		
		document.getElementById("score").innerHTML = "Score: "+score;
		foodType=(Math.floor(Math.random() * 8));
	}

}
function die()
{
	if (score<=10)
	{
		coinsGained=0;

	}else {
		coinsGained=score-10;

	}
	alert("You died :( coins gained: "+coinsGained);
	localStorage.setItem("coins",coinsGained+coinsHad);
	window.location.replace("./index.html");


}
