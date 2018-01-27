window.onload = init;

function init() {
	//panels' transform
	const title = document.querySelectorAll(".title");

	function activate(event) {
		const panel = event.target.parentElement;
		panel.classList.toggle('active');
		panel.classList.toggle('open');
		console.log(panel.classList);
	}

	title.forEach(title => title.addEventListener('click', activate));

	//listen to click on 'rubrique'
	const rubriques = document.querySelectorAll('.rubrique');

	function changePage() {
		
	}
	rubriques.forEach(rubrique => rubrique.addEventListener('click', changePage));

}