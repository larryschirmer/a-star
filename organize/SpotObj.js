let describe = {
	className: 'SpotObj',
	properties: [
		'f: the total score (f = g + h)',
		'g: the distance from start to the specific point',
		'x: the x-coordinate of the specific point',
		'y: the y-coordinate of the specific point',
		'isStart: used for printing to define the starting point',
		'isEnd: used for printing to define the ending point',
		'type: the type of point the spot is',
		'neighbors: an array of all of the valid neighbors to the spot',
		'previous: the x/y/dir coordinate of the spot that found this specific spot',
	],
	methods: [
		'open: sets the type of the spot to be "X" for open',
		'close: sets the type of the spot to be "C" for closed',
		'getNeighbors: asks the point to find all of its valid neighbors',
		'processNeighbors: opens each neighbor and appends them and their f value to openSet',
	],
	supportingFunctions: [
		'findNeighbors:   getNeighbors -     returns valid neighbors and assigns to them f/g/h values',
		'isValidNeighbor: findNeighbors -    returns bool, checks if neighbor is a wall of starting point',
		'assignValues:    findNeighbors -    assigns each point a f/g/h value and the direction of the parent point',
		'heuristic:       findNeighbors -    guesses how far away the endpoint is',
		'sort:            processNeighbors - primes the point with the lowest f-score to be checked next',
	],
	usage: [''],
};

function SpotObj() {
	this.f = 0;
	this.g = 0;

	this.x = 0;
	this.y = 0;

	this.isStart = false;
	this.isEnd = false;

	this.type = '';
	this.neighbors = [];

	this.previous = {
		x: 0,
		y: 0,
		dir: '',
	};

	this.open = _ => {
		this.type = 'X';
	};

	this.close = _ => {
		this.type = 'C';
	};

	this.getNeighbors = grid => {
		let point = {
			x: this.x,
			y: this.y,
		};
		this.neighbors = findNeighbors(grid, point);
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
}

module.exports = {
	SpotObj,
	describe,
};

let findNeighbors = (grid, point) => {
	let rowAmt = grid.length - 1;
	let colAmt = grid[0].length - 1;
	let neighbors = [];
	let point_info = grid[point.x][point.y];

	//Point to the Top
	let topPoint = grid[point.x - 1][point.y];
	if (isValidNeighbor(topPoint)) {
		if (topPoint.g == 0) {
			let dir = '|';
			topPoint = assignValues(topPoint, point_info, dir);
			neighbors.push(topPoint);
		}
	}

	//Point to the Top Right
	let topRightPoint = grid[point.x - 1][point.y + 1];
	if (isValidNeighbor(topRightPoint)) {
		if (topRightPoint.g == 0) {
			let dir = '/';
			topRightPoint = assignValues(topRightPoint, point_info, dir, 1.414);
			neighbors.push(topRightPoint);
		}
	}

	//Point to the Right
	let rightPoint = grid[point.x][point.y + 1];
	if (isValidNeighbor(rightPoint)) {
		if (rightPoint.g == 0) {
			let dir = '-';
			rightPoint = assignValues(rightPoint, point_info, dir);
			neighbors.push(rightPoint);
		}
	}

	//Point to the Bottom Right
	let bottomRightPoint = grid[point.x + 1][point.y + 1];
	if (isValidNeighbor(bottomRightPoint)) {
		if (bottomRightPoint.g == 0) {
			let dir = '\\';
			bottomRightPoint = assignValues(bottomRightPoint, point_info, dir, 1.414);
			neighbors.push(bottomRightPoint);
		}
	}

	//Point to the Bottom
	let bottomPoint = grid[point.x + 1][point.y];
	if (isValidNeighbor(bottomPoint)) {
		if (bottomPoint.g == 0) {
			let dir = '|';
			bottomPoint = assignValues(bottomPoint, point_info, dir);
			neighbors.push(bottomPoint);
		}
	}

	//Point to the Bottom Left
	let bottomLeftPoint = grid[point.x + 1][point.y - 1];
	if (isValidNeighbor(bottomLeftPoint)) {
		if (bottomLeftPoint.g == 0) {
			let dir = '/';
			bottomLeftPoint = assignValues(bottomLeftPoint, point_info, dir, 1.414);
			neighbors.push(bottomLeftPoint);
		}
	}

	//Point to the Left
	let leftPoint = grid[point.x][point.y - 1];
	if (isValidNeighbor(leftPoint)) {
		if (leftPoint.g == 0) {
			let dir = '-';
			leftPoint = assignValues(leftPoint, point_info, dir);
			neighbors.push(leftPoint);
		}
	}

	//Point to the Top Left
	let topLeftPoint = grid[point.x - 1][point.y - 1];
	if (isValidNeighbor(topLeftPoint)) {
		if (topLeftPoint.g == 0) {
			let dir = '\\';
			topLeftPoint = assignValues(topLeftPoint, point_info, dir, 1.414);
			neighbors.push(topLeftPoint);
		}
	}

	return neighbors;
};

let isValidNeighbor = point => {
	let truth = true;
	if (point.set == 'W') truth = false;
	if (point.isStart == true) truth = false;
	return truth;
};

let assignValues = (newPoint, originalPoint, dir, d = 1) => {
	newPoint.g = d * 0.9 + originalPoint.g;
	newPoint.f = newPoint.g;

	newPoint.previous.x = originalPoint.x;
	newPoint.previous.y = originalPoint.y;
	newPoint.previous.dir = dir;
	return newPoint;
};
