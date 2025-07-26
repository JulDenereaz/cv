// To add : question mark button; controls modification, event backway;



var game = {
	snake: {
		x: [],
		y: [],
	},
	dir: [],
	size: 1,
	speed: 60,
	speedmem: 0,
	state: false,
	ndir: 1,
	food: {
		x: 0,
		y: 0,
	},
	growth: 0,
	name: "Anonymous",
	score: 0,
	pscore: 0,
	pscoresav: 0,
	pause : false,
	hsw: false,
	dig: {
		n:[],
	},
};

var growing = false,
	timer,
	iswall = false,
	holy = false,
	gameready = false,
	deathanim = false,
	incre = 0;

//GAME CORE//
	
function newgame() {
	if(!deathanim){
		$(".snake").remove();
		$("#apple").remove();
		$("#gameover").css({opacity: 0});
		clearInterval(timer);
		game.snake.x = [];
		game.poxy = [];
		game.dire = [];
		game.dig.n = [];
		game.size = 1;
		game.growth = 0;
		var x = 15;
		var y = 15;
		var sid;
		incre=0;
		$(document.createElement("div"))
			.addClass("snake")
			.css({
				left: (x*20),
				top: (y*20),
				opacity: 0,
			})
			.attr("id", "s"+ 0)
			.appendTo($("#game"));
			$("#s0").animate({opacity: 1}, 500, function(){
				game.state = true;
			});
		game.dir.unshift(1);
		game.snake.x.unshift(15)
		game.snake.y.unshift(15)
		newfood();
		running();
		gameready = true;
		game.speedmem = 11-((game.speed -40)/10);
		save();
	}
}

function running() {
	if(Math.abs(game.dir[0] - game.ndir) != 2){
		game.dir.pop();
		game.dir.unshift(game.ndir);
		for(i=0; i<game.size; i++){
			sid = "s" + i;
			if(game.dir[i]== 1){
				var y = ((game.snake.y[i] - 1)*20);
				game.snake.y[i] -= 1;
				if(game.snake.y[i] == -1 && iswall){
					game.snake.y[i] = 29;
					y += 600;
				}
				$("#"+sid).css({
					top: y,									// up
				});
			}else if(game.dir[i]== 2){
				var x = ((game.snake.x[i] + 1)*20);
				game.snake.x[i] += 1;
				if(game.snake.x[i] == 30 && iswall){
					game.snake.x[i] = 0;
					x -= 600;
				}
				$("#"+sid).css({
					left: x,								// right
				});
			}else if(game.dir[i]== 3){
				var y = ((game.snake.y[i] + 1)*20);
				game.snake.y[i] += 1;
				if(game.snake.y[i] == 30 && iswall){
					game.snake.y[i] = 0;
					y -= 600;
				}
				$("#"+sid).css({
					top: y,									// down
				});
			}else if(game.dir[i]== 4){
				var x = ((game.snake.x[i] - 1)*20);
				game.snake.x[i] -= 1;
				if(game.snake.x[i] == -1 && iswall){
					game.snake.x[i] = 29;
					x += 600;
				}
				$("#"+sid).css({
					left: x,								// left
				});
			}
		}
		if(growing){
			growing = false;
			game.size++;
			game.growth --;
		}
		if(game.growth > 0){
			var si = game.size - 1;
			var x = game.snake.x[si];
			var y = game.snake.y[si];
			game.snake.x[game.size] = x;
			game.snake.y[game.size] = y;
			$(document.createElement("div"))
				.addClass("snake")
				.css({
					left: (x*20),
					top: (y*20),
					background: "yellow",
				})
				.attr("id", "s"+ game.size)
				.appendTo($("#game"));
			var db = game.dir[si];
			growing = true;
			game.dir[game.size] = db;
			game.dig.n.unshift(0)
			game.score = game.size * (game.speedmem + 1)
			$("#score").html("<h4>Score : " + game.score + "</h4>");
		}
		if(game.snake.y[0] == game.food.y && game.snake.x[0] == game.food.x){
			eat();
		};
		// for(i=1;i<game.size;i++){
			// var sid = "s" + i;
			// $(document.getElementById(sid)).css({background: "yellow", "border-radius": "0px"});
			// for(j=0;j<game.dig.n.length;j++){
				// if(i == game.dig.n[j]){
					// $(document.getElementById(sid)).css({background: "red", "border-radius": "10px"});
				// }
				// if(game.dig.n[j] > game.size){
					// game.dig.n.splice(j,1);
				// }
			// }	
		// };
		for(i=0;i<game.dig.n.length;i++){
			game.dig.n[i] += 1;
		};
		if(holy){
			for(i=0;i<game.size;i++){
				var sid = "s" + i;
				$(document.getElementById(sid)).css({background: getRandomColor()});
			}
		}
		if(game.snake.y[0] == -1 || game.snake.y[0] == 30 || game.snake.x[0] == -1 || game.snake.x[0] == 30){
			fail();
		}
		for(i=1; i<game.size; i++){
			if(game.snake.x[i] == game.snake.x[0] && game.snake.y[i] == game.snake.y[0]){
				fail();
			}
		}
	}else{
		game.ndir = game.dir[0];
		running();
	}
}

