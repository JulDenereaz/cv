var nmen = 1;
var nwomen = 1;
var npop = nmen + nwomen;
var nchild = 0;
var npoplim = 10;
var nyear = 0;
var nmeat = 10;
var nwood = 0;
var nstone = 0;
var nlvlmeat = 0;
var nlvlstone = 0;
var nlvlwood = 0;
var nprodwood = 0;
var nprodstone = 0;
var nprodmeat = 0;
var nclickstone = 1;
var nclickwood = 1;
var nclickmeat = 1;

var imeat = 0;
var istone = 0;
var iwood = 0;
var binfo = 0;

setInterval(function(){prod();}, 1000);

function update(){
	document.getElementById("npoplim").innerHTML = npoplim;
	document.getElementById("npop").innerHTML = npop;
	document.getElementById("nchild").innerHTML = nchild;
	document.getElementById("nwomen").innerHTML = nwomen;
	document.getElementById("nmen").innerHTML = nmen;
	document.getElementById("nmeat").innerHTML = Math.round((nmeat*100)/100);
	document.getElementById("nstone").innerHTML = Math.round((nstone*100)/100);
	document.getElementById("nwood").innerHTML = Math.round((nwood*100)/100);
	document.getElementById("nprodwood").innerHTML = Math.round(nprodwood*10)/10;
	document.getElementById("nprodstone").innerHTML = Math.round(nprodstone*10)/10;
	document.getElementById("nprodmeat").innerHTML = Math.round(nprodmeat*10)/10;
	document.getElementById("nyear").innerHTML = nyear;
	document.getElementById("nlvlmeat").innerHTML = nlvlmeat;
	document.getElementById("nlvlwood").innerHTML = nlvlwood;
	document.getElementById("nlvlstone").innerHTML = nlvlstone;
}


function prod(){
	nmeat += nprodmeat;
	nwood += nprodwood;
	nstone += nprodstone;
	update();
}

function nextyear(){
	if(nmen >= 1 && nwomen >= 1 && nmeat >= nmen*4 + nwomen*4 + nchild*2 && npop < npoplim){
		nmeat = nmeat - (nmen * 4 + nwomen * 4 + nchild * 2);
		while(nchild>0){
			var x = Math.floor((Math.random() * 2) + 1);
			if(x == 1){
				nmen ++;
				nchild --;
			}else{
				nwomen ++;
				nchild --;
			}
		}
		nchild = (2/3) * nwomen;
		nchild = Math.round((nchild*100)/100);
		if(nchild > npoplim - npop){
			nchild = npoplim - npop;
		}
		npop = nchild + nmen + nwomen;
		yhunt = 0;
		ymine = 0;
		nyear ++;
		nprodmeat = nprodmeat + (imeat * nwomen);
		nprodwood = nprodwood + (iwood * nmen);
		nprodstone = nprodstone + (istone * nmen);
		update();
	}
}

function build(){
	if(nwood >= 50){
		nwood = nwood - 50;
		npoplim = npoplim + 5;
		update();
		click();
	}
}
function harv(){
	if(nmen >= 1){
		nwood = nwood + 1 * nclickwood;
		update();
		click();
	}
}

function hunt(){
	if(nwomen >= 1){
		nmeat = nmeat + 1 * nclickmeat;
		update();
	}
}
function mine(){
	if(nmen >= 1){
		nstone = nstone + 1 * nclickstone;
		update();
	}
}

function info(){
	if(binfo == 0){
		document.getElementById("info").style.opacity = "1";
		document.getElementById("info").style.visibility = "visible";
		binfo = 1;
	}else{
		document.getElementById("info").style.opacity = "0";
		document.getElementById("info").style.visibility = "hidden";
		binfo = 0;
	}
}
function woodlvlup(){
	if(nlvlwood <= 9){	
		if(nwood >= 100 + nlvlwood * 100){
			nwood -= (100 + nlvlwood * 100);
			nlvlwood ++;
			iwood += 0.1;
			nprodwood = nprodwood + (iwood * (nmen / 2));
			update();
		}
	}
}

function meatlvlup(){
	if(nlvlmeat <= 9){
		if(nmeat >= 100 + nlvlmeat * 100){
			nmeat -= (100 + nlvlmeat * 100);
			nlvlmeat ++;
			imeat += 0.2;
			nprodmeat = nprodmeat + (imeat * (nwomen / 2));
			update();
		}
	}
}
function stonelvlup(){
	if(nlvlstone <= 9){
		if(nstone >= 100 + nlvlstone * 100){
			nstone -= (100 + nlvlstone * 100);
			nlvlstone++;
			istone += 0.1;
			nprodstone = nprodstone + (istone * (nmen / 2));
			update();
		}
	}
}

//A ajouter: arrondi
//lvl des clicks
//lvl de prod par rapport au nombre d'hommes et de femmes
//animations +wood + meat + stone