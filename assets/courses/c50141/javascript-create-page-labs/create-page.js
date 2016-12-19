// Simple demonstration of creating page content with JavaScript
var name = "Leonard M Reidy";

// a simple function to raise an alert that computes and reports the addition of 4 and 2
function add(){
	alert("4 + 2 = "+(4+2));
}

// a call to document.write() which writes the given string to the page - the string
// is html and so the page is populated with the given html
document.write(
	'<h1>Page Created by ' +
	name +
	'</h1>' + 
	'<p>Use document.write() function to write to the page instead of using DOM methods</p>' +
	'<p>Click the button to alert the result of 4 + 2</p>' + 
	'<br>' +
	'<button id="b1" onclick="add()">Add</button>'
);

