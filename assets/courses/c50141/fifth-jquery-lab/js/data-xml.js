// NOTE: If you run this file locally
// You will not get a server status
// You can comment out lines 11 and 35 to make it work locally
// Have commented out for the lab as student may opt to run locally
// and won't affect solution if run on a server.

var xhr = new XMLHttpRequest();        // Create XMLHttpRequest object

xhr.onload = function() {              // When response has loaded
	// The following conditional check will not work locally - only on a server
	//if (xhr.status === 200) {             // If server status was ok

		// THIS PART IS DIFFERENT BECAUSE IT IS PROCESSING XML NOT HTML
		var response = xhr.responseXML;                      // Get XML from the server
		var events = response.getElementsByTagName('event'); // Find <event> elements

		var di1='map';
		var di2='location';
		var di3='date';
		
		// BUILD UP STRING WITH NEW CONTENT (
		// could also use DOM manipulation - see js/data-xml-alt.js from this lab 
		// just edit the html to reference this file instead and same result is achieved)
		var newContent = '';
		for (var i = 0; i < events.length; i++) {            // Loop through them
			newContent += '<div class="event">';
			newContent += '<img src="' + events[i].getElementsByTagName(di1)[0].firstChild.nodeValue + '" ';
			newContent += 'alt="' + events[i].getElementsByTagName(di2)[0].firstChild.nodeValue + '" />';
			newContent += '<p><b>' + events[i].getElementsByTagName(di2)[0].firstChild.nodeValue + '</b><br>';
			newContent += events[i].getElementsByTagName(di3)[0].firstChild.nodeValue + '</p>';
			newContent += '</div>';
		}
		// Update the page with the new content
		document.getElementById('content').innerHTML = newContent;
	//}
};

// THE FINAL PART IS THE SAME AS THE HTML EXAMPLE BUT IT REQUESTS AN XML FILE
xhr.open('GET', 'data/data.xml', true);             // Prepare the request
xhr.send(null);                                     // Send the request
