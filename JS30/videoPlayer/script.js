window.onload = function init() {
	const player = document.querySelector('.player');
	//buttons
	const play = player.querySelector('.lecture');
	const enlarge = player.querySelector('.fullscreen');
	const volume = player.querySelector('.volume');
	//bars
	const progress = player.querySelector('.progress');
	const progressBar = player.querySelector('.progBar');
	const speed = player.querySelector('.emptyBar');
	const controlSpeed = player.querySelector('.bar');
	//else
	const viewer = player.querySelector('.viewer');
	let width;
	
	let speedWidth;
	
	function reloadBtn () {
		if(viewer.paused) {
			play.innerHTML = '<i class="fas fa-pause"></i>';
		}else {
			play.innerHTML = '<i class="fas fa-play"></i>';
		}
	}
	function playMovie() {
		if(viewer.paused) {
			viewer.play();
		}else {
			viewer.pause();
			}	
	}
	function changeVolume() {
		viewer.volume = this.value;
	}
	//progress bar
	viewer.addEventListener('timeupdate', function handleProgress() {
		const width = (viewer.currentTime / viewer.duration) * 100;
		progressBar.style.width = `${width}%`;	
	});
	function backAndFor(evt) {
		//evt.offsetX = evt.pageX(=where is cursor) - any margin(=coords.left)
		//viewer.currentTime = evt.offsetX; fonctionne mais moins précis
		//offsetWidth = width of bar
		//console.log(evt.offsetX, progress.offsetWidth)
		const there = (evt.offsetX / progress.offsetWidth) * viewer.duration;
		viewer.currentTime = there;
	}
	function goFullscreen() {
		const method = viewer.requestFullScreen || viewer.webkitRequestFullScreen || viewer.mozRequestFullScreen || viewer.msRequestFullScreen;
		if(method) {
			method.call(viewer);
		}else {
			alert('Sorry, not available on your browser!');
		}
	}
	//bar for speed control
	function handleSpeed(evt) {
		//bar to fill
		const y = evt.offsetY;
		const percent = y / this.offsetHeight;
		const height = Math.round(percent * 100) + '%';
		controlSpeed.style.height = height;
		//speed const
		const min = 0.5;
		const max = 4;
		const playBackRate = percent * (max - min) + min;
		controlSpeed.textContent = playBackRate.toFixed(2) + 'x'; //only 2 decimals
		//apply to video
		viewer.playbackRate = playBackRate;
		console.log(height)
	}
	//listen for isIn
	//flag
	let isDown = false;
	progressBar.addEventListener('mousedown', ()=> isDown = true);
	progressBar.addEventListener('mouseup', ()=> isDown= false);
	//event listeners
	play.addEventListener('click', playMovie);
	play.addEventListener('click', reloadBtn);
	viewer.addEventListener('click', playMovie);
	viewer.addEventListener('click', reloadBtn);
	volume.addEventListener('mousemove', changeVolume);
	progress.addEventListener('click', backAndFor);
	progressBar.addEventListener('mousemove', (event)=> {
		if(isDown) {
		backAndFor(event);
	}
	});
	enlarge.addEventListener('click', goFullscreen);
	speed.addEventListener('mousemove', handleSpeed); 

}