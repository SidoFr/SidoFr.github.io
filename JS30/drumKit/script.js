window.onload = init;
function init() {
	
	function getSound(event) {
		//get the elt 'audio' corresponding to the key pressed
		//back-tick `` enclose template literals. 
		//${} indicate placeholders.
		//the exp in the placeholders (and the text between them if any) are passed in a function.
		//more on developer.mozilla.or/.../javascript
		const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
		//mm ch ac .key pr animation
		const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

		if(!audio) return; //si pas de fichier audio attaché à la clé, stop
		//rewind to start with .currentTime so that no interruption if keydown several times
		audio.currentTime = 0;
		audio.play();
		//change keys
		key.classList.add('playing');
	}	
	//remove 'playing' (better not with setTimeout because there is already a timer in css)
	//add a 'transition end event' better
	function removeTransition(event) {
		//do it only for the transform ppty. 
		if(event.propertyName !== 'transform') return;
		//this = what is called(ici key)
		this.classList.remove('playing');
	}
	//good practice: put those here, separated from function called
	//add an event listener for each key
	const keys = document.querySelectorAll(".key");	
	keys.forEach(key => key.addEventListener('transitionend', removeTransition));
	//first event listener 
	window.addEventListener("keydown", getSound);
}