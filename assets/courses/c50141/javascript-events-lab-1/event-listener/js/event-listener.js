
// Note you can also use defer attr in the html
window.onload = doAll;

function doAll() {
	
	// check given string length is not less than 5
	function isValid(someString) {

		if(!(someString.length < 5)) {
			return true;
		}
		else {
			return false;
		}
	}

	function checkUsername() {
		
		// get a ref to element with id=feedback
		//var feedbackEl = document.getElementById("feedback");

		// set the feedback div to empty first to ensure that each time
		// the function is called it will toggle the feedback message
		// on or off
		//feedbackEl.innerHTML = "";
		//(document.getElementById("feedback").innerHTML) = ""; // why does this work
		document.getElementById("feedback").innerHTML = ""  ; 

		// get the value entered into the given element
		var valueEnteredInField = el.value;

		// if the username is invalid (less than 5 characters)
		if(!isValid(valueEnteredInField)){
			
			// populate the feedback div with the following warning
			//feedbackEl.innerHTML = "Invalid: username cannot be less than 5 characters in length";
			document.getElementById("feedback").innerHTML = "Invalid: username cannot be less than 5 characters in length";
		}
	}

	// get a reference to the form element where the user types username
	var el = document.getElementById('username');

	// on blur event call the checkUsername function
	el.addEventListener('blur', checkUsername, false);
}