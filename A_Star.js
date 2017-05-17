let { log, printGrid } = require('./logging');

let makeGrid = ({ rows, cols }, node_obj) => {
	return (arrayThing = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.i = i;
			nodeObject.j = j;
			return nodeObject;
		});
	}));
};

let openSet = [], closedSet = [], start, end;

const cols = 5, rows = 5;

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.i = 0;
	this.j = 0;
}

let grid_opts = {
	rows: rows,
	cols: cols,
};

let grid = makeGrid(grid_opts, Spot);

printGrid(grid);

//log(grid);

start = grid[0][0];
end = grid[cols - 1][rows - 1];

openSet = [...openSet, start];

//log();
