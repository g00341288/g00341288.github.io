function getJSONFile(path, callback) {

	var data;

	// construct a new xhr
    var xhr = new XMLHttpRequest();

    // From the mdn docs: 
    // "An EventHandler that is called whenever the readyState 
    // attribute changes. The callback is called from the user 
    // interface thread. The XMLHttpRequest.onreadystatechange 
    // property contains the event handler to be called when the 
    // readystatechange event is fired, that is every time the 
    // readyState property of the XMLHttpRequest changes. 
    // The callback is called from the user interface thread."
    xhr.onreadystatechange = function() {
    	// From the mdn docs: 
    	// "The XMLHttpRequest.readyState property 
    	// returns the state an XMLHttpRequest client is in. "
    	// An XHR client exists in one of five states, represented by 
    	// numerical codes from 0 to 4
    	// 4 indicates the operation is complete 
        if (xhr.readyState === 4) {
        	// From the mdn docs: 
        	// "The XMLHttpRequest.status property returns the numerical 
        	// status code of the response of the XMLHttpRequest. 
        	// status will be an unsigned short. Before the request is complete, 
        	// the value of status will be 0. It is worth noting that browsers 
        	// report a status of 0 in case of XMLHttpRequest errors too. The 
        	// status codes returned are the standard HTTP status codes."
        	// In this case, if the status of the request corresponds to HTTP
        	// status code 200, OK, then parse the responseObject
        	// and if a callback is given, execute it on the responseObject
            if (xhr.status === 200) {
                responseObject = JSON.parse(xhr.responseText);
                if (callback) {
                	callback(responseObject);
                }
            }
        }
    };

    // prepare request for xml file using 'GET' http verb and path to resource
    xhr.open('GET', path);

    // send request
    xhr.send(); 
}

// request the file and execute callback with the parsed result once
// available
getJSONFile('data/data.json', function(data){

	var newContent = '';

	// construct and return a div element
	function div(contents, _class) {
		this.div = "<div class=" + "'" +_class  + "'" + ">" + contents + "</div>";
		return this.div;
	}

	// construct and return an img element
	function img(src, alt){
		this.img = "<img src=" + "'" + src + "'" + ' ' + "alt=" + "'" + alt + "'" + '/>';
		return this.img;
	}

	// construct and return a p element
	function p(contents) {
		this.p = "<p>" + contents + "</p>";
		return this.p;
	}

	// construct and return a b element
	function b(contents) {
		this.b = "<b>" + contents + "</b>";
		return this.b;
	}

	// construct and return a br element
	function br(){
		this.b = "<br>";
		return this.b;
	}

	// loop through object, create and populate new html elements
    for (var i = 0; i < data.events.length; i++) { 
      newContent += 
      div(
      	img(responseObject.events[i].map, responseObject.events[i].location) + 
      	p(
      		b(responseObject.events[i].location) +
      		br() +
      		responseObject.events[i].date
      	),
      	"event"
	  );
    }

    // Update the page with the new content
    document.getElementById('content').innerHTML = newContent;;
});

