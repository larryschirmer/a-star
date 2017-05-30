let { findNeighbors } = require('./logic');

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;

	this.rows = 0;
	this.cols = 0;

	this.end = {};

	this.set = '';
	this.open = _ => {
		this.set = 'X';
	};
	this.close = _ => {
		this.set = 'C';
	};
	this.makeWall = _ => {
		this.set = 'W';
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

let wallLogic = (i, j, rows, cols) => {
	let truth = false;
	if (i == 0) truth = true;
	if (j == 0) truth = true;
	if (i == rows - 1) truth = true;
	if (j == cols - 1) truth = true;
	return truth;
};

let makeGrid = ({ rows, cols, start, end }, node_obj) => {
	let gridArray = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.x = i;
			nodeObject.y = j;
			nodeObject.rows = rows;
			nodeObject.cols = cols;
			nodeObject.end = end;
			if (start.r == i && start.c == j) nodeObject.isStart = true;
			if (end.r == i && end.c == j) nodeObject.isEnd = true;
			if (wallLogic(i, j, rows, cols)) nodeObject.makeWall();
			if (nodeObject.isStart == true && nodeObject.set == 'W') {
				throw new TypeError('start cannot be a wall');
			}
			if (nodeObject.isEnd == true && nodeObject.set == 'W') {
				throw new TypeError('end cannot be a wall');
			}
			return nodeObject;
		});
	});
	let openSet = [], closedSet = [];
	return {
		openSet: openSet,
		closedSet: closedSet,
		area: gridArray,
	};
};

module.exports = {
	Spot,
	makeGrid,
};
