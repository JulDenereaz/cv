var game ={
	dimension:{
		wide:30,
		high:20,
	},
	op: false,
	time: 0,
	started:false,
	ready: false,
	mine :{
		xy:[],
		n:0,
		ntot:100,
	},
	flags: {
		xy: [],
		
	},
	ques: {
		xy:[],
	},
	cases:[],
	firstclick:true,
}
var x,y,incre;
$(document).ready(function(){
	window.onload=function(){
		game.ready = true;
		newgame();
	}
});


function myslider(ele){
	if(ele.id == "inputn"){
		$("#nmine").html(ele.value)
	}else if(ele.id == "inputx"){
		$("#xnum").html("Width : " + ele.value + " Tiles")
	}else if(ele.id == "inputy"){
		$("#ynum").html("Height : " + ele.value + " Tiles")	
	}
	
	var inputxvalue = document.getElementById("inputx").value;
	var inputyvalue = document.getElementById("inputy").value;
	var minemax = (inputxvalue * inputyvalue) - 1;
	var eleinputn = document.getElementById("inputn");
	$(eleinputn).attr("max", minemax);
	var inputnvalue = eleinputn.value
	if(minemax <= inputnvalue){
		eleinputn.value = minemax;
		$("#nmine").html(inputnvalue);
	}
		
	
}




function options(){
	if(!game.op){
		$("#options").css({opacity : "1", "pointer-events": ""})
		game.op = true;
	}else{
		$("#options").css({opacity: "0", "pointer-events": "none"})
		game.op = false;
	}
}


function update(){
	game.dimension.wide = $(document.getElementById("inputx")).val();
	game.dimension.high = $(document.getElementById("inputy")).val();
	game.mine.ntot = $(document.getElementById("inputn")).val();
	if(game.dimension.wide<30){
		$("#container").css({
			height: (game.dimension.high*25)+175 + "px", 
			width: 800 + "px", 
			"margin-top": -((game.dimension.high*25)+175)/2 + "px", 
			"margin-left": -400 + "px",
		})
		$("#game").css({
			height: (game.dimension.high*25) + "px",
			width: (game.dimension.wide*25) + "px",
			"margin-left": -(game.dimension.wide*25)/2 + "px",
			
		})
		$("#top").css({
			width: 750+ "px"
		})
	}else{
		$("#container").css({
			height: (game.dimension.high*25)+175 + "px", 
			width: (game.dimension.wide*25)+50 + "px", 
			"margin-top": -((game.dimension.high*25)+175)/2 + "px", 
			"margin-left": -((game.dimension.wide*25)+50)/2 + "px"
		})
		$("#game").css({
			height: (game.dimension.high*25) + "px",
			width: (game.dimension.wide*25) + "px",
			"margin-left": -(game.dimension.wide*25)/2 + "px",
		})
		$("#top").css({
			width: (game.dimension.wide*25)+ "px"
		})
	}
		

}


function newgame(){
	update();
	$("#options").css({opacity : "0", "pointer-events": "none"})
	clearInterval(timer);
	time = 0;
	$("#timer").html(time)
	game.ready = false
	game.started = true;
	incre = 0;
	game.firstclick = true;
	game.mine.xy = [];
	game.ques.xy = [];
	game.flags.xy = [];
	game.cases = [];
	x = 1;
	y = 1;
	$(document.getElementsByClassName("case")).remove();
	for(var x=1;x<=game.dimension.wide;x++){
		for(var y=1;y<=game.dimension.high;y++){	
			$(document.createElement("div"))
				.addClass("case")
				.css({
					top: (y-1)*25,
					left: (x-1)*25,
					"background-size":"25px",
				})
				.attr("id", x + "_" + y)
				.attr("onclick", "discover(this)")
				.attr("oncontextmenu", "flag(this)")
				.appendTo($("#game"));
		}
	}
	game.mine.n = game.mine.ntot;
	$("#bombs").html(game.mine.ntot);
	game.ready=true
	
}



function discover(ele){
	if(game.ready){
		if(game.firstclick){
			timer = setInterval(function(){time++; $("#timer").html(time)}, 1000);
			var i = 1;
			while(i <= game.mine.n){
				var x = Math.floor(Math.random() * game.dimension.wide) + 1;
				var y = Math.floor(Math.random() * game.dimension.high) + 1;
				var did = x + "_" + y;
				if(!game.mine.xy.includes(did) && did != ele.id){
					game.mine.xy.unshift(did);
					i++
				}
			}
			game.firstclick = false;
		}
		if(game.mine.xy.includes(ele.id) && !game.flags.xy.includes(ele.id) && !game.ques.xy.includes(ele.id)){
			$(document.getElementsByClassName("case")).css({"pointer-events": "none"})
			$(ele).css({backgroundImage: "url('img/mine.png')", "background-size":"25px"})
			game.started= false
			clearInterval(timer);
			gameover();
		}else if(!game.flags.xy.includes(ele.id) && !game.cases.includes(ele.id) && !game.ques.xy.includes(ele.id)){
			$(ele)
				.css({
					background: "#C7C7C7", 
					"pointer-events": "none", 
					"z-index":"50",
				}); 
			game.cases.unshift(ele.id)
			$(ele).addClass("open")
			var x = rx(ele.id);
			var y = ry(ele.id);
			$(ele).html(calculatenumber(x,y))
			if(calculatenumber(x,y) == 0){
				$(ele).html("");
				reveal(x,y);
			}else if(calculatenumber(x,y) == 1){
				$(ele).css({color: "blue"});			
			}else if(calculatenumber(x,y) == 2){
				$(ele).css({color: "green"});			
			}else if(calculatenumber(x,y) == 3){
				$(ele).css({color: "red"});			
			}else if(calculatenumber(x,y) == 4){
				$(ele).css({color: "#000059"});			
			}else if(calculatenumber(x,y) == 5){
				$(ele).css({color: "#801500"});			
			}else if(calculatenumber(x,y) == 6){
				$(ele).css({color: "purple"});			
			}else if(calculatenumber(x,y) == 7){
				$(ele).css({color: "#006400"});			
			}else if(calculatenumber(x,y) == 8){
				$(ele).css({color: "orange"});
			}
			win();
		}
	}
}

