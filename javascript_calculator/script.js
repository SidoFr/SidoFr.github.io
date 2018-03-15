window.onload = function init() {
	//elements
	const screen = document.querySelector('.screen input');
	const numbers = document.querySelectorAll('.nb');
	const operators = document.querySelectorAll('.calc');
	const clear = document.querySelector('#clear');
	const equal = document.querySelector('#total');
	//variables
	const maxLength = 12;
	let memory = '0';
	let current = '0';
	let operator = '';
	//clear function
	function clearScreen() {
		memory = '0';
		current = '0';
		operator = '';
		screen.value = current;
	}
	//get input and display it on screen
	function HandleAndDisplay(input) {
		//clear any previous result
		if(typeof current === 'number') {
			current ='0';
		}
		//handle
		//if max length of input
		if(current.length >= maxLength) {
			alert(`max length = ${maxLength} digits`);
		}else {
			//one
			if(current === '0' && current.indexOf(".") === -1) {
				if(input === '.') {
					current = '0'+ input;
				}else {
				current = input; 
				}
			}
			//two
			else {
				//if input = decimal
				if(input=== '.') {
					if(current.includes('.')) {
						screen.value = 'error!';
					}else {
						current += input;
					}
				}else {
				current += input; 
				}
			}
		}
		//display
		screen.value = current;
	}
	//handle operator 
	function handleOperator(operation) {
		//check if operation waiting
		if(operator !== '' && current !== '') {
			calculate();
		}
		//handle click on 2 operators in a row
		if(operator !== '' && current === '') {
			current = memory;
		}
		//check which operator has been chosen
		if(operation.indexOf('/') > -1) {
			operator = 'divide';
		}
		if(operation.indexOf('*') > -1) {
			operator = 'multiply';
		}
		if(operation.indexOf('-') > -1) {
			operator = 'sub';
		}
		if(operation.indexOf('+') > -1) {
			operator = 'add';
		}
		//store current input
		memory = current;
		current = '';
		screen.value = current;
	}
	//calculate
	function calculate() {
		if(operator === 'divide') {
			current = parseFloat(memory) / parseFloat(current);
		}
		if(operator === 'multiply') {
			current = parseFloat(memory) * parseFloat(current);	
		}
		if(operator === 'sub') {
			current = parseFloat(memory) - parseFloat(current);	
		}
		if(operator === 'add') {
			current = parseFloat(memory) + parseFloat(current);	
		}
		//clear
		operator = '';
		memory = '0';
		//display result:
		//toFixed() round and convert to string
		//Number() convert to number to get rid of trailing zeros
		screen.value = Number(current.toFixed(4));
	}
	//
	//event listeners
	numbers.forEach(button=> button.addEventListener('click', function() {
		const number = this.dataset.val;
		HandleAndDisplay(number);
	}));
	operators.forEach(button=> button.addEventListener('click', function() {
		const opId = this.id;
		const value = this.value;
		handleOperator(value);
	}));
	equal.addEventListener('click', calculate);
	clear.addEventListener('click', clearScreen);
}