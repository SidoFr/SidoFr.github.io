//get elements
const bkButton = document.querySelector('.breakBtn');
const sessionButton = document.querySelector('.sessionBtn');
const bkSpan = document.querySelector('.pause');
const sessSpan = document.querySelector('.work');
const bkInput = document.querySelector('.bkForm');
const sessInput = document.querySelector('.sessForm');
const sablier = document.querySelector('.sablier');
const sound = document.querySelector('.audio');
//variables
let countdown;
let animInterval;
//
function setTimer(timer, evt) {
	//clear if needed
	clearInterval(countdown);
	const now = Date.now(); //ms
	const then = now + (timer * 60000); //convert mn in ms
	//display timer duration
	displayTimeLeft(timer * 60);
	//set interval of 1sec
	countdown = setInterval(()=> {
		const timeLeft = Math.round((then - Date.now()) / 1000); //in seconds
		if(timeLeft <= 0) {
			clearInterval(countdown);
		}
		//display time left
		displayTimeLeft(timeLeft);
		playSound(timeLeft);
	}, 1000);
	//display fn
	function displayTimeLeft(time) {
		//convert in mn
		const minutes = Math.floor(time / 60);
		//seconds = the remainder
		const seconds = time % 60;
		const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		//display on page
		if(evt.target === bkButton || evt.target === bkInput) {
			sessSpan.innerHTML ='';
			bkSpan.innerHTML = display;
		}
		if(evt.target === sessionButton || evt.target === sessInput) {
			bkSpan.innerHTML = '';
			sessSpan.innerHTML = display;
		} 
		//display on title
		document.title = display;
	}
	//play sound
	function playSound(time) {
	if(time === 0) {
		sound.play();
	}
}
}
function animateGlass(time) {
	//init
	clearInterval(animInterval);
	sablier.style.borderBottomColor = '#ffcd38';
	sablier.style.borderTopColor = '#ffcd38';
	let degree = 0;
	let t = time * 60;
	//set an interval for time
	const timerInterval = setInterval(()=> {
		t -= 1;
		//when timer ends
		if(t === 0) {
			clearInterval(animInterval);
			sablier.style.transform = 'rotate(0)';
			sablier.style.transform = 'scale(1.5)';
			sablier.style.borderBottomColor = '#4a4a4a';
			sablier.style.borderTopColor = '#4a4a4a';
		}
	}, 1000);
	//set an interval for animation
	animInterval = setInterval(()=> { 
		sablier.style.transform = `rotate(${degree}deg)`;
		degree += 3;
	}, 1000);
}

//event listeners
bkButton.addEventListener('click',(evt)=> {
	setTimer(5, evt);
	animateGlass(5);
});
sessionButton.addEventListener('click', (evt)=> {
	setTimer(25, evt);
	animateGlass(25);
});
bkInput.addEventListener('submit', function(evt) {
	evt.preventDefault();
	const timer = this.break.value;
	setTimer(timer, evt);
	animateGlass(timer);
	//clear
	this.break.value = '';
});
sessInput.addEventListener('submit', function(evt) {
	evt.preventDefault();
	const timer = this.session.value;
	setTimer(timer, evt);
	animateGlass(timer);
	//clear
	this.session.value = '';
});
