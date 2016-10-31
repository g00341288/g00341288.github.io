// add javascript code here for web storage lab exercise
function book(name) {
	this.name = name;
}

function add(){

	var uniqueKey = "obj-key"+sessionStorage.length;
	var bookName = document.getElementById('fld1').value;
	var newBook = new book(bookName);
	sessionStorage.setItem(uniqueKey, JSON.stringify(newBook));
	console.log(JSON.parse(sessionStorage.getItem(uniqueKey)));
	setTimeout(function(){
		//window.location.reload(); 
	}, 1000);

}

// Q2. Clear Web Storage
function clear_storage() {
	console.log("Clearing sessionStorage now...");
	sessionStorage.clear();
}

function fromStorage() {
	var i;
	var uniqueKey = "obj-key"; 
	var jObject; 

	for(i = 0; i < sessionStorage.length; i++) {
		jObject = JSON.parse(sessionStorage.getItem(uniqueKey+i));
		alert(jObject.name);
	}
}

