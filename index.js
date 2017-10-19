"use strict";
var MarsRover = require('./rover.js');

function start(start_x, start_y, direction, commands, map_file) {

	let rover = new MarsRover(start_x, start_y, direction, map_file);
	
	commands.split('').forEach((command) => {
		switch (command) {
			case 'l': rover.turnLeft(); break;
			case 'r': rover.turnRight(); break;
			case 'f': rover.moveForward(); break;
			case 'b': rover.moveBackward(); break; 
			default: console.error(`${command} is not supported`);
		}
	});

}


start(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]);