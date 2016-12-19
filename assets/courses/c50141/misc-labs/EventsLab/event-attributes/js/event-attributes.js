// Exercise 1 - attributes based HTML events handler
function isValid(someString) {
	if(!(someString.length < 5)) {
		return true;
	}
	else {
		return false;
	}
}

function checkUsername() {

	// get a ref to element with id=username
	var usernameEl = document.getElementById("username");
	
	// get a ref to element with id=feedback
	var feedbackEl = document.getElementById("feedback");

	// set the feedback div to empty first to ensure that each time
	// the function is called it will toggle the feedback message
	// on or off
	feedbackEl.innerHTML = "";

	// get the value entered into the given element
	var valueEnteredInField = usernameEl.value;

	// if the username is invalid (less than 5 characters)
	if(!isValid(valueEnteredInField)){
		
		// populate the feedback div with the following warning
		feedbackEl.innerHTML = "Invalid: username cannot be less than 5 characters in length";
	}
}