let { row, col, sort, roundTo, printf, removeCurrent } = require('./wrap');
let { log, printGrid } = require('./logging');
let { Spot, makeGrid } = require('./logic_setup');
let { findNeighbors, showNeighbors } = require('./logic');

const cols = 14, rows = 23;

let start = {
	r: 10,
	c: 1,
};
let end = {
	r: 3,
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

for (let i = 0; i < 3; i++) {
	lastOpenSet = grid.openSet.length - 1;
	nextSpot = grid.openSet[lastOpenSet];

	current = grid.area[nextSpot.spot.x][nextSpot.spot.y];
	if (i == 2) log(nextSpot);
	//printf(grid.openSet);

	current.close();
	grid.openSet = removeCurrent(grid.openSet);

	console.log(`current x/y: ${nextSpot.spot.x}/${nextSpot.spot.y}`);

	current.getNeighbors(grid.area);
	//console.log(`grid.openSet.length (before): ${grid.openSet.length}`);

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
	//log(current.neighbors.length);
	//console.log(`grid.openSet.length (after): ${grid.openSet.length}`);

	grid.openSet = sort(grid.openSet);
	printf(grid.openSet);
	//log(grid.openSet[grid.openSet.length - 1]);
}

printGrid(grid.area);
//printPath(map);
