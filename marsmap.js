'use strict';
var file_system = require('fs');
/**
 * This acts like a gps(ish) service
 */
class MarsMap{

	/**
	 * Create a new map object
	 * @param  {string} file_path Path to the map file
	 * @return {object}           Map
	 */
	constructor(file_path){
		var map = JSON.parse(file_system.readFileSync(file_path, 'utf8'));

		this.size_x = map.size.x;
		this.size_y = map.size.y;
		this.obstacle = map.obstacle
	}

	/**
	 * Check if a position on the map has an obstacle
	 * @param  {object}  location Object containing the location
	 * @return {Boolean}          True if there is an obstacle
	 */
	hasObstacle(location){
		return this.obstacle.some((element)=>{
			if(element[0] === location.x && element[1] === location.y){
				console.log(element);
				return true;
			}
			return false;
		});
	}

	/**
	 * Helper to preform the wrap around the map for seemless movement around edges
	 * @param  {object} location Location to check
	 * @return {object}          new location after movement
	 */
	wrapMap(location){
		let new_location = {
			'x': 0,
			'y': 0,
		};

		// wrap around the x axis
		if ( location.x < 0 ) {
			new_location.x = this.size_x;
		}else if( location.x <= this.size_x ){
			new_location.x = location.x;
		}

		// wrap around the y axis
		if( location.y < 0 ){
			new_location.y = this.size_y;
		}else if( location.y <= this.size_y ){
			new_location.y = location.y;
		}

		return new_location;
	}

	/**
	 * Called to move the rover
	 * @param  {object} location        current rover location
	 * @param  {object} location_change The changes in x and y
	 * @return {object}                 location of the rover after trying to move
	 */
	moveRover(location, location_change){
		let desired_location = {
			'x': location.x + location_change.x,
			'y': location.y + location_change.y
		}

		desired_location = this.wrapMap(desired_location);

		if(this.hasObstacle(desired_location)){
			return location;
		}else {
			return desired_location;
		}
	}
}

module.exports = MarsMap