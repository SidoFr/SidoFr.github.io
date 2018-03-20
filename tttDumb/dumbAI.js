	
//elements
const accueil = document.querySelector('.welcome');
const buttons = accueil.querySelectorAll('.btn');
const boxes = document.querySelectorAll('.box');
const end = document.querySelector('.result');
const result = end.querySelector('p');
//variables
let userFirst = false;
let userNext = false;
const X = 'X';
const O = 'O';
let endOfGame = false;
//display welcome box
accueil.style.display = 'flex';
//handle player choice
function handleChoice() {
	if(this.classList.contains('userBtn')) {
		accueil.style.display = 'none';
		userFirst = true;
		gameOn();
	}else if(this.classList.contains('compBtn')) {
		accueil.style.display = 'none';
		userNext = true;
		gameOn();
	}
}
//launch game
function gameOn() {
	const count = [];
	let userCount =[];
	let compCount = [];
	//moves array
	count.push(userCount, compCount);
	if(userFirst) {
		boxes.forEach(box=> box.addEventListener('click', play));
	}else if(userNext) {
		randomBox(1, 9);
	}
	//player
	function play() {
		if(userFirst && this.innerHTML === '') {
			this.innerHTML = `${X}`;	
		}else if(userNext && this.innerHTML === '') {
			this.innerHTML = `${O}`;
		}
		userCount.push('move');
		//check
		endGame(count);
		if(!endOfGame) {
			//set a delay for computer turn
			setTimeout(()=> {
				randomBox(1, 9);
			}, 1000);
		}else if(endOfGame) {
			end.style.display = 'flex';
			setTimeout(()=> {
				location.reload();
			}, 2000);
		}
	}
	//computer(random)
	function randomBox(min, max) {
		//get a random nb
		let random = Math.round(Math.random() * (max - min) + min).toString();
		//fill the box
		const randomChoice = document.querySelector(`.box:nth-child(${random})`);
		if(randomChoice.innerHTML !== '') {
			randomBox(1, 9);
			}else {
				if(userFirst) {
					randomChoice.innerHTML = `${O}`;
				}
				else if(userNext) {
					randomChoice.innerHTML = `${X}`;
				}
				compCount.push('moove');
				//check
				endGame(count);
				if(!endOfGame) {
					//listen to user click
					boxes.forEach(box=> box.addEventListener('click', play));
				}else if(endOfGame) {
					end.style.display = 'flex';
					setTimeout(()=> {
						location.reload();
					}, 2000);
				}
			} 
	}
	//end game
	function endGame(array) {
		if(array[0].length + array[1].length === 9) {
			endOfGame = true;
		}else {
			return;
		}
	}
}
//event listeners
buttons.forEach(button=> button.addEventListener('click', handleChoice));
