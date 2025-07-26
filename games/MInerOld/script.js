//barre fatigue
var optclick = 0;
var infoclick = 0;
var statsclick = 0;
var smithclick = 0;
var villageclick = 0;
var pickanim = 1;
//options
var sound = 1;
var tooltip = 1;

var hp = 10;
var durability = 10;
var solidity = 0;
var lvlrock = 1;
var ngold = 0;
var nstone = 0;
var lvlrocksav = lvlrock;
var pickpower = 1;
var pickdurability = 100;
var nenergy = 100;
var totalclick = 0;
var durabilitylvl = 20;

var costbpickpower = 10;
var costbpickrepair = 0;
var costbpickdurability = 30;

////village
var nstonetosell = 0;
var nstonetosellgold = 0;
var maxworker = 5;
var lvlminefacility = 1;
var nworker = 0;
var workerefficiency = 1;
var workersps = workerefficiency * nworker
var costbworker = 10;
var costlvlminefacility = 50;
var lvlworker = 1;
var costlvlworker = 100;


$(document).mousemove(function(e){
	if(e.pageX > 100 && e.pageY > 180 && e.pageX < 356 && e.pageY < 436 && pickanim == 1){	
		document.getElementById("pickaxe").style.visibility = "visible";
		$("#pickaxe").css({left:e.pageX-20, top:e.pageY-120});
	}else{
		document.getElementById("pickaxe").style.visibility = "hidden";
	}
	if(tooltip == 1){
		var i = e.target.id;
		var tt = document.getElementById("tooltip"+i);	
		tt.style.visibility = "visible";
		tt.style.opacity = "1";
		$(tt).css({left:e.pageX+10, top:e.pageY+10});
		document.getElementById(i).onmouseout=function(){
			tt.style.visibility= "hidden";
			tt.style.opacity = "0";
		}
	}
});

		
////////////////
/////Update/////
////////////////
function update(){
	document.getElementById("hp").innerHTML = Math.round((hp*100)/10)/10;
	document.getElementById("nstone").innerHTML = Math.round((nstone*100)/10)/10;
	document.getElementById("lvlrock").innerHTML = lvlrock + " " + "m";
	document.getElementById("lvlrockmenu").innerHTML = lvlrock + " " + "m";
	document.getElementById("pickpower").innerHTML = Math.round((pickpower*100)/10)/10;
	document.getElementById("pickdurability").innerHTML = Math.round((pickdurability*100)/100) + "%";
	document.getElementById("pickdurability").style.width= (380 * pickdurability / 100) + "px";
	if(pickdurability < 15){
		document.getElementById("pickdurability").style.backgroundColor = "red";
	}else{
		document.getElementById("pickdurability").style.backgroundColor = "green";
	}
	document.getElementById("energy").innerHTML = Math.round((nenergy*100)/100) + "%";
	document.getElementById("energy").style.width= (380 * nenergy / 100) + "px";
	if(nenergy < 15){
		document.getElementById("energy").style.backgroundColor = "red";
	}else{
		document.getElementById("energy").style.backgroundColor = "green";
	}
	document.getElementById("totalclick").innerHTML = totalclick;
	document.getElementById("costbpickpower").innerHTML = costbpickpower + " " + "Stone";
	document.getElementById("costbpickdurability").innerHTML = costbpickdurability + " " + "Stone";
	if (pickdurability == 100){
		costbpickrepair = Math.round(100*((100 - pickdurability) * pickpower / 5)/100);
	}else{
		costbpickrepair = Math.round(100*((100 - pickdurability) * pickpower / 5)/100) + 1;
	}
	document.getElementById("costbpickrepair").innerHTML = costbpickrepair + " " + "Stone";
	document.getElementById("nstonetosell").innerHTML = nstonetosell + " " + "Stone";
	nstonetosellgold = Math.round((nstonetosell*10)/100);
	document.getElementById("nstonetosellgold").innerHTML = nstonetosellgold + " " + "Gold";
	document.getElementById("ngold").innerHTML = ngold;
	document.getElementById("maxworker").innerHTML = maxworker + " " + "Max";
	document.getElementById("nworker").innerHTML = nworker;
	document.getElementById("lvlminefacility").innerHTML = "Level" + " " +lvlminefacility;
	document.getElementById("costbworker").innerHTML = costbworker + " " + "Gold";
	document.getElementById("costlvlminefacility").innerHTML = 	costlvlminefacility + " " + "Gold";
	document.getElementById("lvlworker").innerHTML = "Level" + " " + lvlworker;
	document.getElementById("costlvlworker").innerHTML = costlvlworker + " " + "Gold";
}
////////////////
/////click//////
////////////////
function rockclick(){
	element = document.getElementById("pickaxe");
	element.classList.remove("pickaxe");
	element.offsetWidth = element.offsetWidth;
	element.classList.add("pickaxe");
	if (sound == 1) {
		var x = Math.floor((Math.random() * 5) + 1);
		if(x == 1){
			var audio = new Audio('sound/pick1.wav');
			audio.play();
		} else if(x == 2){
			var audio = new Audio('sound/pick2.wav');
			audio.play();
		} else if(x == 3){
			var audio = new Audio('sound/pick3.wav');
			audio.play();
		} else if(x == 4){
			var audio = new Audio('sound/pick4.wav');
			audio.play();
		} else if(x == 5){
			var audio = new Audio('sound/pick5.wav');
			audio.play();
		}
	}
	hp = hp - pickpower;
	if(hp <= 0){addstone();}
	pickdurability -= 0.05 + ((lvlrocksav / durabilitylvl) / pickpower) * 2;
	nenergy -= 0.2;
	totalclick += 1;
	update();
}


