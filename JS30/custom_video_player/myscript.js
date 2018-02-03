window.onload = init;
function init() {

const player = document.querySelector('.video_player');
const video = player.querySelector('.viewer');
const playButton = player.querySelector('.lecture');
const vol = player.querySelector('.volume');
const progress = player.querySelector('.progress');
const progBar = player.querySelector('.progress_bar');


//update play/pause btn
function button() {
	 const icon = video.paused ? '<i class="fa fa-play" aria-hidden="true"></i>' : '<i class="fa fa-pause" aria-hidden="true"></i>';
	 playButton.innerHTML = icon;
}
//play fn
function playVid() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
//volume fn
function handleVolume() {
	video.volume = this.value;
}
//progress bar
video.addEventListener('timeupdate', function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progBar.style.flexBasis = `${percent}%`;
});
//backward and forward with progress bar
function backAndFor(event) {
	const where = (event.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = where;
}

//fullscreen fn
		// TODO
		
//flag mousedown. ça doit être une let.
let mousedown = false;

video.addEventListener('click', playVid);
video.addEventListener('click', button);

playButton.addEventListener('click', playVid);
playButton.addEventListener('click', button);

vol.addEventListener('change', handleVolume);
vol.addEventListener('click', handleVolume);

progress.addEventListener('click', backAndFor);
progBar.addEventListener('mousemove', (event)=> mousedown && backAndFor(event)); //1st check mousedown
progBar.addEventListener('mousedown',()=> mousedown = true);
progBar.addEventListener('mouseup',()=> mousedown = false);


}