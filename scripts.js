


var nyApp = {};

nyApp.url = "http://api.nytimes.com/svc/events/v2/listings.jsonp";

nyApp.getInfo = function() {
	
	// get prefs
 	var cat = $('.catDropdown').val();
 	var buro = $('.boroughDropdown').val(); 
 	// get dates format needs to be --> YYYY-MM-DD:YYYY-MM-DD
 	var startDate = $('.start').val();
 	var endDate = $('.end').val();
 	var dateRange = startDate +':'+ endDate;
 	console.log("am I working ? " + cat + buro + dateRange);


	$.ajax({
		url : nyApp.url,
		type: "GET",
		dataType: "jsonp",
		data: {
			'api-key' : 'c8592a2f201f8cc3fb4732100b74523e:1:71357838',
			'facets' : 1,
			'filters' : 'category:' + cat + ',borough:' + buro,
			'limit' : 9,
			'date_range' : dateRange
	
		},
		success : function(data){
			// will run when data is brought back
			// console.log(data);
			// var results = data.results;
			// console.log(data.results);
			var results = data.results;
			nyApp.displayEvent(data);

		}
	});
	// end of ajax 
}

nyApp.init = function(){
// do these things initially 
 $('.submit').on('click',function(e) {
 	nyApp.getInfo();
 	e.preventDefault();
 	
 });
}
nyApp.displayEvent = function(response) {
	$('.resultsWrapper').html("");
	var eventPieces = response.results;

	for(var i = 0; i < eventPieces.length ; i++){
		console.log(eventPieces[i]);
		var div = $('<div>').addClass('events');
		var h2 = $('<h2>').text(eventPieces[i].event_name);
		var venue = $('<p>').html(eventPieces[i].venue_name);
		var h3 = $('<h3>').text(eventPieces[i].neighborhood);
		var description = $('<p>').html(eventPieces[i].web_description);
		var date = $('<h4>').html(eventPieces[i].date_time_description);
		div.append(h2,venue,description,h3,date);

		$('.resultsWrapper').append(div)




	}
	// end of loop
}
// end of display event


// document ready part
$(function() {
    nyApp.init();
});


// split the string
// var startDate = $('.start').val().split(' ').reverse().join(' ');

// var endDate = $('.end').val().split(' ').reverse().join(' ');
// reverse the string you get back
// join them back into a string
