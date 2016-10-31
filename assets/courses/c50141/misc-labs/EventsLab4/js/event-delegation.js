// function itemRemove(e) {
// 	e.target.parentNode.parentNode.removeChild(e.target.parentNode);
// }

el = document.getElementById('shoppingList');
el.addEventListener('click', function(e){

	// Wait a 1/2 second then remove the element
	setTimeout(function(){
		// get the parent of the parent of the element clicked, and 
		// call the removeChild() function on the child of that
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
	}, 500);
	

	// prevent any links associated with ul with id shoppingList
	// from working as default (i.e., navigating to link)
	e.preventDefault();
}, true);