function addstone(){
	nstone = nstone + 1.5 * lvlrocksav;
	hp = lvlrock * 8 + 2;
	draw();
	lvlrocksav = lvlrock;
}
function draw(){
	var c=document.getElementById("rect");
	var ctx=c.getContext("2d");
	ctx.shadowColor = "black";
	ctx.shadowOffsetX = 5; 
	ctx.shadowOffsetY = 5; 
	ctx.shadowBlur = 7;
	ctx.font = "25px 'Helvetica'";
	ctx.textBaseline = 'alphabetic';
	ctx.fillText("+"+1.5*lvlrocksav, 100, 113);
	var alpha = 1.0,   // full opacity
    interval = setInterval(function () {
        ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        alpha = alpha - 0.05; // decrease opacity (fade out)
        if (alpha < 0) {
            clearInterval(interval);
        }
    }, 50); 
	window.requestAnimationFrame(draw);
}





/* 	var c=document.getElementById("rect");
	var ctx = c.getContext("2d"),
		dashLen = 220, dashOffset = dashLen, speed = 5,
		txt = "+"+lvlrocksav*1.5, x = 30, i = 0;

	ctx.font = "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif"; 
	ctx.lineWidth = 5; 
	ctx.lineJoin = "round"; 
	ctx.globalAlpha = 2/3;
	ctx.strokeStyle = ctx.fillStyle = "white";
	(function loop() {
	  ctx.clearRect(x, 0, 60, 150);
	  ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
	  dashOffset -= speed;                                         // reduce dash length
	  ctx.strokeText(txt[i], x, 90);                               // stroke letter

	  if (dashOffset > 0) requestAnimationFrame(loop);             // animate
	  else {
		ctx.fillText(txt[i], x, 90);                               // fill final letter
		dashOffset = dashLen;                                      // prep next char
		x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
		ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
		ctx.rotate(Math.random() * 0.005);                         // random rotation
		if (i < txt.length) requestAnimationFrame(loop);
	  }
	})();
} */


///////////////////
/////blacksmith////
///////////////////
function levelrockup(){
	lvlrock ++;
	document.getElementById("lvlrockmenu").style.color = "green";
	update();
	$("#lvlrockmenu").on("transitionend", function(){
		document.getElementById("lvlrockmenu").style.color = "black";
		update();
	});
}

function levelrockdown(){
	if(lvlrock != 1){
		lvlrock --;
		document.getElementById("lvlrockmenu").style.color = "green";
		update()
		$("#lvlrockmenu").on("transitionend", function(){
			document.getElementById("lvlrockmenu").style.color = "black";
			update();
		});
	}else{
		document.getElementById("lvlrockmenu").style.color = "red";
		update()
		$("#lvlrockmenu").on("transitionend", function(){
			document.getElementById("lvlrockmenu").style.color = "black";
			update();
		});
	}
}

