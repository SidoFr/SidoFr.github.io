// exercise's goal: keep track of the inputs of user, create list and checkbox depending on this inputs
window.onload = init;

function init() {
	//form
	const addItems = document.querySelector('.add-items');
	//the list
	const itemsList = document.querySelector('.plates');
	//empty array for inputs OR user's inputs kept in ocal storage!
	const items = JSON.parse(localStorage.getItem('items')) || [];
	//buttons
	const clear = document.querySelector('.clear');
	const checkAll = document.querySelector('.check-all');

	function addItem (evt) {
		//stop the page from refresh
		evt.preventDefault();
		//take the input and put it into an object. we want the VALUE of the input
		const text = (this.querySelector('[name=item]')).value; //this = the form. narrowed search using this

		const item = {
			text: text, //es6 shorthand = text,
			done: false //= not checked by default
		}
		//put item into the array
		items.push(item);
		populateList(items, itemsList);
		//local storage (so that when refresh, keep inputs). see dev tool->application
		//this way, we keep inputs in local storage even after refresh page BUT it only appears in local storage for now
		localStorage.setItem('items', JSON.stringify(items)); //string only in local storage so stringify items: convert the array into json
		//reset input once get
		this.reset();
	}

	//create the html
	//fn takes items and where to put them
	function populateList(plates=[], platesList) { //plates=[] plutôt q plates est une précaution si on oublie de passer qqch ds la fn

		//reminder: .map creates a new array with the result of calling a provided fn on each elt of the array
		platesList.innerHTML = plates.map((plate, i) => {
			//return html -> backticks
			return `
				<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' :''}>
				<label for="item${i}">${plate.text}</label> 
				</li>
			`;//check only if true, bool mandatory, checked= false does not work and checked will check everybox
		}).join(''); //map returns an array we convert into a string

	}//note: every time user inputs, we recreate an entire list so it may cause perf issues with big inputs(not case here)
	//React or Angular wld help to update the list adding one <Li>

	//track check, store it and populate
	function toggleDone(evt) {
		if(!evt.target.matches('input')) return; //skip if not (.matches is an API)

		//find the one checked and set done to true
		//hence the utility of data-index attribute of checkbox
		const elt = evt.target;
		const index = elt.dataset.index; //dataset allows access to data attributes
		items[index].done = !items[index].done; //the opposite of current value

		//local storage and populate list
		localStorage.setItem('items', JSON.stringify(items));
		populateList(items, itemsList);
	}

	function clearAll() {
		//clear ul
		itemsList.innerHTML = '<p>no ingredient yet...</p>';
		//clear items
		items.length = 0;
		//clear localStorage
		localStorage.clear();
		//console.log(items, itemsList);
	}

	
	function checkAllBoxes() {
		items.forEach(item => item.done = true);
		localStorage.setItem('items', JSON.stringify(items));
		populateList(items, itemsList);
	}



	addItems.addEventListener('submit', addItem);
	clear.addEventListener('click', clearAll);
	checkAll.addEventListener('click', checkAllBoxes);
	//listen to event on the LIST (=parent) and not checkbox(=children), because the list is here at the beg and not checkboxes
	//-> event delegation. Ask parent to ask children to handle the event
	itemsList.addEventListener('click', toggleDone);
	


	//at page load (since we had local storage and we want user inputs list to stay on page when refresh)
	populateList(items, itemsList);
}

//challenge: create one button "check all" and one button "clear all"