function win(){
	var nopen = 0;
	$(".open").each(function(){
		nopen++;
	});
	var total = (game.dimension.high*game.dimension.wide) - (game.mine.ntot)
	if(nopen == total){
		for(i=0;i<game.mine.xy.length;i++){
			$(document.getElementsByClassName("case")).css({"pointer-events": "none"})
			var did = game.mine.xy[i]
			$(document.getElementById(did)).css({backgroundImage: "url('img/winflag.gif')", "background-size":"25px"})
		}
	}
}




function gameover(){
	if(!game.started){
		setTimeout(function(){
			ele = $(document.getElementById(game.mine.xy[incre]))
			if(!game.flags.xy.includes(game.mine.xy[incre])){
				ele.css({backgroundImage: "none"})
				ele.css({backgroundImage: "url('img/explosion.gif')"})
			}
			ele = $(document.getElementById(game.mine.xy[incre-6]))
			if(!game.flags.xy.includes(game.mine.xy[incre-6])){
				ele.css({backgroundImage: "none"})
				ele.css({backgroundImage: "url('img/shoot.png')"})
			}
			if(incre-7 > game.mine.ntot-game.flags.xy.length){
				game.started=false;
				clearInterval(timer);
			}else if (incre < game.mine.ntot-game.flags.xy.length){ //vérifier le nombre de drapeaux
				game.mine.n--;
				if(!game.started){
					$("#bombs").html(game.mine.n);
				}
			}
			incre++;
			gameover();
		}, 80);
	}
}

function reveal(x,y){
	y--;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	x++;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	y++;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	y++;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	x--;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	x--;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	y--;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
	y--;
	if(y>=1 && y<=game.dimension.high && x>=1 && x<=game.dimension.wide){
		ele = document.getElementById(x + "_" + y);
		discover(ele);
	}
}

function calculatenumber(x,y){
	var number = 0;
	y--;
	if(game.mine.xy.includes(x + "_" + y)){			//up
		number += 1;
	};
	x++;
	if(game.mine.xy.includes(x + "_" + y)){		//up right
		number += 1;
	};
	y++;
	if(game.mine.xy.includes(x + "_" + y)){			//right
		number += 1;
	};
	y++;
	if(game.mine.xy.includes(x + "_" + y)){		//bot right
		number += 1;
	};
	x--;
	if(game.mine.xy.includes(x + "_" + y)){			//bot 
		number += 1;
	};
	x--;
	if(game.mine.xy.includes(x + "_" + y)){		//bot left
		number += 1;
	};
	y--;
	if(game.mine.xy.includes(x + "_" + y)){			//left
		number +=1;
	};
	y--;
	if(game.mine.xy.includes(x + "_" + y)){		//up left
		number +=1;
	};
	y++;
	x++;
	return(number);
}



function rx(xy){
	if(xy[1] == "_"){
		var x = xy[0];
	}else if(xy[2] == "_"){
		var x = xy[0] + xy[1];
	}
	return(x)
}
function ry(xy){
	if(xy[1] == "_" && xy.length == 3){
		var y = xy[2];
	}else if(xy[1] == "_" && xy.length == 4){
		var y = xy[2] + xy[3];
	}else if(xy[2] == "_" && xy.length == 4){
		var y = xy[3];
	}else if(xy[2] == "_" && xy.length == 5){
		var y = xy[3] + xy[4];
	}
	return(y)
}




function flag(ele){
	if(!game.flags.xy.includes(ele.id) && !game.ques.xy.includes(ele.id)){					//flags
		$(ele).css({backgroundImage: "url('img/flag.gif')", "background-size":"25px"})
		game.flags.xy.unshift(ele.id);
		game.mine.n --;
		$("#bombs").html(game.mine.n);
	}else if(game.flags.xy.includes(ele.id) && !game.ques.xy.includes(ele.id)){				//ques
		$(ele).css({backgroundImage: "none"})
		$(ele).html("?")
		game.ques.xy.unshift(ele.id);
		var index = game.flags.xy.indexOf(ele.id)
		game.flags.xy.splice(index, 1);
		game.mine.n ++;
		$("#bombs").html(game.mine.n);
	}else if(game.ques.xy.includes(ele.id) && !game.flags.xy.includes(ele.id)){				//reset
		var index = game.ques.xy.indexOf(ele.id)
		game.ques.xy.splice(index, 1)
		$(ele).html("")
		
	}
}

