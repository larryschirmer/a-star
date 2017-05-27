let { roundTo } = require('./wrap');

let findNeighbors = (point, grid) => {
	let rowAmt = grid.length - 1;
	let colAmt = grid[0].length - 1;
	let list = [];
	//Point to the Top
	if (point.r > 0) {
		grid[point.r - 1][point.c].g = 1;
		list.push(grid[point.r - 1][point.c]);
	}
	//Point to the Top Right
	if (point.r > 0 && point.c < colAmt) {
		grid[point.r - 1][point.c + 1].g = 1.414;
		list.push(grid[point.r - 1][point.c + 1]);
	}
	//Point to the Right
	if (point.c < colAmt) {
		grid[point.r][point.c + 1].g += 1;
		list.push(grid[point.r][point.c + 1]);
	}
	//Point to the Bottom Right
	if (point.r < rowAmt && point.c < colAmt) {
		grid[point.r + 1][point.c + 1].g = 1.414;
		list.push(grid[point.r + 1][point.c + 1]);
	}
	//Point to the Bottom
	if (point.r < rowAmt) {
		grid[point.r + 1][point.c].g = 1;
		list.push(grid[point.r + 1][point.c]);
	}
	//Point to the Bottom Left
	if (point.r < rowAmt && point.c > 0) {
		grid[point.r + 1][point.c - 1].g = 1.414;
		list.push(grid[point.r + 1][point.c - 1]);
	}
	//Point to the Left
	if (point.c > 0) {
		grid[point.r][point.c - 1].g = 1;
		list.push(grid[point.r][point.c - 1]);
	}
	//Point to the Top Left
	if (point.r > 0 && point.c > 0) {
		grid[point.r - 1][point.c - 1].g = 1.414;
		list.push(grid[point.r - 1][point.c - 1]);
	}
	return list;
};

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;

	this.rows = 0;
	this.cols = 0;

	this.end = {};

	this.set = 'X   ';
	this.open = _ => {
		this.set = 'O   ';
	};
	this.isNeighbor = false;
	this.neighbors = [];
	this.getNeighbors = grid => {
		let point = {
			r: this.x,
			c: this.y,
		};
		this.neighbors = findNeighbors(point, grid);
	};
}

let makeGrid = ({ rows, cols, start, end }, node_obj) => {
	return (gridArray = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.x = i;
			nodeObject.y = j;
			nodeObject.rows = rows;
			nodeObject.cols = cols;
			nodeObject.end = end;
			if (start.r == i && start.c == j) nodeObject.isStart = true;
			if (end.r == i && end.c == j) nodeObject.isEnd = true;
			return nodeObject;
		});
	}));
};

let heuristic = point => {
	let a = point.x - point.end.r;
	let b = point.y - point.end.c;
	let c = Math.sqrt(a * a + b * b);
	return c;
};

let showNeighbors = neighbors => {
	let leastNeighbor = {
		place: {},
		val: Infinity,
	};
	neighbors.forEach(spot => {
		if (spot.h == 0) {
			spot.h = heuristic(spot);
			let end_r_truthy = leastNeighbor.place.x == spot.end.r;
			let end_c_truthy = leastNeighbor.place.y == spot.end.c;
			if (end_r_truthy && end_c_truthy) console.log('done');

			if (spot.h + spot.g < leastNeighbor.val) {
				leastNeighbor.place = {
					x: spot.x,
					y: spot.y,
				};
				leastNeighbor.val = spot.h + spot.g;
			}
		}
	});

	return leastNeighbor;
};

module.exports = {
	findNeighbors,
	Spot,
	showNeighbors,
	makeGrid,
};
