/* Capture: Add event listeners for parent nodes, starting at <div> all the way down to <a> */

/* Use an anonymous function so that a parameter can be passed to it - a string parameter.*/

/* the string passed should indicate the element name - e.g. if event listener on div node
then the string passed should be "<div>". The function should then present this parameter in
an alert message */

el = document.getElementById("link");
el.addEventListener('click', function(){alert(this.id);}, true);

el = document.getElementById("item");   
el.addEventListener('click', function(){alert(this.id);}, true);

el = document.getElementById("list");
el.addEventListener('click', function(){alert(this.id);}, true);

el = document.getElementById("page");
el.addEventListener('click', function(){alert(this.id);}, true);

// or 


// el = document.getElementById("link");
// el.addEventListener('click', function(){alert("<"+this.tagName.toLowerCase()+">")}, true);

// el = document.getElementById("item");   
// el.addEventListener('click', function(){alert("<"+this.tagName.toLowerCase()+">")}, true);

// el = document.getElementById("list");
// el.addEventListener('click', function(){alert("<"+this.tagName.toLowerCase()+">")}, true);

// el = document.getElementById("page");
// el.addEventListener('click', function(){alert("<"+this.tagName.toLowerCase()+">")}, true);
/* Bubble: Add event listeners for parent nodes of <a> all the way up to <div> */


