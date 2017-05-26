let { log, printGrid } = require('./logging');

let makeGrid = ({ rows, cols }, node_obj) => {
	return (arrayThing = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.x = i;
			nodeObject.y = j;
			nodeObject.rows = rows;
			nodeObject.cols = cols;
			return nodeObject;
		});
	}));
};

const cols = 5, rows = 5;

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;

	this.rows = 0;
	this.cols = 0;

	this.set = 'X';
	this.open = _ => {
		this.set = 'O';
	};
	this.isNeighbor = false;
	this.neighbors = [];
	this.getNeighbors = grid => {
		let r = this.x, c = this.y, rows = this.rows - 1, cols = this.cols - 1;
		if (c < cols) this.neighbors.push(grid[r][c + 1]);
		if (c > 0) this.neighbors.push(grid[r][c - 1]);
		if (r < rows) this.neighbors.push(grid[r + 1][c]);
		if (r > 0) this.neighbors.push(grid[r - 1][c]);
	};
}

let grid_opts = {
	rows: rows,
	cols: cols,
};

let grid = makeGrid(grid_opts, Spot);

printGrid(grid);

//log(grid);

//log();
