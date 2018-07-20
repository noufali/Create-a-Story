$(function() {
		// connecting to socket
		var socket = io.connect("http://localhost:8000");
		var count = 0;
		var divs = [];
		var newSentence = [];
		var xPositions = [];
		var sentence = $('p').text() + "";
		var regex = /\b\w+\b/g;
		// using regex, collect all and only words in paragraph
		var final = sentence.match(regex);
		
		// when send button is clicked, send phone number in a socket to server
		$('#send').click(function() {
			var from = $('#number').val();
			socket.emit('phone', from );
			console.log("phone sent: " + from);
		});

		// receives socket from server confirming communication
		socket.on("nouf", function(msg) {
	    	console.log("Nouf socket message received: " + msg);
	    });
		// when scramble button is clicked, take each word in paragraph and put it in a separate div and position it randomly on page 
		$('#enter').click(function() {
			console.log("it worked!");
			// erase paragraph text 
			$('p').text(" ");
			// put each word collected using regex in div and position randomly
			for (var i = 0; i<final.length; i++) {
				var left = Math.floor(Math.random() * 600);
				var top = 50 + Math.floor(Math.random() * 900);
				var div = document.createElement('div');
				div.id = count + "";
				div.style.position = 'absolute';
				div.style.top = top + "px";
				div.style.left = left + "px";
				// make div with white background to display fridge magnet look
				div.style.backgroundcolor = "white";
				divs.push(div);
				document.body.appendChild(div);
				div.append(final[i]);
				count = count + 1;
			}
			// make divs draggable by user (fridge magnet effect) using jQuery
			for (var j=0;j<divs.length;j++) {
			    	$("#" + j).draggable({
				      // when user drops off word, check for its position
				      // if word is on the right of the page then turn div background colour to red
				      stop: function() {
				        positions();
				      }
				    });
				// otherwise keep background colour white
			    	$("#" + j).css("background-color", "white");
			};
	});
		
		// checking div word position. if word is on the right of the page then turn div background colour to red 
		// save word to form new sentence 
		function positions() {
			for (var z=0;z<divs.length;z++) {
				var xPos = $( "#" + z ).css("left");
				var word = $( "#" + z ).text();
				var t = $( "#" + z ).text();

				if (parseInt(xPos) > 700) {
					$( "#" + z ).css("background-color", "red");
					newSentence.push(word);

					newSentence = newSentence.filter(function(item,index,inputArray) {
			          return inputArray.indexOf(item) == index;
			     	});
				};
				
				// join newly formed sentence 
				var yes = newSentence.join(' ');
				// send sentence via socket to server to text 
				socket.emit('text', yes);
			};
		};
});
