window.onload = function init() {
	let countdown;
	const left = document.querySelector('.time_left');
	const words = document.querySelector('.words');
	const works = document.querySelectorAll('.work');
	const pauses = document.querySelectorAll('.pause');
	//TIMER FN
	function timer(seconds) {
		//first clear any existing timer
		clearInterval(countdown);
		//get current time in ms
		const now = Date.now();
		const then = now + (seconds * 1000);
		//
		//call fn so that it displays time left from the 1st second
		displayTimeLeft(seconds);
		//
		//time left displayed every seconds
		countdown = setInterval(()=> {
			const secondsLeft = Math.round((then - Date.now()) / 1000);
			if(secondsLeft <= 0) {
				clearInterval(countdown); //return won't totally stop
			} 
			//
			//call again to display countdown
			displayTimeLeft(secondsLeft);
		}, 1000);
	}
	//DISPLAY FN
	//display countdown
	function displayTimeLeft(seconds) {
		//convert
		const hours = Math.floor(seconds / 3600); 
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainder = seconds % 60;
		//display
		const display = `${hours < 10 && hours > 0 ? `0${hours}:` : `${hours === 0 ? '' : `${hours}:`}`}${minutes < 10 ? '0' : ''}${minutes}:${remainder < 10 ? '0' : ''}${remainder}`;
		left.textContent = display;
		//update tab browser to get countdown
		document.title = display;
	}
	//display end hour
	function displayHrRetour(timestamp) {
		const retour = new Date(timestamp);
		const hour = retour.getHours();
		const minutes = retour.getMinutes();
		words.textContent = 'Retour à ' + `${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
	}
		function displayHrFin(timestamp) {
		const retour = new Date(timestamp);
		const hour = retour.getHours();
		const minutes = retour.getMinutes();
		words.textContent = 'Pause à ' + `${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
	}
	//
	//event listeners
	//work sessions buttons
	works.forEach(work=> work.addEventListener('click', function startTimer() {
		const seconds = parseInt(this.dataset.time); //dataset = str
		const now = Date.now();
		const then = now + (seconds* 1000);		
		timer(seconds);
		displayHrFin(then);
	}));
	//break buttons
	pauses.forEach(pause=> pause.addEventListener('click', function start() {
		const seconds = parseInt(this.dataset.time);
		const now = Date.now();
		const then = now + (seconds* 1000);		
		timer(seconds);
		displayHrRetour(then);
		
	}));
	//user input in minutes
	document.form.addEventListener('submit', function(evt) {
		evt.preventDefault();
		//this = form, minutes = elt with name= minutes
		const min = this.minutes.value;
		timer(min * 60);
		words.textContent = '';
	});
}