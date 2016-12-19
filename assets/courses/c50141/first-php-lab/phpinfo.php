<?php 
	// make a connection to sql db 'web_apps' at localhost, with
	// root user, with no password
	$connection = mysqli_connect('localhost','root','', 'web_apps'); 
	if (!$connection) { 
		die('Could not connect to MySQL: ' . mysql_error()); 
	} 
	echo 'Connection OK' . "<br>";
	// set the character set to utf8
	mysqli_set_charset($connection, 'utf8');

	// construct a SQL query
	$myQry="select firstname, lastname, username from users";

	// execute the query and store in $results
	$results = @mysqli_query($connection, $myQry);
	
	// iterate over the results and dynamically populate the DOM with the $results;
	echo '<ul id="users_list">';
	while($row = mysqli_fetch_array($results, MYSQLI_ASSOC)) {
		echo '<li>';
		echo '<b>Name: </b>' . $row['firstname'] . ' <b>Username:</b> ' . $row['username'] . '<br>';
		echo '</li>';
	}
	echo '</ul>';

	// close the connection
	mysqli_close($connection); 
?> 