function inviswall(){
	if(!iswall && !game.state){
		iswall = true;
		$("#walltoggle").css({background: "yellow"})
	}else if(iswall && !game.state){
		iswall = false;
		$("#walltoggle").css({background: "#065904"})
	}
}

function fail(){
	game.state = false;
	deathanim = true;
	danim();
	clearInterval(timer);
	game.score = (game.size-1) * (game.speedmem + 1);
	$("#gameover").css({opacity: 1});
	$("#gameover").html("<h3>Game Over !<br>Size : " + game.size + "<br>Score : " + game.score + "</h3>")
	if(game.pscore < game.score){
		game.pscore = game.score;
		$("#pscore").html("<h4>Best Score : " + game.pscore + "</h4>");
		writeDoc();
	}
}

function danim () {           
	setTimeout(function () {
		var sid = "s" + incre;
		var elem = $(document.getElementById(sid));
		elem.css({transition: "background 0.5s ease-in-out"});
		elem.css({background: "red",
        "-moz-animation-name":"rotatebox",
        "-moz-animation-duration":"1s",
        "-moz-animation-iteration-count":"1",
            "-moz-animation-fill-mode":"forwards",
        "-webkit-animation-name":"rotatebox",
        "-webkit-animation-duration":"1s",
        "-webkit-animation-iteration-count":"1",
        "-webkit-animation-fill-mode" : "forwards",

        });
		incre++;
		if (incre < game.size) {
			danim();
		}else if (incre == game.size){
			deathanim = false;
		}        
	}, 100)
}

function eat(){
	$("#apple").remove();
	new Audio('eat.mp3').play()
	newfood();
	var si = game.size - 1;
	var x = game.snake.x[si];
	var y = game.snake.y[si];
	game.snake.x[game.size] = x;
	game.snake.y[game.size] = y;
	$(document.createElement("div"))
		.addClass("snake")
		.css({
			left: (x*20),
			top: (y*20),
			background: "yellow",
		})
		.attr("id", "s"+ game.size)
		.appendTo($("#game"));
	var db = game.dir[si];
	growing = true;
	game.growth ++;
	game.dir[game.size] = db;
	game.dig.n.unshift(0)
	game.score = game.size * (game.speedmem + 1)
	$("#score").html("<h4>Score : " + game.score + "</h4>");
}

function newfood(){
	game.food.x = Math.floor(Math.random() * 30);
	game.food.y = Math.floor(Math.random() * 30);
	for(i=0; i<game.size; i++){
		if(game.food.x == game.snake.x[i] && game.food.y == game.snake.y[i]){
			newfood();
		}else if(i == game.size -1){
			newapple();
		}
	}
}

function newapple(){
	$(document.createElement("div"))
		.addClass("food")
		.css({
			left: (game.food.x * 20),
			top: (game.food.y * 20),
		})
		.attr("id", "apple")
		.appendTo($("#game"));
	
}

function pause(){
	if(game.state && !game.pause){
		game.pause = true;
	}else if(game.pause){
		game.pause = false;
	}
}

