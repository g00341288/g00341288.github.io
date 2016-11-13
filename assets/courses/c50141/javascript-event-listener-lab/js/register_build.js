var body = document.getElementById('body');

var loginFormString = 
"<form method='post' action='index.html'>"+
"<p><label>Username</label>"+
"<input type='text' name='login' value='' placeholder='Username or Email'>"+
"</p><p><label>Password</label>"+
"<input type='password' name='password' value='' placeholder='Password'>"+
"</p><p><label>Re-Enter Password</label>"+
"<input type='password' name='reenter-password' value='' placeholder='Password'>"+
"</p><p><label>"+
"<input type='radio' name='editList' value='male'/>Male</label>"+
"<label><input type='radio' name='editList' value='female'/>Female</label>"+
"<label><input type='radio' name='editList' value='other'/>Other</label>"+
"</p><p class='submit'><input type='submit' name='commit' value='Login'>"+
"</p></form>";

var addLoginDiv = function(e) {
	var loginDiv = document.getElementById('login');
	loginDiv.innerHTML = loginFormString;
	console.log("e: "+e);
};


// body.addEventListener('load', addLoginDiv());
// body.addEventListener('load', addLoginDiv());
// body.addEventListener('', addLoginDiv());
// window.addEventListener('load', addLoginDiv );

// var bodyLoad = new Event('bodyLoad');

// body.addEventListener('bodyLoad', function(e) { console.log('e: '+e);});

// function dispatchCustomEvent(this) {
// 	this.dispatchEvent(bodyLoad);
// }

var body = document.getElementsByTagName('body')[0];
function tellMeAboutTheEvent(e){
	console.log("The event is: " + e);
}
// window.addEventListener('load', tellMeAboutTheEvent);
body.addEventListener('load', tellMeAboutTheEvent());