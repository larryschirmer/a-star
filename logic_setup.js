let { findNeighbors } = require('./logic');
let { log } = require('./logging');

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;

	this.rows = 0;
	this.cols = 0;

	this.isStart = false;
	this.isEnd = false;

	this.end = {};

	this.path = '';

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

	this.processNeighbors = openSet => {
		this.neighbors.forEach(point => {
			point.open();
			openSet = [
				...openSet,
				{
					f: point.f,
					spot: point,
				},
			];
		});
		return openSet;
	};

	this.previous = {
		x: 0,
		y: 0,
		dir: '',
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

let makeGrid = ({ rows, cols, start, end, walls, lights }, node_obj) => {
	let gridArray = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.x = i;
			nodeObject.y = j;
			nodeObject.rows = rows;
			nodeObject.cols = cols;
			nodeObject.end = end;
			if (start.x == i && start.y == j) nodeObject.isStart = true;
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

	for (let i = 0; i < walls.length; i++) {
		let x = walls[i].x;
		let y = walls[i].y;
		gridArray[x][y].set = 'W';
	}
	//console.log(lights);
	for (let i = 0; i < lights.length; i++) {
		let x = lights[i].x;
		let y = lights[i].y;
		gridArray[x][y].set = 'L';
	}

	return {
		openSet: openSet,
		closedSet: closedSet,
		area: gridArray,
		current: {},
		iterations: 0,
	};
};

module.exports = {
	Spot,
	makeGrid,
};
