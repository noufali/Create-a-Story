$(function() {
		var socket = io.connect("http://localhost:8000");
		var count = 0;
		var divs = [];
		var newSentence = [];
		var xPositions = [];
		var sentence = $('p').text() + "";
		var regex = /\b\w+\b/g;
		var not = /\W+/g;
		var final = sentence.match(regex);
		//console.log(final);

		$('#send').click(function() {
			var from = $('#number').val();
			socket.emit('message', from );
			console.log("message sent: " + from);
		});

		socket.on("nouf", function(msg) {
	    	console.log("Nouf socket message received: " + msg);
	    });

		$('#enter').click(function() {
			console.log("it worked!");
			//$('p').text(sentence.replace(regex, "    "));
			$('p').text(" ");

			for (var i = 0; i<final.length; i++) {
				var left = Math.floor(Math.random() * 600);
				var top = 50 + Math.floor(Math.random() * 900);
				var div = document.createElement('div');
				div.id = count + "";
				div.style.position = 'absolute';
				div.style.top = top + "px";
				div.style.left = left + "px";
				div.style.backgroundcolor = "white";
				divs.push(div);
				document.body.appendChild(div);
				div.append(final[i]);
				count = count + 1;
			}

			for (var j=0;j<divs.length;j++) {
			    	$("#" + j).draggable({
				      stop: function() {
				        positions();
				      }
				    });
			    	$("#" + j).css("background-color", "white");
			};
	});

		function Word (d, x, t) {
			this.d = d;
			this.x = x;
			this.t = t;
		}

		function positions() {
			for (var z=0;z<divs.length;z++) {
				var xPos = $( "#" + z ).css("left");
				var word = $( "#" + z ).text();
				var t = $( "#" + z ).text();

				if (parseInt(xPos) > 700) {
					//console.log(xPos);
					$( "#" + z ).css("background-color", "red");
					newSentence.push(word);

					newSentence = newSentence.filter(function(item,index,inputArray) {
			          return inputArray.indexOf(item) == index;
			     	});
				};
				//console.log(newSentence);
				var yes = newSentence.join(' ');
				console.log(yes);
				socket.emit('text', yes);
			};


		};



});
