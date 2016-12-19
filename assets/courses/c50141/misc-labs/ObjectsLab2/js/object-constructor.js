/** Set up Hotel object using closure pattern **/
var Hotel = (function() {
	function Hotel(){
		this.name = 'Quay';
		this.rooms = 40;
		this.booked = 25;
	}

	Hotel.prototype.checkAvailability = function() {
		return this.rooms - this.booked;
	}

	return Hotel;
})();

/** Unnamed approach **/
function AHotel() {
	this.name = 'Quay';
	this.rooms = 40;
	this.booked = 25;
	this.checkAvailability = function(){
		return this.rooms - this.booked;
	}
	return this;
}

/** new Object approach **/
var cHotel = new Object();
cHotel.name = 'Quay';
cHotel.rooms = 40;
cHotel.booked = 25;
cHotel.checkAvailability = function() {
	return this.rooms - this.booked;
};

var hotel = new Hotel();

// Update the HTML
var elName = document.getElementById('hotelName'); // Get element
elName.textContent = hotel.name;                   // Update HTML with property of the object

var elRooms = document.getElementById('rooms');    // Get element
elRooms.textContent = hotel.checkAvailability();   // Update HTML with property of the object

