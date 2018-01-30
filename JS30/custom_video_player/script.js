window.onload = init;

function init() {
	//get our elts
	const player = document.querySelector('.player');
	const video = player.querySelector('.viewer');
	const progress = player.querySelector('.progress');
	const progressBar = player.querySelector('.progress__filled');
	const play = player.querySelector('.toggle');
	const ranges = player.querySelectorAll('.player__slider');
	//skipButtons= anything with a data-skip attribute
	const skipButtons =  player.querySelectorAll('[data-skip]');

	//build out fn
	function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	//video: access method name and call it
	video[method]();
}
	//update the play button
	function updateButton() {
		const read = this.paused ? 'play' : 'pause';
		play.textContent = read;
	}

	//skip btn: how much is going to be skipped
	function skip() {
		//reminder: dataset allows access to data attributes
		//console.log(this.dataset.skip);
		//convert string into float
		video.currentTime += parseFloat(this.dataset.skip);
	}

	function handleRangeUpdate() {
		//this.name = volume or playbackrate
		video[this.name] = this.value;
	}
	//progress bar
	function handleProgress() {
		const percent = (video.currentTime / video.duration) * 100;
		progressBar.style.flexBasis = `${percent}%`;
	}

	//avancer ds la vidéo en cliquant sr la barre de progression
	function scrub(evt) {
		const goTo = (evt.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = goTo;	
	}
	//hook up evt listeners
	video.addEventListener('click', togglePlay);
	video.addEventListener('play', updateButton);
	video.addEventListener('pause', updateButton);

	play.addEventListener('click', togglePlay);
	//listen to the video running to make the bar progress or not
	video.addEventListener('timeupdate', handleProgress);

	skipButtons.forEach(skipBtn => skipBtn.addEventListener('click', skip));
	ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

	progress.addEventListener('click', scrub);
	
	//listener pr scrub en avançant ac la souris mais uniquement qd souris down sr la barre
	let mousedown = false;
	//if mousemove and mousedown then scrub
	progress.addEventListener('mousemove', (evt)=> mousedown && scrub(evt));
	progress.addEventListener('mousedown', ()=> mousedown = true);
	progress.addEventListener('mouseup', ()=> mousedown = false);

}	