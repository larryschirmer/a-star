let { row, col, sort, roundTo, printf, removeCurrent, isCurrentAtEnd } = require('./wrap');
let { log, printGrid, printMap } = require('./logging');
let { Spot, makeGrid } = require('./logic_setup');
let { findNeighbors, showNeighbors } = require('./logic');

const cols = 15, rows = 15;

let start = {
	r: 13,
	c: 1,
};
let end = {
	r: 1,
	c: 13,
};

let walls = [
	{
		x: 7,
		y: 3,
	},
	{
		x: 7,
		y: 4,
	},
	{
		x: 7,
		y: 5,
	},
	{
		x: 7,
		y: 6,
	},
	{
		x: 7,
		y: 7,
	},
	{
		x: 7,
		y: 8,
	},
	{
		x: 7,
		y: 9,
	},
	{
		x: 8,
		y: 9,
	},
	{
		x: 9,
		y: 9,
	},
	{
		x: 10,
		y: 9,
	},
];

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
	walls: walls,
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

let runTimes = 149;

for (let i = 0; i < runTimes; i++) {
	lastOpenSet = grid.openSet.length - 1;
	nextSpot = grid.openSet[lastOpenSet];

	current = grid.area[nextSpot.spot.x][nextSpot.spot.y];

	if (isCurrentAtEnd(current)) printMap(grid.area);
	//if (i == runTimes - 1) log(nextSpot);

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
