"use strict";
let Map = require('./marsmap.js');


class MarsRover {
	/**
	 * Create a new MarsRover
	 * @param  {int} x            The x position on the map
	 * @param  {int} y            The y position on the map
	 * @param  {string} direction The direction the rover starts facing
	 * @param  {string} map       path to map file
	 * @return {Object}           MarsRover object
	 */
	constructor(x, y, direction, map){
	this.x = parseInt(x, 10);
	this.y = parseInt(y, 10);
	this.direction = ['N', 'E', 'S', 'W'].findIndex((element, index) => {
		if(element === direction) {
			return true;
		}else if( element != direction && index === 3){
			throw new Error('Direction needs to be one of N E S W')
		}});
	this.map = new Map(map);
	}

	// Util class to help debug
	debugLocation() {
		console.log(`I am now facing ${this.getDirection()} @ ${this.x}, ${this.y}`);
	}

	/**
	 * Return the x position
	 * @return {int} The x position
	 */
	getX(){
		return this.x;
	}

	/**
	 * Return the y position
	 * @return {int} The y position
	 */
	getY(){
		return this.y;
	}

	/**
	 * Return the location object
	 * @return {object} The complete position of the rover
	 */
	getLocation(){
		return {x: this.x, y: this.y}
	}

	/**
	 * Return the direction the rover is facing
	 * @return {string} The letter of the direction the rover is facing
	 */
	getDirection(){
		let facing = ['N', 'E', 'S', 'W'];
		return facing[this.direction];
	}

	/**
	 * Turn the rover to the right 
	 */
	turnRight(){
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
	 * Turn the rover to the left
	 */
	turnLeft(){
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
	 * Ask the rover to move forward
	 */
	moveForward(){
		//			    N  E  S  W
		const xplane = [0, 1, 0,-1];
		const yplane = [1, 0,-1, 0];

		// Check the map for any objects in the way.
		// TODO clean this up. Its messy and really verbose
		let new_location = this.map.moveRover({'x':this.x, 'y':this.y}, {'x': xplane[this.direction], 'y':yplane[this.direction]});
		
		// Check if the rover was able to move
		if( this.hasMoved(new_location, {'x':this.x, 'y':this.y})){
			this.x = new_location.x;
			this.y = new_location.y;
		} else {
			// TODO change from thrown error to maybe something else
			throw new Error('Rover has hit an object');
		}

		this.debugLocation();
	}

	/**
	 * Ask the rover to move backward
	 */
	moveBackward(){
		//             N   E  S  W				
		const yplane = [-1, 0, 1, 0];
		const xplane = [ 0,-1, 0, 1];

		// Check the map for any objects in the way.
		// TODO clean this up. Its messy and really verbose
		let new_location = this.map.moveRover({'x':this.x, 'y':this.y}, {'x': xplane[this.direction], 'y':yplane[this.direction]});
		
		if( this.hasMoved(new_location, {'x':this.x, 'y':this.y}) ){
			this.x = new_location.x;
			this.y = new_location.y;
		} else {
			throw new Error('Rover has hit an object');
		}
		

		this.debugLocation();
	}

	/**
	 * Quick check to see if the rover has moved
	 * @param  {[type]}  new_location Object with values of the desired location
	 * @param  {[type]}  old_location Object with values of the location before movement
	 * @return {Boolean}              True if the rover moved
	 */
	hasMoved(new_location, old_location){
		if (new_location.x === old_location.x && new_location.y === old_location.y){
			return false;
		}

		return true;
	}
}

module.exports = MarsRover