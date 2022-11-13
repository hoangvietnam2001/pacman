var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var epsilon = 0.001;

var map = {
	tiles: [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
		[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
		[1,6,1,5,5,1,2,1,5,5,5,1,2,1,1,2,1,5,5,5,1,2,1,5,5,1,6,1],
		[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
		[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
		[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
		[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
		[1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
		[1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
		[5,5,5,5,5,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,5,5,5,5,5],
		[5,5,5,5,5,1,2,1,1,2,2,2,4,2,2,4,2,2,2,1,1,2,1,5,5,5,5,5],
		[5,5,5,5,5,1,2,1,1,2,1,1,1,3,3,1,1,1,2,1,1,2,1,5,5,5,5,5],
		[1,1,1,1,1,1,2,1,1,2,1,5,5,5,5,5,5,1,2,1,1,2,1,1,1,1,1,1],
		[8,2,2,2,2,2,2,2,2,2,1,5,5,5,5,5,5,1,2,2,2,2,2,2,2,2,2,8],
		[1,1,1,1,1,1,2,1,1,2,1,5,5,5,5,5,5,1,2,1,1,2,1,1,1,1,1,1],
		[5,5,5,5,5,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,5,5,5,5,5],
		[5,5,5,5,5,1,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,1,5,5,5,5,5],
		[5,5,5,5,5,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,5,5,5,5,5],
		[1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1],
		[1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
		[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
		[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
		[1,6,2,2,1,1,2,2,2,2,2,2,4,2,2,4,2,2,2,2,2,2,1,1,2,2,6,1],
		[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
		[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
		[1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
		[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
		[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
		[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],
	width: 28,
	height: 31
};

var step = calculateStep();
var overhead = (y-31*step)/2;
var overhead1 = (x-28*step)/2;

var assets = "./assets/images/";

var ghosts = [];
var dots = [];

class GameObject extends PIXI.Sprite {
	constructor(x, y, image,size=step) {
		super(PIXI.Texture.from(assets + image));
		this.anchor.set(0.5);
		this.width = size;
		this.height = size;
		this.pos = {
			x: x,
			y: y
		};
		this.updatePos();
	}
	
	updatePos(){
		this.x = overhead1 + step*(this.pos.x+0.5);
		this.y = overhead + step*(this.pos.y+0.5);
	}
}

class Wall extends GameObject {
	constructor(x, y) {
		var image = "wall.png";
		
		if (map.tiles[y+1] && map.tiles[y+1][x] && map.tiles[y+1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x-1] && map.tiles[y][x-1] % 2 == 1
		&& map.tiles[y+1] && map.tiles[y+1][x-1] && map.tiles[y+1][x-1] % 2 == 0) {
			image = "wall_ne.png";
		} else if (map.tiles[y+1] && map.tiles[y+1][x] && map.tiles[y+1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x+1] && map.tiles[y][x+1] % 2 == 1
		&& map.tiles[y+1] && map.tiles[y+1][x+1] && map.tiles[y+1][x+1] % 2 == 0) {
			image = "wall_nw.png";
		} else if (map.tiles[y-1] && map.tiles[y-1][x] && map.tiles[y-1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x-1] && map.tiles[y][x-1] % 2 == 1
		&& map.tiles[y-1] && map.tiles[y-1][x-1] && map.tiles[y-1][x-1] % 2 == 0) {
			image = "wall_se.png";
		} else if (map.tiles[y-1] && map.tiles[y-1][x] && map.tiles[y-1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x+1] && map.tiles[y][x+1] % 2 == 1
		&& map.tiles[y-1] && map.tiles[y-1][x+1] && map.tiles[y-1][x+1] % 2 == 0) {
			image = "wall_sw.png";
		} else if (map.tiles[y+1] && map.tiles[y+1][x] && map.tiles[y+1][x] % 2 == 1
		&& map.tiles[y-1] && map.tiles[y-1][x] && map.tiles[y-1][x] % 2 == 1) {
			image = "wall_ver.png";
		} else if (map.tiles[y] && map.tiles[y][x+1] && map.tiles[y][x+1] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x-1] && map.tiles[y][x-1] % 2 == 1) {
			image = "wall_hor.png";
		} else if (map.tiles[y+1] && map.tiles[y+1][x] && map.tiles[y+1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x-1] && map.tiles[y][x-1] % 2 == 1) {
			image = "wall_ne.png";
		} else if (map.tiles[y+1] && map.tiles[y+1][x] && map.tiles[y+1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x+1] && map.tiles[y][x+1] % 2 == 1) {
			image = "wall_nw.png";
		} else if (map.tiles[y-1] && map.tiles[y-1][x] && map.tiles[y-1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x-1] && map.tiles[y][x-1] % 2 == 1) {
			image = "wall_se.png";
		} else if (map.tiles[y-1] && map.tiles[y-1][x] && map.tiles[y-1][x] % 2 == 1
		&& map.tiles[y] && map.tiles[y][x+1] && map.tiles[y][x+1] % 2 == 1) {
			image = "wall_sw.png";
		}
		
		super(x,y,image);
	}
}

class Gate extends GameObject {
	constructor(x,y) {
		super(x,y,"gate.png");
	}
}

class Dot extends GameObject {
	constructor(x,y) {
		super(x,y,"dot.png");
	}
}

class Tunnel extends GameObject {
	constructor(x,y) {
		super(x,y,"tunnel.png");
	}
}

class Energy extends GameObject {
	constructor(x,y) {
		super(x,y,"energy.png");
	}
}

class MovingObject extends GameObject {
	constructor(x, y,texture,size=step) {
		super(x, y,texture,size);
		this.direction = 0;
	}
	
	computePos() {
		this.pos.x = Math.floor((this.x-overhead1)/step);
		this.pos.y = Math.floor((this.y-overhead)/step);
		
		if ( (this.direction && this.direction % 2 === 0 && Math.abs(((this.x-overhead1)/step-this.pos.x)-0.5) < epsilon)
		|| (this.direction && this.direction % 2 === 1 && Math.abs(((this.y-overhead)/step-this.pos.y)-0.5) < epsilon) ) {
			return true;
		}
		return false;
	}
}
MovingObject.DIRECTION_VECTORS = [
	{x:0,y:0},
	{x:0,y:-1},
	{x:-1,y:0},
	{x:0,y:1},
	{x:1,y:0}
];

class Pacman extends MovingObject {
	constructor(x=13.5, y=23) {
		super(x,y,"pacman.png",2*step);
		this.baseSpeed = 10;
		this.speed = step/20;
		this.lastDirection = 2;
		this.direction = 2;
		this.nextDirection = 0;
	}
	
	move() {
		if (this.x <= overhead1 + step*0.6 && this.direction === 2) {
			this.x += (map.width)*step;
		} else if (this.x >= overhead1 + (map.width-0.6)*step && this.direction === 4) {
			this.x -= (map.width)*step;
		}
		
		var temp;
		
		if (this.direction && this.nextDirection && (this.direction+this.nextDirection) % 2 == 0) {
			this.direction = this.nextDirection;
		}
		switch(this.direction) {
			case 1:
				this.y -= this.speed;
				break;
			case 2:
				this.x -= this.speed;
				break;
			case 3:
				this.y += this.speed;
				break;
			case 4:
				this.x += this.speed;
				break;
			default:
				temp = MovingObject.DIRECTION_VECTORS[this.nextDirection];
				if (this.nextDirection && map.tiles[this.pos.y+temp.y]
				&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x]
				&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x] % 2 === 0) {
					this.direction = this.nextDirection;
					this.nextDirection = 0;
				}
				return;
		}
		if (this.computePos()) {
			temp = MovingObject.DIRECTION_VECTORS[this.nextDirection];
			if (this.nextDirection && map.tiles[this.pos.y+temp.y]
			&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x]
			&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x] % 2 === 0) {
				this.direction = this.nextDirection;
				this.nextDirection = 0;
			} else {
				temp = MovingObject.DIRECTION_VECTORS[this.direction];
				if (!(this.direction && map.tiles[this.pos.y+temp.y]
				&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x]
				&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x] % 2 === 0)) {
					this.lastDirection = this.direction;
					this.direction = 0;
				}
			}
		}
	}
}

class Ghost extends MovingObject {
	constructor(x, y) {
		super(x,y,"ghost.png",2*step);
		this.speed = step/20;
		this.direction = 2;
		this.dirChangeFlag = false;
		this.scatterTarget();
		this.takeTurn = Ghost.scatterMove.bind(this);
		setTimeout(this.chase.bind(this), 5000);
	}
	
	static scatterMove() {
		this.move();
	}
	
	static chaseMove() {
		this.chaseTarget();
		this.move();
	}
	
	chaseTarget() {
		this.target = {
			x: 0,
			y: 0
		};
	}
	
	scatterTarget() {
		this.target = {
			x: 0,
			y: 0
		};
	}
	
	rev() {
		this.direction += 2;
		if (this.direction > 4) {
			this.direction -= 4;
		}
	}
	
	chase() {
		this.takeTurn = Ghost.chaseMove.bind(this);
		this.rev();
		setTimeout(this.scatter.bind(this), 20000);
	}
	
	scatter() {
		this.scatterTarget();
		this.takeTurn = Ghost.scatterMove.bind(this);
		this.rev();
		setTimeout(this.chase.bind(this), 5000);
	}
	
	move() {
		var temp;
		
		if (this.x <= overhead1+step*0.6 && this.direction === 2) {
			this.x += (map.width)*step;
			return;
		} else if (this.x >= overhead1+(map.width-0.6)*step && this.direction === 4) {
			this.x -= (map.width)*step;
			return;
		}
		
		if (this.computePos()) {
			if (this.dirChangeFlag) {
				this.dirChangeFlag = false;
				switch(this.direction) {
					case 1:
						this.y -= this.speed;
						break;
					case 2:
						this.x -= this.speed;
						break;
					case 3:
						this.y += this.speed;
						break;
					case 4:
						this.x += this.speed;
						break;
				}
			} else {
				var dir = 0;
				var minDistance = 1800;
				var i = 1;
				if (map.tiles[this.pos.y][this.pos.x] == 4) {
					i++;
				}
				for (; i < MovingObject.DIRECTION_VECTORS.length; i++) {
					temp = MovingObject.DIRECTION_VECTORS[i];
					if ( ( i === this.direction || (i+this.direction)%2 === 1 ) && map.tiles[this.pos.y+temp.y]
					&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x]
					&& map.tiles[this.pos.y+temp.y][this.pos.x+temp.x] % 2 === 0) {
						var distance = ((this.pos.x+temp.x)-(this.target.x))**2 + ((this.pos.y+temp.y)-(this.target.y))**2;
						if (distance < minDistance) {
							minDistance = distance;
							dir = i;
						}
					}
				}
				if (dir === this.direction || dir === 0) {
					switch(this.direction) {
						case 1:
							this.y -= this.speed;
							break;
						case 2:
							this.x -= this.speed;
							break;
						case 3:
							this.y += this.speed;
							break;
						case 4:
							this.x += this.speed;
							break;
					}
				} else {
					this.direction = dir;
					this.dirChangeFlag = true;
				}
			}
		} else {
			switch(this.direction) {
				case 1:
					this.y -= this.speed;
					break;
				case 2:
					this.x -= this.speed;
					break;
				case 3:
					this.y += this.speed;
					break;
				case 4:
					this.x += this.speed;
					break;
			}
		}
	}
}

class Blinky extends Ghost {
	constructor() {
		super(13,11);
		this.tint = 0xFF0000;
	}
	
	chaseTarget() {
		this.target = {
			x: pacman.pos.x,
			y: pacman.pos.y
		};
	}
	
	scatterTarget() {
		this.target = {
			x: 27,
			y: 0
		};
	}
}

class Pinky extends Ghost {
	constructor() {
		super(14,11);
		this.tint = 0xFFC0CB;
	}
	
	chaseTarget() {
		this.target = {
			x: pacman.pos.x,
			y: pacman.pos.y
		};
		switch((pacman.direction ? pacman.direction : pacman.lastDirection)) {
			case 1:
				this.target.x -= 4;
				this.target.y -= 4;
				break;
			case 2:
				this.target.x -= 4;
				break;
			case 3:
				this.target.y += 4;
				break;
			case 4:
				this.target.x += 4;
		}
	}
	
	scatterTarget() {
		this.target = {
			x: 0,
			y: 0
		};
	}
}

class Inky extends Ghost {
	constructor() {
		super(15,11);
		this.tint = 0x00FFFF;
	}
	
	chaseTarget() {
		var temp = {
			x: pacman.pos.x,
			y: pacman.pos.y
		};
		switch((pacman.direction ? pacman.direction : pacman.lastDirection)) {
			case 1:
				temp.x -= 2;
				temp.y -= 2;
				break;
			case 2:
				temp.x -= 2;
				break;
			case 3:
				temp.y += 2;
				break;
			case 4:
				temp.x += 2;
		}
		this.target = {
			x: 2*temp.x-blinky.pos.x,
			y: 2*temp.y-blinky.pos.y
		};
	}
	
	scatterTarget() {
		this.target = {
			x: 27,
			y: 30
		};
	}
}

class Clyde extends Ghost {
	constructor() {
		super(12,11);
		this.tint = 0xFFA500;
	}
	
	chaseTarget() {
		if ((this.pos.x-pacman.pos.x)**2+(this.pos.y-pacman.pos.y)**2 > 64) {
			this.target = {
				x: pacman.pos.x,
				y: pacman.pos.y
			};
		} else {
			this.target = {
				x: 0,
				y: 30
			};
		}
	}
	
	scatterTarget() {
		this.target = {
			x: 0,
			y: 30
		};
	}
}

function calculateStep(){
    var step = x / 28;
    var ref = step * 31;
    var dec = 0;
    if(ref > y){
        var dec = (ref - y) / 28;
    }
    
    return step - dec;
}

window.onload = function(){
	app = new PIXI.Application({width: x, height: y, backgroundColor : 0x000000});
	document.body.appendChild(app.view);
	
	for (var j = 0; j < map.height; j++) {
		for (var i = 0; i < map.width; i++) {
			switch (map.tiles[j][i]) {
				case 1:
					var wall = new Wall(i,j);
					app.stage.addChild(wall);
					break;
				case 2:
				case 4:
					var dot = new Dot(i,j);
					dots.push(dot);
					app.stage.addChild(dot);
					break;
				case 3:
					var gate = new Gate(i,j);
					app.stage.addChild(gate);
					break;
				case 6:
					var energy = new Energy(i,j);
					dots.push(energy);
					app.stage.addChild(energy);
					break;
				case 8:
					var tunnel = new Tunnel(i,j);
					app.stage.addChild(tunnel);
					break;
			}
		}
	}
	
	blinky = new Blinky();
	pinky = new Pinky();
	inky = new Inky();
	clyde = new Clyde();
	
	ghosts.push(blinky);
	ghosts.push(pinky);
	ghosts.push(inky);
	ghosts.push(clyde);
	
	app.stage.addChild(blinky);
	app.stage.addChild(pinky);
	app.stage.addChild(inky);
	app.stage.addChild(clyde);
	
	pacman = new Pacman();
	app.stage.addChild(pacman);
	
	app.ticker.add(function() {
		pacman.move();
		for (var i = 0; i < ghosts.length; i++) {
			ghosts[i].takeTurn();
			
			if (ghosts[i].pos.x === pacman.pos.x && ghosts[i].pos.y === pacman.pos.y) {
				window.location.reload(true);
			}
		}
		dots = dots.filter(function(dot) {
			if (dot.pos.x === pacman.pos.x && dot.pos.y === pacman.pos.y) {
				app.stage.removeChild(dot);
				return false;
			} else {
				return true;
			}
		});
		
	});
	
	g.onkeydown = function(event) {
		switch(event.key) {
			case "ArrowUp":
				pacman.nextDirection = 1;
				break;
			case "ArrowLeft":
				pacman.nextDirection = 2;
				break;
			case "ArrowDown":
				pacman.nextDirection = 3;
				break;
			case "ArrowRight":
				pacman.nextDirection = 4;
				break;
			default:
				// Do nothing
		}
	};
}
