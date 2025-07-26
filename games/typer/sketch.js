var cC = 0;
var cQ = 0;
var splitQuote, parEle, inpEle;
var sT = 0;
var corrIndex = 0;
var startTime, typing, cpm;
var errors = 0;

function setup() {
	var container = select('.game');
	parEle = createP('').addClass('text').parent(container);
	inpEle = createInput('').addClass('entry').input(typed).parent(container).id('in')
	$('#in').attr('placeholder', 'Type the above text');
	newText();
}


function typed() {
	if(!typing) {
		typing = true;
		startTime = millis();
	}
	if(this.value().length > cC) {
		cC ++;
	}else {
		cC = this.value().length;
	}if(sT + getCorrIndex(this.value().slice(0, cC), quotes[cQ].slice(sT, sT + cC)) - 1 == sQ.length - 1) {
		sT += cC;
		cC = 0;
		$('#in').prop('disabled', true)
		inpEle.value('')
		typing = false;
	}
	
	if(typing && cC > 0 && this.value()[cC - 1] == ' ') {
		if(compareStr(this.value().slice(0, cC), quotes[cQ].slice(sT, sT + cC))) {
			sT += cC;
			cC = 0;
			this.value('');
		}
	}

	corrIndex = getCorrIndex(inpEle.value().slice(0, cC), quotes[cQ].slice(sT, sT + cC));
	
	format();
}

function newText() {
	typing = false;
	cC = 0;
	cQ = getRandom(0, quotes.length - 1);
	sQ = quotes[cQ].split('');
	sT = 0;
	errors = 0;
	corrIndex = 0;
	format();
	inpEle.value('')
	$('#in').prop('disabled', false).focus()
}

function compareStr(strA, strB) {
	for(var i = 0; i < strA.length; i ++) {
		if(strA[i] !== strB[i]) {
			return false;
		}
	}
	return true;
}

function getCorrIndex(strA, strB) {
	for(var i = 0; i < strA.length; i ++) {
		if(strA[i] !== strB[i]) {
				return i
		}
	}
	return strA.length;
}



function format() {
	var correct = sQ.slice(0, sT);
	correct = '<span class="correct">' + correct.join('') + '</span>';
	var correctUnd = sQ.slice(sT, sT + corrIndex);
	correctUnd = '<span class="correct"><u>' + correctUnd.join('') + '</u></span>';

	var inCorr = sQ.slice(sT + corrIndex, sT + cC);
	if(!inCorr.includes(' ')) {
		inCorr = '<span class="incorrect"><u>' + inCorr.join('') + '</u></span>';
	}else {
		inCorrU = inCorr.slice(0, inCorr.indexOf(' '));
		inCorrU = '<span class="incorrect"><u>' + inCorrU.join('') + '</u></span>';
		inCorrN = inCorr.slice(inCorr.indexOf(' '));
		inCorrN = '<span class="incorrect">' + inCorrN.join('') + '</span>';
		
		inCorr = inCorrU + inCorrN;
	}
	
	var i = sQ.indexOf(' ', sT)
	var unD = sQ.slice(sT + cC, i);
	var l = unD.length;
	unD = '<u>' + unD.join('') + '</u>'
	
	i = sQ.indexOf(' ', sT + cC);
	var normal = sQ.slice(sT + cC + l);

	var formattedQuote = correct + correctUnd + inCorr + '<span class="typed-cursor">|</span>' + unD + normal.join('');
	parEle.html(formattedQuote);
	
	
	if(millis() - startTime > 2000) {
		cpm = (sT + corrIndex) / ((millis() - startTime) / 60000)
		
	}else {
		cpm = 0;
	}
	select('#cpm').html(Math.round(cpm))
	
}
	
function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
