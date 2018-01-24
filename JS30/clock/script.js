window.onload = init;

function init() {
	//aiguille des secondes
	//déclare fonction
	const aiguilleSec = document.querySelector(".aiguille-s");
	const aiguilleMn = document.querySelector(".aiguille-mn");
	const aiguilleHr = document.querySelector(".aiguille-hr");
	function setDate() {
		//create a date object with new Date(). a date = year, month, day,hour, mn, sec, millisec.
		//new Date() gives us an object with current date and time
		const now = new Date();
		//getSeconds est une méthode qui renvoie les secondes en fonction de l'hr locale
		const seconds = now.getSeconds();
		//rotate en deg dc conversion, 1 sec = 1 deg
		const secondDegrees = ((seconds / 60) * 360) + 90; //+90 compense les 90deg de rotation de css
		//change apparence = rotation
		aiguilleSec.style.transform = `rotate(${secondDegrees}deg)`;//rotate en fonction des secondes

		//mm chose ac minutes
		const minutes = now.getMinutes();
		const mnDegrees = ((minutes / 60) * 360) +90;
		aiguilleMn.style.transform = `rotate(${mnDegrees}deg)`;
		//ac les heures
		const hours = now.getHours();
		const hrDegrees = ((hours / 12) * 360) +90;
		aiguilleHr.style.transform = `rotate(${hrDegrees}deg)`;
		console.log(seconds, minutes, hours);
	}
	//setInterval calls a function at specific interval, here every sec.((window.)setInterval();)
	setInterval(setDate, 1000);
}