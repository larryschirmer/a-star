let { row, col, sort, roundTo, printf, removeCurrent, isCurrentAtEnd } = require('./wrap');
let { log, printGrid } = require('./logging');
let { Spot, makeGrid } = require('./logic_setup');
let { findNeighbors, showNeighbors } = require('./logic');

const cols = 14, rows = 14;

let start = {
	r: 10,
	c: 1,
};
let end = {
	r: 1,
	c: 7,
};

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
};

let grid = makeGrid(grid_opts, Spot);

//One
let current = grid.area[start.r][start.c];

current.getNeighbors(grid.area);

current.neighbors.forEach(point => {
	point.open();
	grid.openSet = [
		...grid.openSet,
		{
			f: point.f,
			spot: point,
		},
	];
});

grid.openSet = sort(grid.openSet);

let lastOpenSet, nextSpot;

let runTimes = 9;

for (let i = 0; i < runTimes; i++) {
	lastOpenSet = grid.openSet.length - 1;
	nextSpot = grid.openSet[lastOpenSet];

	current = grid.area[nextSpot.spot.x][nextSpot.spot.y];

	if (isCurrentAtEnd(current)) log('done!');
	if (i == runTimes - 1) log(nextSpot);

	current.close();
	grid.openSet = removeCurrent(grid.openSet);

	if (i == runTimes - 1) console.log(`current x/y: ${nextSpot.spot.x}/${nextSpot.spot.y}`);

	current.getNeighbors(grid.area);

	current.neighbors.forEach(point => {
		point.open();
		grid.openSet = [
			...grid.openSet,
			{
				f: point.f,
				spot: point,
			},
		];
	});

	grid.openSet = sort(grid.openSet);
	if (i == runTimes - 1) printf(grid.openSet);
}

printGrid(grid.area);
