// var liEl = document.getElementsByClassName("hot");
// for (var i = 0; i < liEl.length; i++){
// 	liEl[i].classList.add("favorite");
// 	if(liEl[i].firstChild.nodeName.toLowerCase() == "em"){
// 		liEl[i].firstChild.classList.add("seasonal");
// 	}
// }

// This works
// $('li.hot').addClass('favorite');
// $('em').addClass('seasonal');

// Here is an alternative using $.each
$.each($('li'), function(index, value) {
	// Wrap the value ( which is a raw DOM element)
	// as a jQuery object, so that you can call
	// methods like addClass
	$(value).children('em').addClass('seasonal');
	$(value).addClass('favorite');
});