function bpickpower(){
	if(nstone >= costbpickpower){
		nstone -= costbpickpower;
		costbpickpower = Math.round((100*costbpickpower * 1.15)/100);
		pickpower = pickpower * 1.1;
		update();
	}else{
		document.getElementById("costbpickpower").style.color = "red";
		update();
		$("#costbpickpower").on("transitionend", function(){
			document.getElementById("costbpickpower").style.color = "black";
			update();
		});
	}
}

function bpickdurability(){
	if(nstone >= costbpickdurability){
		nstone -= costbpickdurability;
		costbpickdurability = Math.round((100*costbpickdurability * 1.15)/100);
		durabilitylvl = durabilitylvl * 1.1;
		update();
	}else{
		document.getElementById("costbpickdurability").style.color = "red";
		update();
		$("#costbpickdurability").on("transitionend", function(){
			document.getElementById("costbpickdurability").style.color = "black";
			update();
		});
	}
}

function bpickrepair(){
	if (pickdurability == 100){
		costbpickrepair = Math.round(100*((100 - pickdurability) * pickpower / 5)/100);
	}else{
		costbpickrepair = Math.round(100*((100 - pickdurability) * pickpower / 5)/100) + 1;
	}
	if(nstone >= costbpickrepair && pickdurability != 100){
		nstone -= costbpickrepair;
		pickdurability = 100;
		update();
	}else{
		document.getElementById("costbrepair").style.color = "red";
		update();
		$("#costbpickrepair").on("transitionend", function(){
			document.getElementById("costbrepair").style.color = "black";
			update();
		});
	}
}

//////////////////
//////village/////
//////////////////
function bstonetosellx10(){
	if(nstonetosell + 10 <= nstone){
		nstonetosell += 10;
		update();
	}else{
		document.getElementById("bstonetosellx10").style.color = "red";
		update();
		$("#bstonetosellx10").on("transitionend", function(){
			document.getElementById("bstonetosellx10").style.color = "#2E00C5";
			update();
		});
	}
}
function bstonetosellx100(){
	if(nstonetosell + 100 <= nstone){
		nstonetosell += 100;
		update();
	}else{
		document.getElementById("bstonetosellx100").style.color = "red";
		update();
		$("#bstonetosellx100").on("transitionend", function(){
			document.getElementById("bstonetosellx100").style.color = "#2E00C5";
			update();
		});
	}
}
function bstonetosellall(){
	nstonetosell = Math.floor(nstone/10)*10;
	update();
}
function bstonetosell(){
	if(nstone - nstonetosell < 0){
		document.getElementById("nstonetosell").style.color = "red";
		update();
		$("#nstonetosell").on("transitionend", function(){
			document.getElementById("nstonetosell").style.color = "black";
			update();
			nstonetosell = 0;
		});
	}else{
		ngold += nstonetosellgold;
		nstone -= nstonetosell;
		nstonetosell = 0;
		update();
	}
}
function bworker(){
	if(ngold >= costbworker){
		if(nworker < maxworker){
			ngold -= costbworker;
			nworker ++;
			if(nworker == 1){
				setInterval(worker, 1000);
				document.getElementById("worker").style.visibility = "visible";
			}
			update();
		}else{
			document.getElementById("maxworker").style.color = "red";
			update();
			$("#maxworker").on("transitionend", function(){
				document.getElementById("maxworker").style.color = "black";
				update();
			});
		}
	}else{
		document.getElementById("costbworker").style.color = "red";
		update();
		$("#costbworker").on("transitionend", function(){
			document.getElementById("costbworker").style.color = "black";
			update();
		});
	}
}

