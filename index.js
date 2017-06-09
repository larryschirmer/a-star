let co = require('co');

let { getGrid } = require('./organize/createMap');
let { Process } = require('./organize/Process');
let { gridPrint } = require('./organize/Logging');

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

const mapSize = {
	rows: 40,
	cols: 70,
};
//Set the Geo Data Boundries
const north = 47.1218,
	east = 88.539,
	south = 47.115226,
	west = 88.553;
const top = 1,
	right = 68,
	bottom = 38,
	left = 1;

const geoBound = {
	nw_n: north,
	nw_w: west,
	nw_pt: [top, left],
	ne_n: north,
	ne_w: east,
	ne_pt: [top, right],
	sw_n: south,
	sw_w: west,
	sw_pt: [bottom, left],
	se_n: south,
	se_w: east,
	se_pt: [bottom, right],
};

//Declare the gpx files that need to be parsed
const gpsFile = [
	'./gpx_files/mtu.gpx',
	'./gpx_files/mtu1.gpx',
	'./gpx_files/mtu2.gpx',
	'./gpx_files/mtu3.gpx',
	'./gpx_files/mtu4.gpx',
	'./gpx_files/mtu5.gpx',
];

const start = {
	x: 11,
	y: 8,
},
	end = {
		x: 11,
		y: 25,
	};

co(function*() {
	let grid = yield getGrid(gpsFile, mapSize, geoBound);
	gridPrint.plain(grid);

	let gridResults = yield Process(grid, start, end);

	gridPrint.map(gridResults);
}).catch(err => {
	console.log(err);
});
