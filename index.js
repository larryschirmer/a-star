//let { grid_opts, Spot, initalSetup } = require('./interface/modules').make_map;
// let { runLoop } = require('./interface/modules').processing;
//let { printEnd, log } = require('./interface/modules').printing;
let { log } = require('./logging');
// let { chainError } = require('./interface/modules');
//let { printPlainGrid } = require('./logging');
let co = require('co');

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
	rows: 25,
	cols: 70,
};
//Set the Geo Data Boundries
const north = 47.121800, east = 88.539000, south = 47.115226, west = 88.553000;
const top = 1, right = 68, bottom = 23, left = 1;

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
	x: 14,
	y: 46,
},
	end = {
		x: 12,
		y: 40,
	};

let { getGrid } = require('./organize/createMap');
let { Process } = require('./organize/Process');

co(function*() {
	let grid = yield getGrid(gpsFile, mapSize, geoBound);
	printPlainGrid(grid);

	let gridResults = yield Process(grid, start, end);

	printEnd(gridResults);
}).catch(err => {
	console.log(err);
});

function printEnd(results) {
	let grid = results.grid;
	let path = results.path;
	printMap(grid.area, path);
	log(grid.iterations);
	log(path.length);
	console.log(`end.g: ${grid.area[end.x][end.y].g}`);
}

let printPlainGrid = grid => {
	grid.area.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = `•`;
			if (row[i].type == 'W') set = ` `;

			cols += `${set} `;
		}
		console.log(cols);
	});
};

let printMap = (grid, pathMap) => {
	for (let i = 0; i < pathMap.length; i++) {
		let x = pathMap[i][0];
		let y = pathMap[i][1];
		grid[x][y].path = 'P';
	}

	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = `•`;
			if (row[i].type == 'W') set = ` `;
			if (row[i].type == 'C') set = `C`;
			if (row[i].path == 'P') set = `${row[i].previous.dir}`;
			if (row[i].isStart) set = 'S';
			if (row[i].isEnd) set = 'E';

			cols += `${set} `;
		}
		console.log(cols);
	});
};
