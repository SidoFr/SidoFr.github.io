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
	let toPlay = []; //tableau des coups ai A jouer
	let played = []; //tableau des coups ai joués
	let player = []; //tableau des coups joueur
	let count = 0;
	let index = 0;
	//flags
	let gameOn = false;
	let strict = false;
	let normalMode = false;
	let playerTurn = false;
	//fn
	function startGame() { 
		endPop.style.display = 'none';
		if(power.innerHTML === 'ON') {
			power.innerHTML = 'OFF';
			gameOn = true;
			computerSequence(20, 0, 3);
		}else {
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
	//AI plays its sequence
	function playSequence(sequence) { //console.log(sequence)
			toPlay.push(sequence[index]); 
			//debugger;
			let i =0; 
			toPlay.forEach((color, i)=> {
				setTimeout(()=> {
					changeColor(color);
					played.push(color);
				}, i* 700); //i have to increment delay because of the for loop
			i++;
			});
			index ++;
	}
	//AI plays again sequence if player fails on normal mode
	function playAgain(sequence) {
		let i = 0;
		played.length = sequence.length;
		sequence.forEach((color, i)=> {
			setTimeout(()=> {
				changeColor(color);
			}, i* 700);
		i++;
		});
	}
	//check fn. compare player's sequence and ai's one
	function check(array1, array2) {
			const entries = Array.from(array2.entries()); 
			if(entries.every(([index, elem])=> array1[index] === elem)) { 
				player.length = 0;
				count++;
				onScreen(count);
				success();
				setTimeout(()=> playSequence(sequence), 1500);
			}else { 
				player.length = 0;
				fail();
			}	
	}
	//strict mode when fail
	function newStrict() {
		const newSequence = computerSequence(20, 0, 3);
		setTimeout(()=> playSequence(newSequence), 1500);
	}
	//fail, handle two cases
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
		played.length = 0;
		player.length = 0;
		toPlay.length = 0;
		count = 0;
		onScreen(count);
	}
	function success() {
		if(count === 20) {
			endPop.style.display = 'flex';
		}
	}
	//
	function changeColor(color) { 
		if(color === 'vert') {
			green.style.borderTopColor = 'rgba(0, 255, 0, 1)';
			green.style.borderLeftColor = 'rgba(0, 255, 0, 1)';
			one.load(); //if not, sound only played once
			one.play();
			one.currentTime = 0;
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
	//
	function onScreen(count) {
		count < 10 ? screen.innerHTML = '0' + count : screen.innerHTML = count;
	}
	//event listeners
	touche.forEach(elem=> elem.addEventListener('click', (evt)=> { 
		console.log(played.length, toPlay.length)
		if(played.length === toPlay.length) {
			playerTurn = true;
			played.length = 0;
		}
		if(gameOn && playerTurn) {
			let coup = evt.target.id;
			changeColor(coup);
			player.push(coup);	
		}else if(!playerTurn) {
			return;
		}
		if(player.length === toPlay.length) { 
			playerTurn = false;
			check(player, toPlay);			
		}
	})); 
	power.addEventListener('click', startGame);
	start.addEventListener('click', ()=> { 
		if(!normalMode) { //if 1st game
			endPop.style.display = 'none';
			normalMode = true;
			setTimeout(()=> playSequence(sequence), 1000);
		}else if(normalMode) { //if player click again on start: shuffle and start again
			setTimeout(()=> clear());
			let shuffled = shuffle(sequence);
			setTimeout(()=> playSequence(shuffled), 1000);
		}
	});
	strictBtn.addEventListener('click', ()=> {
		if(strict) {
			strict = false;
			strictBtn.style.backgroundColor = 'buttonface';
		}
		else {
			strict = true;
			strictBtn.style.backgroundColor = 'red';
		}	
	});
	buttons.forEach(btn=> btn.addEventListener('mousedown', (evt)=> evt.target.classList.toggle('onclick')));
	buttons.forEach(btn=> btn.addEventListener('mouseup', (evt)=> evt.target.classList.toggle('onclick')));
}
