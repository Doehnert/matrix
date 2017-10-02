var symbolSize = 26;
var streams = [];

function setup() {
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	textSize(symbolSize);

	var x = 0;
	for (var i=0;i<=width/symbolSize;i++) {
		var stream = new Stream();
		stream.generateSymbols(x, random(-1000, 0));
		streams.push(stream);
		x += symbolSize;
	}
}

function draw() {
	background(0, 150);
	streams.forEach(function(stream) {
		stream.render();
	});
}

class Symbol {
	constructor(x, y, speed, first){
		this.x = x;
		this.y = y;
		this.value;
		this.speed = speed;
		this.switchInterval = round(random(15, 20));
		this.first = first;
	}

	setToRandomSymbol() {
		if (frameCount % this.switchInterval == 0) {
			this.value = String.fromCharCode(
				0x30A0 + round(random(0, 96))
			);
		}
	}

	rain() {
		if (this.y >= height) {
			this.y = 0;
		} else {
			this.y += this.speed;
		}
	}
}

class Stream {
	constructor() {
		this.symbols = [];
		this.totalSymbols = round(random(5, 30));
		this.speed = random(3, 5);
	}

	generateSymbols(x, y) {
		var first = round(random(0, 4)) == 1;
		for (var i=0;i<=this.totalSymbols;i++) {
			var symbol = new Symbol(x, y, this.speed, first);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
		}
	}

	render() {
		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(180, 255, 180);
			} else {
				fill(0, 255, 70);
			}
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});
	}
}