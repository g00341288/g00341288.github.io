// class example
console.log('And we\'re off');

try {
	someVar; // variable is not declared. Will cause an exception
}
catch(e) {
	document.getElementById('error_details').innerHTML = e;
}
finally {
	//alert("Finally!");
}

// Experiments

var NewException = (function() {
	function NewException(message) {
		this.message = message;
		this.name = name;
		var err = new Error(message);
		this.stack = err.stack || "Error stack property not supported";
	}

	NewException.prototype = Object.create(Error.prototype);
	NewException.prototype.constructor = NewException;

	return NewException;
})();



var ANewException = new NewException("NewException: a custom exception has been thrown"); 
var AnotherNewException = new NewException("AnotherNewException: yet another custom exception has been thrown");

try {
	throw ANewException;
}
catch(e) {
	document.getElementById('error_details').innerHTML = e;
	console.log(e);
	// the reason this doesn't work as expected is 
	// the exception is thrown when the handler block is 
	// already out of scope and therefore meaningless
	// the error is still logged to the console but note that
	// it is uncaught!
	try {
		delayFunc(throwFunc, 2000);
	}
	catch(e) {
		document.getElementById('error_details').innerHTML = e;
	}
}




function throwFunc() {
	throw AnotherNewException;
}
function delayFunc(callback, timeout, params) {
	setTimeout(function() { callback.apply(null, params);},timeout);
}
