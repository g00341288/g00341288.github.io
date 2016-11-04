---
layout:			post
title:			"The Load Event and addEventListener"
date:			2016-11-02
category:		JavaScript, Events, Event Listeners
description:	"For those of you who tried to add an event listener on the body element to capture the load event!"
tags:			JavaScript, Events, Event Listeners
meta-title:		"Thoughts on JavaScript"

author:			"Leonard M Reidy"
author-slug:	leonard-m-reidy
author-desc:	"Leonard M Reidy is the creator of ngBootUI and Jekyll Generic. He is a front end web designer and developer working out of rainy Galway. He is actively seeking employment as a front-end web developer with a view to full-stack development. Give him a job. You won't regret it!""
author-url:		https://leonardreidy.github.io/
author-twitter:	leonardreidy
author-github:	leonardreidy
projects-jekyll-generic: "https://github.com/leonardreidy/jekyllgeneric"
projects-ngbootui: "https://github.com/leonardreidy/ngbootui"
permalink: 		blog/the-load-event-and-addEventListener
---

In two recent classes, we were presented with lab exercises that required the student to add an event listener to the body element to handle the `load` event and several students, myself included, observed some unexplained behaviour with the second parameter to the `addEventListener` function. I have done some research and experimentation and I believe that I have a partial answer to the question concerning this unexplained behaviour and this post will present my findings. 

### The Problem
To refresh your memory, I will present the code from the simpler problem, presented in class today: 

{% highlight javascript %}
function addLoginDiv() {
  var loginDiv = document.getElementById('login');
  loginDiv.innerHTML = loginFormHTMLAsString;
}
var body = document.getElementById('body');
body.addEventListener('load', addLoginDiv);
{% endhighlight %}

If your code looked anything like this, the event handler did not appear to work as expected; the login form did not display on the page. However, if you added parentheses to the second parameter (indicating a function invocation), as in the code snippet below, then it did work.

{% highlight javascript %}
body.addEventListener('load', addLoginDiv() )
{% endhighlight %}  

So, how do we explain this behaviour? The devil, as it turns out, is in the details. Essentially, the `load` event belongs to the `window`, and we can't really tie it to the body element at all! Here's how the Mozilla Developer Network [documentation](https://developer.mozilla.org/en-US/docs/Web/Events/load)  describes it: 

> # load
> 
>"The load event is fired when a resource and its dependent resources have finished loading." 
>

But the clincher is just below, under _General info_: 

> # General info
> ### ...
>
> #### Target 			
> window
> 

This is the key to the problem. The _target_ of the `load` event is the `window` object. 

---

But surely it shouldn't work at all then, with or without the parentheses? You would think so. But it does work _with_ the parentheses; or rather, it appears to work. Of course, it would also work if you added the same event listener with the same function invocation to literally _any_ other element in the page. In fact, it would 'work' if you passed an empty string as the first parameter to the `addEventListener()` function like this: 

{% highlight javascript %}
body.addEventListener('', addLoginDiv());
{% endhighlight %}

And this is the best evidence that we are _not_ adding an event handler for the `load`event to the body at all. If you are not convinced, try adding the following code to the javascript file for today's lab (`register_build.js`):

{% highlight javascript %}

function tellMeAboutTheEvent(e) {
	console.log("The event is: " + e);
}

window.addEventListener('load', tellMeAboutTheEvent );

{% endhighlight %}

When you fire up the browser, the code runs and it prints out some information to the console that looks like this: 

`The event is: [object Event]`

This is what we would expect because the corresponding event object is available to the function `tellMeAboutTheEvent()`. But if we try to do the same on the body element as below, we either get an error or no information about the event: 

{% highlight javascript %}

function tellMeAboutTheEvent(e) {
  console.log("The event is: " + e);
}
// prints nothing to the console
body.addEventListener('load', tellMeAboutTheEvent ); 

// prints an error, because e is not available
body.addEventListener('load', tellMeAboutTheEvent(e) ); 

// prints a message that indicates the event is undefined
body.addEventListener('load', tellMeAboutTheEvent() ); 

{% endhighlight %}

The last of these is, I think, crucial. The function `tellMeAboutTheEvent()` prints a message to the console that indicates that `e` (the event) is `undefined`. This seems to confirm the idea that the `load` event is not available at all when we try to add an event listener to the body element to handle that event! Again, this is consistent with how the `load` event is defined in the documentation.  

### Summary

By way of brief summary, we may say that the `load` event targets the `window` and the best practice is to add a `load` event listener to the `window` only. The best solution in a case like this is to rethink the problem, perhaps to add the login div on a 'click' event, or, to add the login div on `window` or `document` load, but with a class that hides it until an appropriate event handler changes its class to reveal it. Then we could tie an event like `blur` or `mouseover` to the body and get a similar result.