// If you have python installed
// run the following command from the root 
// of the project:
// python -m SimpleHTTPServer
// and navigate to localhost:8000
// It won't work locally because of CORS restrictions
// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
// for more

// Create XMLHttpRequest object
var xhr = new XMLHttpRequest();  

// When response has loaded
xhr.onload = function() {

  var res;
  var events;  
  var container;
  var image;
  var location;
  var city;
  var newline; 

 // Status check will not work locally - only on a server
 // If server status is 'ok':
 if (xhr.status === 200) {             

    // get XML from the server
    res = xhr.responseXML;   

    // get an array of event tag elements from xml response                   
    events = res.getElementsByTagName('event'); 

    // iterate over event elements array
    for (var i = 0; i < events.length; i++) {            
      
      // create div (container)
      container = document.createElement('div'); 

      // add a class attribute (event) to div (container)        
      container.className = 'event';                     

      // create img element (image)
      image = document.createElement('img');

      // set src and alt attributes on img element (image)
      image.setAttribute('src', getNodeValue(events[i], 'map'));
      image.setAttribute('alt', getNodeValue(events[i], 'location'));

      // append img element (image) to div (container)
      container.appendChild(image);

      // create paragraph element (location)
      location = document.createElement('p'); 

      // create b element (city)            
      city = document.createElement('b');

      // create br element (newLine)
      newline = document.createElement('br');

      // create a text node, and inject events
      // and append to b element (city)
      city.appendChild(document.createTextNode(getNodeValue(events[i], 'location')));

      // append br element (newLine) to paragraph element (location)
      location.appendChild(newline);

      // insert city, and newline
      // From mdn: 
      // "The Node.insertBefore() method inserts the specified node before 
      // the reference node as a child of the current node."
      location.insertBefore(city, newline);

      // append new text node
      location.appendChild(document.createTextNode(getNodeValue(events[i], 'date')));

      // append p (location) to div (container)
      container.appendChild(location);

      // get section#content and append div element (container) to it
      document.getElementById('content').appendChild(container);
    }
  }

  function getNodeValue(obj, tag) {                  
    // get content of xml
    return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
  }

};

// prepare request for xml file using 'GET' http verb
xhr.open('GET', 'data/data.xml', true);  

// send request
// note that without null, this may throw errors in older versions of Firefox           
xhr.send(null);                                     
