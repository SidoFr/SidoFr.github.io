//elements
const boxes = document.querySelectorAll('.box');
const accueil = document.querySelector('.welcome');
const buttons = accueil.querySelectorAll('.btn');
const bye = document.querySelector('.result');
const results = bye.querySelector('p');
//variables
const itsAWin = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
	[0, 3, 6],
	[2, 5, 8],
	[1, 4, 7]
];
let gameBoard = [];
const X = 'X';
const O = 'O';
let computer;
let user;
let userFirst = false;
let userNext = false;
let endOfGame = false;
//functions*************************************************************
//**********************************************************************
//first: display welcome panel and handle user choice
accueil.style.display = 'flex';
function handleChoice(evt) {
	if(evt.target.classList.contains('userBtn')) {
		accueil.style.display = 'none';
		userFirst = true;
		startGame();
	}
	if(evt.target.classList.contains('compBtn')) {
		accueil.style.display = 'none';
		userNext = true;
		startGame();
	}
}
buttons.forEach(button=> button.addEventListener('click', handleChoice));
//game starts: settle board
function startGame() {
	//create board game
	gameBoard = Array.from(Array(9).keys());
	if(userFirst) {
		boxes.forEach(box=> box.addEventListener('click', handleClick));
	}
	if(userNext) {
		computerMove(0, 8);
	}
	function handleClick(evt) {
		if(userFirst) {
			player = X;
		}else if (userNext) {
			player = O;
		}
		if(evt.target.innerHTML === '') {
			handleTurn(evt.target, evt.target.id, player);
			if(!endOfGame) {
					computerMove(0, 8);
			}
		}
	}		
	//computer. random				
	function computerMove(min, max) {
		if(userFirst) {
			computer = O;
		}else if(userNext) {
			computer = X;
		}
		//get a random nb
		let random = Math.round(Math.random() * (max - min) + min + 1);
		const randomCell = document.querySelector(`.box:nth-child(${random})`);
		console.log(random);
		if(randomCell.innerHTML !== '') {
			computerMove(0, 8);
		}else {
			handleTurn(randomCell, randomCell.id, computer);
			if(!endOfGame) {
				boxes.forEach(box=> box.addEventListener('click', handleClick));
			}
		}
	}
}
function handleTurn(cell, cellId, player) {
	//change value of the played cell in gameBoard
	gameBoard[cellId] = player;
	cell.innerHTML = `${player}`;
	let win = checkWin(gameBoard, player);
	itsADraw(gameBoard);
	if(win !== null) {
		endOfGame = true;
		gameOver(win);
	}
}
function checkWin(board, player) {
	let count = 0;
	let win = null;
	//go through board & check all moves
	let moves = board.reduce((acc, current, index)=>
		//add each index of player's move to acc
		(current === player) ? acc.concat(index) : acc, []);
	for(let array of itsAWin) {
		//use every to check if an array 'win move' is prst in player's moves
			if(array.every(elem=> moves.indexOf(elem) > -1)) {
				//create a win obj with info we want to return
				 win = {
					player : player
				}
				break;
			}	
		}
	return win;	
	}
function gameOver(obj) {
	bye.style.display = 'flex';
	results.innerHTML = `And the winner is ${obj.player}!`;
	setTimeout(()=> location.reload(), 2000);
}
function itsADraw(board) {
	//check for empty cell
	if(board.every(cell=> typeof cell !== 'number')) {
			endOfGame = true;
			bye.style.display = 'flex';
			results.innerHTML = 'And it is a draw!';
			setTimeout(()=> location.reload(), 2000);
		}
	}
