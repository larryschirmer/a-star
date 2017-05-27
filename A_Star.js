let { row, col } = require('./wrap');
let { log, printGrid } = require('./logging');
let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');

const cols = 14, rows = 23;
let openSet = [], closedSet = [];
let start = {
	r: 0,
	c: 0,
};
let end = {
	r: 14,
	c: 12,
};

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
};

let grid = makeGrid(grid_opts, Spot);
let current = grid[start.r][start.c];

current.getNeighbors(grid);

let nextSpot = showNeighbors(current.neighbors);

current = grid[nextSpot.place.x][nextSpot.place.y];
current.getNeighbors(grid);

nextSpot = showNeighbors(current.neighbors);

for (let i = 0; i < 11; i++) {
	current = grid[nextSpot.place.x][nextSpot.place.y];
	current.getNeighbors(grid);
	nextSpot = showNeighbors(current.neighbors);
}

printGrid(grid);
//printPath(map);
