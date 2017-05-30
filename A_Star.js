let { row, col, sort } = require('./wrap');
let { log, printGrid } = require('./logging');
let { Spot, makeGrid } = require('./logic_setup');
let { findNeighbors, showNeighbors } = require('./logic');

const cols = 14, rows = 23;

let start = {
	r: 10,
	c: 1,
};
let end = {
	r: 3,
	c: 7,
};

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
};

let grid = makeGrid(grid_opts, Spot);
let current = grid.area[start.r][start.c];
//current.open();
current.getNeighbors(grid.area);
current.neighbors.forEach(point => {
	point.open();
	grid.openSet = [
		...grid.openSet,
		{
			f: point.f,
			spot: point,
		},
	];
});

openSet = sort(grid.openSet);

let lastOpenSet = grid.openSet.length - 1;
let nextSpot = grid.openSet[lastOpenSet];

log(nextSpot);

//log(openSet);

/*
let nextSpot = showNeighbors(current.neighbors);

current = grid[nextSpot.place.x][nextSpot.place.y];
current.open();
current.getNeighbors(grid);

nextSpot = showNeighbors(current.neighbors);

for (let i = 0; i < 1; i++) {
	current = grid[nextSpot.place.x][nextSpot.place.y];
	current.open();
	current.getNeighbors(grid);
	nextSpot = showNeighbors(current.neighbors);
}
*/
printGrid(grid.area);
//printPath(map);
