// When the DOM is ready, execute the given anonymous function which populates div#page
// with content
$( document ).ready(function() {
	
	// Inject a div containing a p element into existing div (div#page)
	// 
	// Note that I have defined a collection of functions below for generating HTML tag strings
	// This is probably risky in general because there is a danger that this approach will 
	// pollute the namespace, and depending on the libraries available on the page, it may well
	// do just that in other contexts; here, however, there is no conflict - I added these functions
	// only as an experiment
    $('div#page').html(
    	div(
            p(
                'Hi, I am injected when the document is ready!'
            ), 
            'injected'
        )
    );

    // constuct and return a head
    function head(contents) {
    	this.head = '<head>' + contents + '</head>';
    	return this.head;
    }
    // construct and return a div
    function div(contents, id) {
    	id ? this.div = '<div id=' + id + '>' + contents + '</div>' : this.div = '<div>' + contents + '</div>';
    	return this.div;
    }

    // construct and return a p
    function p(contents) {
    	this.p = '<p>' + contents + '</p>';
    	return this.p;
    }

    // construct and return a h1
    function h1(contents) {
    	this.h1 = '<h1>' + contents + '</h1>';
    	return this.h1;
    }

    // construct and return a span
    function span(contents) {
    	this.span = '<span>' + contents + '</span>';
    	return this.span;
    }

    // construct and return a section
    function section(contents) {
    	this.section = '<section>' + contents + '</section>';
    	return this.section;
    }

    // construct and return a head
    function head(contents) {
    	this.head = '<head>' + contents + '</head>';
    	return this.head;
    }

    // construct and return a body
    function body(contents) {
    	this.body = '<body>' + contents + '</body>';
    	return this.body;
    }

    // construct and return a html
    function html(contents) {
    	this.html = '<html>' + contents + '</html>';
    	return this.html;
    }

    // construct and return a doctype
    function doctype(contents) {
    	this.doctype = '<!DOCTYPE html>';
    	return this.doctype;
    }

    // construct and return a link
    function link(rel, type, href){
    	this.contents = '<link ' + rel || 'stylesheet';
    	this.contents += ' ' + type || 'text/css';
    	this.contents += ' ' + href || 'css/stylesheet.css';
    	return this.contents;
    }

});