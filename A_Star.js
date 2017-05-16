let { log } = require('./logging');

let makeGrid = ({ rows, cols }, node_obj) => {
	return (arrayThing = Array.from(new Array(rows), _ => {
		return Array.from(new Array(cols), _ => {
			return new node_obj();
		});
	}));
};

const cols = 5, rows = 5;

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
}

let grid_opts = {
	rows: rows,
	cols: cols,
};

log(makeGrid(grid_opts, Spot));
