'use strict';
var file_system = require('fs');

class MarsMap{

	constructor(file_path){
		var map = JSON.parse(file_system.readFileSync(file_path, 'utf8'));

		this.size_x = map.size.x;
		this.size_y = map.size.y;
		this.obstacle = map.obstacle
	}

	/**
	 * Return true if there is a obstacle at the given location
	 * @param  {Object}		location Object containg the x and y positions
	 * @return {Boolean}	Return true if there is an obstacle
	 */
	hasObstacle(location){
		this.obstacle.every((element)=>{
			if(location.x === element.x && location.y === element.y){
				console.log(element.x);
				return true;
			}
			return false;
		});
	}

	wrapMap(location){
		let new_location = {
			'x': 0,
			'y': 0,
		};

		if ( location.x < 0 ) {
			new_location.x = this.size_x;
		}else if( location.x <= this.size_x ){
			new_location.x = location.x;
		}

		if( location.y < 0 ){
			new_location.y = this.size_y;
		}else if( location.y <= this.size_y ){
			new_location.y = location.y;
		}

		return new_location;
	}

	/**
	 * Tell the map the rover is moving
	 * @param  {Object} new_location location Object containg the x and y positions
	 * @return {Object}              new location for the rover
	 */
	moveRover(location, location_change){
		let desired_location = {
			'x': location.x + location_change.x,
			'y': location.y + location_change.y
		}

		desired_location = this.wrapMap(desired_location);

		if(!this.hasObstacle(desired_location)){
			return desired_location;
		}else {
			return location;
		}
	}
}

module.exports = MarsMap