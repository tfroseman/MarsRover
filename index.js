"use strict";
/**
 * Develop an api that moves a rover around on a grid.

• DONE You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
• DONE The rover receives a character array of commands.
• DONE Implement commands that move the rover forward/backward (f,b).
• DONE Implement commands that turn the rover left/right (l,r).
• Implement wrapping from one edge of the grid to another. (planets are spheres after all)
• Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, 
	the rover moves up to the last possible point and reports the obstacle.
 */
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

