let { row, col, sort, roundTo, printf, removeCurrent, isCurrentAtEnd } = require('./wrap');
let { log, printGrid, printMap } = require('./logging');
let { Spot, makeGrid } = require('./logic_setup');
let { findNeighbors, showNeighbors, makeMap } = require('./logic');
let { start, grid_opts } = require('./settings');

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

let actionLoop = _ => {
	lastOpenSet = grid.openSet.length - 1;
	nextSpot = grid.openSet[lastOpenSet];

	current = grid.area[nextSpot.spot.x][nextSpot.spot.y];

	current.close();
	grid.openSet = removeCurrent(grid.openSet);

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
	printGrid(grid.area);
};

let runIndex = 0;
(function runLoop() {
	if (runIndex >= 200) printEnd();
	if (!isCurrentAtEnd(current)) {
		actionLoop();
		runIndex += 1;
		setTimeout(runLoop, 125);
	}
})();

let endPoint = {
	x: grid.area[0][0].end.r,
	y: grid.area[0][0].end.c,
};

function printEnd() {
	let path = makeMap([], grid.area, grid.area[endPoint.x][endPoint.y]);
	log(path);

	printMap(grid.area, path);
	log(runIndex);
	log(path.length);
	console.log(`end.g: ${grid.area[endPoint.x][endPoint.y].g}`);
}
