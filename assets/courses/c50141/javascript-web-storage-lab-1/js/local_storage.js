// add javascript code here for web storage lab exercise
function book(name) {
	this.name = name;
}

// add new book object to local storage
function add(){

	var uniqueKey = "obj-key"+localStorage.length;
	var bookName = document.getElementById('fld1').value;
	var newBook = new book(bookName);
	localStorage.setItem(uniqueKey, JSON.stringify(newBook));
	console.log(JSON.parse(localStorage.getItem(uniqueKey)));
	setTimeout(function(){
		//window.location.reload(); 
	}, 1000);

}

// Q2. Clear Web Storage
function clear_storage() {
	console.log("Clearing localStorage now...");
	localStorage.clear();
}

function fromStorage() {
	var i;
	var uniqueKey = "obj-key"; 
	var jObject; 

	for(i = 0; i < localStorage.length; i++) {
		jObject = JSON.parse(localStorage.getItem(uniqueKey+i));
		alert(jObject.name);
	}
}

