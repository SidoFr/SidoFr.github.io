window.onload = init;
function init() {
	//DOM
	//pad
	const touche = document.querySelectorAll('.triangle');
	const green = document.querySelector('#vert');
	const red = document.querySelector('#rouge');
	const yellow = document.querySelector('#jaune');
	const blue = document.querySelector('#bleu');
	//buttons
	const command = document.querySelector('.center');
	const buttons = command.querySelectorAll('.btn');
	const power = command.querySelector('#on');
	const start = command.querySelector('#start');
	const strictBtn = command.querySelector('#strict');
	//sound
	const one = document.querySelector('#one');
	const two = document.querySelector('#two');
	const three = document.querySelector('#three');
	const four = document.querySelector('#four');
	const error = command.querySelector('#err');
	//else
	const screen = command.querySelector('#count');
	const endPop = document.querySelector('#success');
	//variables
	let sequence = [];
	let aiPlay;
	let toPlay = []; //tableau des coups ai A jouer
	let player = []; //tableau des coups joueur
	let count = 0;
	let index = 0;
	//flags
	let gameOn = false;
	let strict = false;
	let normalMode = false;
	//fn
	function startGame() { 
		endPop.style.display = 'none';
		if(power.innerHTML === 'ON') {
			power.innerHTML = 'OFF';
			gameOn = true;
			computerSequence(20, 0, 3);
		}else { //close game
			power.innerHTML = 'ON';
			gameOn = false;
			location.reload();
		}
	}
	//create an array of 20 colors
	//only random create to much iteration of the same color
	// I chose to shuffle my random array with Fisher-Yates algo
	function computerSequence(size, min, max) {
		for(let i = 0; i < size; i++) {
			let random = Math.round(Math.random() * (max - min) + min);
				if(random === 0) 
					sequence.push('vert');
				if(random === 1) 
					sequence.push('rouge');
				if(random === 2) 
					sequence.push('jaune');
				if(random === 3) 
					sequence.push('bleu');
		}
		shuffle(sequence);
		return sequence;
	}
	function shuffle(array) { // thx to Blender @stackoverflow for this neat version of the algo
		let counter = array.length;
		while(counter > 0) {
			//pick random index
			let index = Math.round(Math.random() * counter);
			counter --;
			//swap
			let temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	}
	//computer plays
	//AI plays sequence
	function playSequence(sequence) { console.log(sequence)
		toPlay.push(sequence[index]); 
		let i = 0;
		aiPlay = setInterval(()=> {
			changeColor(toPlay[i]);
			i++;
			if(i === toPlay.length) {
				clearInterval(aiPlay);
			}
		}, 800);
		index ++;
		//player can now click
		const timer = 800 * toPlay.length;
		setTimeout(()=> {
			touche.forEach(pad=> {
			pad.classList.remove('neutre');
			pad.classList.add('cliquable');
		});	
		}, timer);
	}
	//AI plays again sequence if player fails on normal mode
	function playAgain(sequence) {
		let i = 0;
		aiPlay = setInterval(()=> {
			changeColor(sequence[i]);
			i++;
			if(i === sequence.length) {
				clearInterval(aiPlay);
			}
		}, 800);
		const timerTwo = 800 * sequence.length;
		setTimeout(()=> {
			touche.forEach(pad=> {
			pad.classList.remove('neutre');
			pad.classList.add('cliquable');
		});	
		}, timerTwo);
	}
	//fail on strict mode
	function newStrict() {
		const newSequence = computerSequence(20, 0, 3);
		setTimeout(()=> playSequence(newSequence), 1500);
	}
	//check fn. (to compare player's sequence and computer's)
	function check(array1, array2) {
			const entries = Array.from(array2.entries()); 
			if(entries.every(([index, elem])=> array1[index] === elem)) { 
				player.length = 0;
				count++;
				onScreen(count);
				let win = success();
				if(!win) {
					setTimeout(()=> playSequence(sequence), 1500);
				}	
			}else { 
				player.length = 0;
				fail();
			}	
	}
	function fail() {
		if(strict) { 
			screen.innerHTML ='fail :(';
			error.load();
			error.play();
			count = 0;
			setTimeout(()=> onScreen(count), 1000);
			toPlay.length = 0;
			sequence = [];
			newStrict();
		}else {
			screen.innerHTML = 'oops!';
			setTimeout(()=> {
				onScreen(count);
				playAgain(toPlay);
			}, 1500);
		}
	}function clear() {
		player.length = 0;
		toPlay.length = 0;
		count = 0;
		onScreen(count);
	}
	function onScreen(count) {
		count < 10 ? screen.innerHTML = '0' + count : screen.innerHTML = count;
	}
	function success() {
		if(count === 20) {
			endPop.style.display = 'flex';
			return true;
		}
	}
	//play colors and sounds
	function changeColor(color) { 
		if(color === 'vert') {
			green.style.borderTopColor = 'rgba(0, 255, 0, 1)';
			green.style.borderLeftColor = 'rgba(0, 255, 0, 1)';
			one.load(); //if not, sound only played once
			one.play();
			setTimeout(()=> {
				green.style.borderTopColor = 'green'; 
				green.style.borderLeftColor = 'green';
			}, 500);	
		}
		if(color === 'rouge') {
			red.style.borderTopColor = 'red';
			red.style.borderRightColor = 'red';
			two.load(); //if not, sound only played once
			two.play();
			setTimeout(()=> {
				red.style.borderTopColor = 'rgb(200, 0, 0)'; 
				red.style.borderRightColor = 'rgb(200, 0, 0)';
			}, 500);	
		}
		if(color === 'jaune') {
			yellow.style.borderBottomColor = 'rgb(230, 255, 20)';
			yellow.style.borderRightColor = 'rgb(230, 255,20)';
			three.load(); //if not, sound only played once
			three.play();
			setTimeout(()=> {
				yellow.style.borderBottomColor = 'rgb(250, 250, 100)'; 
				yellow.style.borderRightColor = 'rgb(250, 250, 100)';
			}, 500);	
		}
		if(color === 'bleu') {
			blue.style.borderBottomColor = 'blue';
			blue.style.borderLeftColor = 'blue';
			four.load(); //if not, sound only played once
			four.play();
			setTimeout(()=> {
				blue.style.borderBottomColor = 'rgb(0,0, 180)'; 
				blue.style.borderLeftColor = 'rgb(0,0, 180)';
			}, 500);	
		}
	}
	//event listeners
	touche.forEach(elem=> elem.addEventListener('click', (evt)=> { 
		let coup = evt.target.id;
		changeColor(coup);
		player.push(coup);	
		if(player.length === toPlay.length) { 
			check(player, toPlay);
			//player cannot click pad
		touche.forEach(pad=> {
			pad.classList.remove('cliquable');
			pad.classList.add('neutre');
		});		
		}
	})); 
	power.addEventListener('click', startGame);
	start.addEventListener('click', ()=> { 
		if(gameOn) {
			if(!normalMode) { //if 1st game
				normalMode = true;
				setTimeout(()=> playSequence(sequence), 1000);
			}else if(normalMode) { //if player click again on start: shuffle and start again
				clearInterval(aiPlay);
				clear();
				let shuffled = shuffle(sequence);
				setTimeout(()=> playSequence(shuffled), 1000);
			}
		}
	});
	strictBtn.addEventListener('click', ()=> {
		if(gameOn) {
			if(strict) {
				strict = false;
				strictBtn.style.backgroundColor = 'buttonface';
			}
			else {
				strict = true;
				strictBtn.style.backgroundColor = 'red';
				strictBtn.style.color = 'white';
			}
		}		
	});
	buttons.forEach(btn=> btn.addEventListener('mousedown', (evt)=> evt.target.classList.toggle('onclick')));
	buttons.forEach(btn=> btn.addEventListener('mouseup', (evt)=> evt.target.classList.toggle('onclick')));
}
