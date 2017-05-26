let { row, col } = require('./wrap');
let { log, printGrid } = require('./logging');
let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');

const cols = 10, rows = 10;

let grid_opts = {
	rows: rows,
	cols: cols,
};

let grid = makeGrid(grid_opts, Spot);

start = grid[row(1)][col(1)];
start.open();
start.getNeighbors(grid);
showNeighbors(start.neighbors);

printGrid(grid);
