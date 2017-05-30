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
