"use strict";
let Map = require('./marsmap.js');

/**
 * Create a rover from given x,y grids and a direction
 * Expects it in the form of 2 3 N 
 * @param  {int} x         	The starting x point of the rover
 * @param  {int} y         	The starting y point of the rover
 * @param  {char} direction 	Cardinal direction of the rover
 * @return {MarsRover}		Returns an inflated MarsRover
 */
class MarsRover {
	constructor(x, y, direction, map){
	this.x = parseInt(x, 10);
	this.y = parseInt(y, 10);
	this.direction = ['N', 'E', 'S', 'W'].findIndex((element, index) => {
		if(element === direction) {
			return true;
		}else if( element != direction && index === 3){
			// TODO return an error object and force the client to handle it.
			// By default set the direction to facing west
			return true;
		}});
	this.map = new Map(map);
	}


	debugLocation() {
		console.log(`I am now facing ${this.getDirection()} @ ${this.x}, ${this.y}`);
	}

	/**
	 * Get the X position
	 * @return {int} X position
	 */
	getX(){
		return this.x;
	}

	/**
	 * Get the Y position
	 * @return {int} Y position
	 */
	getY(){
		return this.y;
	}

	/**
	 * Get the x & y postion
	 * @return {Object} Object with x and y
	 */
	getLocation(){
		return {x: this.x, y: this.y}
	}

	/**
	 * Get the combined x and y values
	 * @return {'char'} N, E, S, W 
	 */
	getDirection(){
		let facing = ['N', 'E', 'S', 'W'];
		return facing[this.direction];
	}


	/**
	 * Turn the rover left
	 */
	turnLeft(){
		/**
		 * Since we have already converted the direction the rover
		 * is facing from an array we want to keep that assiciation
		 * by wrapping around at the outer bounds.
		 */ 
		
		if(this.direction === 3){
			this.direction = 0;
		}else {
			this.direction += 1;
		}

		this.debugLocation();
	}

	/**
	 * Turn the rover right
	 */
	turnRight(){
		/**
		 * Since we have already converted the direction the rover
		 * is facing from an array we want to keep that assiciation
		 * by wrapping around at the outer bounds.
		 */ 
		
		if(this.direction === 0 ){
			this.direction = 3;
		}else{
			this.direction -= 1;
		}

		this.debugLocation();
	}

	/**
	 * Move the rover forward
	 */
	moveForward(){
		/**
		 * In place of using a switch statement I can use an array to store
		 * the direction value of the movements. In this case I have to preform
		 * 2 sets of addition with each action. The values are flipped for forwards direction.
		 *
		 * If the rover is facing NORTH we are traveling along the Y axis and therefore 
		 * need to increment the y value. 
		 */
		//			    N  E  S  W
		const xplane = [0, 1, 0,-1];
		const yplane = [1, 0,-1, 0];

		let new_location = this.map.moveRover({'x':this.x, 'y':this.y}, {'x': xplane[this.direction], 'y':yplane[this.direction]});
		
		this.x = new_location.x;
		this.y = new_location.y;

		this.debugLocation();
	}

	/**
	 * Move the rover backward
	 */
	moveBackward(){
		/**
		 * In place of using a switch statement I can use an array to store
		 * the direction value of the movements. In this case I have to preform
		 * 2 sets of addition with each action. The values are flipped for forwards direction.
		 *
		 * If the rover is facing NORTH we are traveling along the Y axis and therefore 
		 * need to decrement the y value. 
		 */
		//             N   E  S  W				
		const yplane = [-1, 0, 1, 0];
		const xplane = [ 0,-1, 0, 1];
		
		let new_location = this.map.moveRover({'x':this.x, 'y':this.y}, {'x': xplane[this.direction], 'y':yplane[this.direction]});
		
		this.x = new_location.x;
		this.y = new_location.y;

		this.debugLocation();
	}

}

module.exports = MarsRover