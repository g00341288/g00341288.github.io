/** This is tied to the onload event to prevent any loading related issues **/
function hotelStuffOnload() {

	function Hotel(name, rooms, booked) {
		this.name = name; 
		this.rooms = rooms;
		this.booked = booked;
		this.checkAvailability = function(){
			return this.rooms - this.booked;
		}
	}

var quayHotel = new Hotel('Quay', 40, 25);
var parkHotel = new Hotel('Park', 120, 77);

// Get acccess to the HTML elements of interest
var hotel1El = document.getElementById('hotel1'); 	// Get element with id hotel1
var hotel2El = document.getElementById('hotel2');	// Get element with id hotel2

// Update html properties with objects
hotel1.innerHTML = quayHotel.name + "<br>" + quayHotel.checkAvailability(); 
hotel2.innerHTML = parkHotel.name + "<br>" + parkHotel.checkAvailability();

/* 
NOTE: textContent does not work in IE8 or earlier
You can use innerHTML on lines 13 and 16
*/
}