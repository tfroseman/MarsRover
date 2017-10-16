'use strict';


module.exports = class MarsRover {
	constructor(x, y, direction){
		this.x = x;
		this.y = y;
		this.direction = ['N', 'E', 'S', 'W'].findIndex(element => {return element === direction});
	}

	debugLocation() {
		console.log(`I am now facing ${this.getDirection()} @ ${this.x} , ${this.y}`);
	}
	
	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	getLocation(){
		return {x: this.x, y: this.y}
	}

	getDirection(){
		var facing = ['N', 'E', 'S', 'W'];
		return facing[this.direction];
	}

	turnLeft(){
		if(this.direction === 3){
			this.direction = 0;
		}else {
			this.direction += 1;
		}

		this.debugLocation();
	}

	turnRight(){
		if(this.direction === 0 ){
			this.direction = 3;
		}else{
			this.direction -= 1;
		}

		this.debugLocation();
	}

	moveForward(){
		this.y += 1;

		this.debugLocation();
	}

	moveBackward(){
		this.y -= 1;

		this.debugLocation();
	}

	
}