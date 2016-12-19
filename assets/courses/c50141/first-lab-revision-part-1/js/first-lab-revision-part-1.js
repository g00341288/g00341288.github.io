// Create variables for the welcome message
var greeting = 'Hello ', 
	name = 'Customer', 
	message = ', please check your order:';

// Concatenate welcome message components
var welcome = greeting + name + message;

// Create variables to hold details about the sign
var sign = 'Montague House';
var tiles = sign.length;
var subTotal = tiles * 5;
var shipping = 7;
var grandTotal = subTotal + shipping;

// Get element id#greeting
var elemGreeting = document.getElementById('greeting');

// Replace innerHTML of element with welcome message
elemGreeting.innerHTML = welcome;

// Get element id#userSign and update innerHTML
var elemUserSign = document.getElementById('userSign');
elemUserSign.innerHTML = sign;

// Get element id#tiles and update innerHTML
var elemTiles = document.getElementById('tiles');
elemTiles.innerHTML = tiles;

// Get element id#subTotal and update innerHTML
var elemSubTotal = document.getElementById('subTotal');
elemSubTotal.innerHTML = '\u20AC' + subTotal;

// Get element id#shipping and update innerHTML
var elemShipping = document.getElementById('shipping');
elemShipping.innerHTML = '\u20AC' + shipping;

// Get element id#grandTotal
var elemGrandTotal = document.getElementById('grandTotal');
elemGrandTotal.innerHTML = '\u20AC' + grandTotal;

// Get element id#button
var pay = document.getElementById('button');

// Add event listener which alerts the user that 
// the page will open a new tab and redirect it to PayPal
pay.addEventListener('click', function(){
	alert("Redirecting to Paypal!");
	window.open("https://paypal.ie", "Elderflower Checkout");
});