var fighters = ["Conor McGregor", "Jon Jones", "Ronda Rousey", "Frankie Edgar", "Rose Namajunas", "Stipe Miocic", "Demetrious Johnson"];
var state;

	function displayfightersinfo(){
		$('#gifs').empty();

		var fighters = $(this).attr('data-name');
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fighters + "&api_key=dgLQ833d63Xw9nZ1gaHhP3XpZ7owifqp";
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);

			var results = response.data;
			for(var i=0; i<10; i++){
			var fightersDiv = $('<div class="fightersDiv">');

			// Retrieves the Rating Data
			var rating = results[i].rating;
			console.log("Rating : "+ rating);

		// ratings
			var pOne = $('<p class= "rating">').text( "Rating: " + rating);
			fightersDiv.append(pOne);
			
			// Holds img
			var img = $('<img id="giffed">');

 			img.attr({'src': results[i].images.fixed_height_still.url,
                	'data-still' : results[i].images.fixed_height_still.url,
                	'data-animate' : results[i].images.fixed_height.url,
                	'data-state' : 'still'
                });

			fightersDiv.append(img);

			$('#gifs').prepend(fightersDiv);
		}
		});

	}

function pauseGif(){
	console.log("inside on click ")
	state = $(this).attr('data-state');
	console.log("state"+state)
	 if ( state == 'still'){
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
    else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }


};

	function renderButtons(){ 

		for (var i = 0; i < fighters.length; i++){

		    var a = $('<button>') 
		    a.addClass('fightersBtn'); 
		    a.attr('data-name', fighters[i]); 
		    a.text(fighters[i]); 
		    $('#buttonsView').append(a); 
		}
	}


	$('#addGif').on('click', function(){
		var fighterInput = $('#gif-input').val().trim();
		if(fighterInput!=""){
		fighters.push(fighterInput);
		renderButtons();
		}
		return false;
	})


	$(document).on('click', '.fightersBtn', displayfightersinfo);
	renderButtons();
	$(document).on("click", '#giffed', pauseGif);