function lol(){
	if(holy){
		holy = false;
		$("#misc").css({background: "#065904"});
		$(document.getElementsByClassName("snake")).css({background: "yellow"});
		$("#s0").css({background: "red"});
		
	}else{
		holy = true;
		$("#misc").css({background: "yellow"})
	}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//EVENTS//
$(document).ready(function(){
	$(document).on( "keydown", function( e ) {
		if(gameready){
			timer = setInterval(function(){if(game.state && !game.pause){running();}}, game.speed);
			gameready=false
		}			
		if(e.which  == 87 || e.which == 38 ) {				//w, up
			game.ndir = 1;
		}else if(e.which  == 68 || e.which == 39){ 			//d, right
			game.ndir = 2;
		}else if(e.which  == 83 || e.which == 40){			//s, down
			game.ndir = 3;	
		}else if(e.which  == 65 || e.which == 37){			//a, left
			game.ndir = 4;
		}else if(e.which == 32){
			pause()
		}
	});
});

window.onload=function(){
	var save = JSON.parse(localStorage.getItem("CoyotteMC_Snake_Save"));
	if(typeof save.hss === "null" || typeof save.hss == "undefined"){
		game.pscore = 0;
		$("#pscore").html("<h4>Best Score : " + game.pscore + "</h4>")
	}else{
		game.pscore = save.hss;
		document.getElementById("name").value = save.name
		$("#pscore").html("<h4>Best Score : " + game.pscore + "</h4>")
	};
}

window.onbeforeunload = function(){
	save();
}
function save(){
	var nametosave = document.getElementById("name").value
	var save = {
		name: nametosave,
		hss: game.pscore,
	};
	console.log(save)
	localStorage.setItem("CoyotteMC_Snake_Save", JSON.stringify(save));
}

function myslider(ele){
	$("#difficulty").html("<p>Difficulty : " + ele.value + "</p>")
	game.speed = ((11-ele.value)*10)+40;
	
}

//HIGHSCORES MANAGEMENT //

function alphaOnly(event) {
  var key = event.keyCode;
  return ((key >= 65 && key <= 90) || key == 8);
};


function nameinput(value){
	game.name = value;
}

function hsw(){
	if(!game.hsw){
		game.hsw = true;
		$("#hsb").css({background: "yellow"})
		$("#highscorewindow").css({left: "620px"});
		loadDoc();
		
		
	}else{
		game.hsw = false;
		$("#hsb").css({background: "#065904"});
		$("#highscorewindow").css({left: "300px"});
	}
}

function writeDoc(){
	var nametowrite = document.getElementById("name").value;
	var scoretowrite = game.pscore;
	var towrite = nametowrite + scoretowrite +"\n";
	$.ajax({
		type: "POST",
		url: "main.php",
		data: {line: towrite},
		dataType: "text",

		success: function(data) {
			console.log("Success to send :" + data)
			loadDoc();
		},
		error: function(data){
			alert("Error while submiting your Best Score !");
		}

	});
};



function loadDoc() {
	$.ajax({
		type: "GET",
		cache: false,
		url: 'hs.txt', 
		dataType: "text",
		success: function(data) {
			console.log(data)
			var list = $.map(data.split("\n"), function(value, index) {
				return [value];
			});
			list.pop();
			if(list.length > 0){
				game.toplist = [];
				//Séparer le nom du score
				for(i=0;i<list.length;i++){
					var n = list[i].match(/[a-z]+|\d+/ig);
					game.toplist.push({"name": n[0], "score": n[1]});
				}	
				//Trier en fonction du score
				game.toplist.sort(function(a, b) {
					return parseFloat(b.score) - parseFloat(a.score);
				});
				//Enlever les noms qui sont à doubles, et avec un score plus petits
				var todel= [];
				var jk = 0;
				for (i = 0;i<game.toplist.length; i++) {
					for (j=jk;j<game.toplist.length; j++) {
						var namei = game.toplist[i].name;
						var namej = game.toplist[j].name;
						if(namei == namej && i!= j){
							todel.push(j);
						}
						if(j + 1 == game.toplist.length){
							jk ++;
						}
					}
				}
				todel=todel.filter(function(itm,i,a){
					return i==a.indexOf(itm);
				});
				todel.sort(function(a, b){return b-a});
				for(i=0;i<todel.length;i++){
					game.toplist.splice(todel[i], 1)
				}
				
				$("#htable").html("");
				$(document.createElement("tr"))
					.attr("id", "trfirst")
					.css({
						"font-weight": "bold",
					})
					.appendTo("#htable")
				$(document.createElement("td"))
					.attr("id", "td_rank_title")
					.appendTo("#trfirst")
				$("#td_rank_title").html("#");
				$(document.createElement("td"))
					.attr("id", "td_name_title")
					.appendTo("#trfirst")	
				$("#td_name_title").html("Name");
				$(document.createElement("td"))
					.attr("id", "td_score_title")
					.appendTo("#trfirst")
				$("#td_score_title").html("Score");
				for (i=0;i<game.toplist.length;i++){
					$(document.createElement("tr"))
						.attr("id", "tr" + i)
						.appendTo("#htable");
					var obj = game.toplist[i];
					var sc = parseFloat(obj.score)
					var na = obj.name;
					$(document.createElement("td"))
						.attr("id", "td_rank" + i)
						.appendTo("#tr" + i)
					$("#td_rank" + i).html(i+1)
					$(document.createElement("td"))
						.attr("id", "td_name" + i)
						.appendTo("#tr" + i)
						.css({
							"text-align": "left",
						})
					$("#td_name" + i).html(na)
					$(document.createElement("td"))
						.attr("id", "td_score" + i)
						.appendTo("#tr" + i)
					$("#td_score" + i).html(sc)
					
				}
			}
		},
	});
}



