// Create an array and populate with colours
var colours = ["white", "red", "blue"];

// Create a counter to use in a function for iterating over the 
// array in a circular fashion
var colourCounter = 0;

// Get the current class of the element which displays the colour
// this will be used to ensure that the existing styles aren't lost
var existingClass = document.getElementById("colour").className;

// Get a reference to the button that will change the colour of the given div
var changeColour = document.getElementById('changeColour');

// Add an event listener to it to track clicks
changeColour.addEventListener('click', function() {

	// Define a function to iterate over the array in a circular fashion
	// 
	function changeColour(array, direction){
		if(!direction){
			colourCounter = (colourCounter + 1) % array.length;
		}
		else {
			colourCounter = (colourCounter + array.length - 1) % array.length;
		}
	}

	// Call the changeColour function to advance the counter in the given direction
	changeColour(colours, 1); 

	// Get the colour div and change its classes to include the newly chosen colour
	// See the css file for the corresponding classes
	document.getElementById("colour").className = existingClass + " " + colours[colourCounter];
	document.getElementsByTagName("span")[0].innerHTML = colours[colourCounter];



})