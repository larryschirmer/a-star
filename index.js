let { grid_opts, Spot, initalSetup } = require('./interface/modules').make_map;
let { runLoop } = require('./interface/modules').processing;
let { printEnd, log } = require('./interface/modules').printing;
let { chainError } = require('./interface/modules');

/* ---
Procedure:

- Initially We:
	- Make the Grid
	- Define a Starting Place
	- Get the Neighbors for that Starting Place
	- Process those Neighbors
		• give them f,g,h values
		• records its x/y value into the neighbor to find its way back
		• put them in the open set (the set we can pick from in future iterations)
		• mark them as open
	- Prime the Most Reasonable Next Guess in the Open Set

- Run the Action Loop
	- Set the Current Place in the Grid
	  • point in open set
		• point with lowest 'f' value
	- Remove that Place from the Grid's Open Set
	- Get the Neighbors for that Starting Place
	- Process those Neighbors
	- Prime the Most Reasonable Next Guess in the Open Set

- Print the End Result
*/

initalSetup(grid_opts, Spot).then(runLoop, chainError).then(printEnd, chainError);