function bminefacility(){
	if(lvlminefacility == 50){
		document.getElementById("lvlminefacility").style.color = "red";
		update();
		$("#lvlminefacility").on("transitionend", function(){
			document.getElementById("lvlminefacility").style.color = "black";
			update();
		});
	}else if(costlvlminefacility <= ngold){
		ngold -= costlvlminefacility;
		lvlminefacility ++;
		maxworker = lvlminefacility * 5;
		costlvlminefacility = 50 * lvlminefacility;
		update();
	}else if (costlvlminefacility > ngold){
		document.getElementById("costlvlminefacility").style.color = "red";
		update();
		$("#costlvlminefacility").on("transitionend", function(){
			document.getElementById("costlvlminefacility").style.color = "black";
			update();
		});
	}
}
function blvlworker(){
	if(costlvlworker <= ngold){
		ngold -= costlvlworker;
		lvlworker ++;
		workerefficiency = lvlworker * 1;
		costlvlworker = 2 * costlvlworker;
		update();
	}else{
		document.getElementById("costlvlworker").style.color = "red";
		update();
		$("#costlvlworker").on("transitionend", function(){
			document.getElementById("costlvlworker").style.color = "black";
			update();
		});
	}
}

function worker(){
	hp = hp - workerefficiency * nworker;
	if(hp <= 0) {
		addstone();
	}
	update();
}

////////////////
//////MENUS/////
////////////////

function smith(){
	if(smithclick == 0){
		document.getElementById("smith").style.visibility = "visible";
		document.getElementById("smith").style.opacity = "1";
		smithclick ++;
	}else{
		document.getElementById("smith").style.visibility = "hidden";
		document.getElementById("smith").style.opacity = "0";
		smithclick --;
	}
}
function village(){
	if(villageclick == 0){
		document.getElementById("village").style.visibility = "visible";
		document.getElementById("village").style.opacity = "1";
		villageclick ++;
	}else{
		document.getElementById("village").style.visibility = "hidden";
		document.getElementById("village").style.opacity = "0";
		villageclick --;
	}
}

function options(){
	if(optclick == 0){
		if(infoclick ==1){
			document.getElementById("zinfo").style.visibility = "hidden";
			document.getElementById("zinfo").style.opacity = "0";
			pickanim --;
			infoclick --;
		}else if(statsclick == 1){
			document.getElementById("zstats").style.visibility = "hidden";
			document.getElementById("zstats").style.opacity = "0";
			pickanim --;
			statsclick --;
		}
		document.getElementById("zoption").style.visibility = "visible";
		document.getElementById("zoption").style.opacity = "1";
		pickanim ++;
		optclick ++;
	}else{
		document.getElementById("zoption").style.visibility = "hidden";
		document.getElementById("zoption").style.opacity = "0";
		pickanim --;
		optclick --;
	}
}

function info(){
	if(infoclick == 0){
		if(optclick == 1){
			document.getElementById("zoption").style.visibility = "hidden";
			document.getElementById("zoption").style.opacity = "0";
			pickanim --;
			optclick --;
		}else if(statsclick == 1){
			document.getElementById("zstats").style.visibility = "hidden";
			document.getElementById("zstats").style.opacity = "0";
			pickanim --;
			statsclick --;
		}
		document.getElementById("zinfo").style.visibility = "visible";
		document.getElementById("zinfo").style.opacity = "1";
		pickanim ++;
		infoclick ++;
	}else{
		document.getElementById("zinfo").style.visibility = "hidden";
		document.getElementById("zinfo").style.opacity = "0";
		pickanim --;
		infoclick --;
	}
}

function stats(){
	if(statsclick == 0){
		if(optclick == 1){
			document.getElementById("zoption").style.visibility = "hidden";
			document.getElementById("zoption").style.opacity = "0";
			pickanim --;
			optclick --;
		}else if(infoclick == 1){
			document.getElementById("zinfo").style.visibility = "hidden";
			document.getElementById("zinfo").style.opacity = "0";
			pickanim --;
			infoclick --;
		}
		document.getElementById("zstats").style.visibility = "visible";
		document.getElementById("zstats").style.opacity = "1";
		pickanim ++;
		statsclick ++;
	}else{
		document.getElementById("zstats").style.visibility = "hidden";
		document.getElementById("zstats").style.opacity = "0";
		pickanim --;
		statsclick --;
	}
}

function bmute(){
	if(sound == 0){
		sound++;
	}else{
		sound--;
	}
}
function btooltip(){
	if(tooltip == 0){
		tooltip += 1;
	}else{
		tooltip -= 1;
	}
}

