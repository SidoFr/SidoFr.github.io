window.onload = init;

function init() {
	//get all inputs in order to change them
	const inputs = document.querySelectorAll('input'); //renvoie 1 NodeList

	function handleUpdate() {
		//get suffix des values (px)
		//dataset est l'objet qui contient ttes les data attributes de l'élément ciblé,
		// dc ici, sizing en px
		const suffix = this.dataset.sizing || ''; // préciser 'ou rien' sinon error undefined

		//select variables : select root(=le doc) then set ppty we need (ex, spacing)
		//name = input name
		//add suffix if not, values change but not element
		document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	}
	inputs.forEach(input => input.addEventListener('change', handleUpdate));
	//plus, comme on a mis des range
	inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
}