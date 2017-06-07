//let { printGrid } = require('../logging');
let { log } = require('../wrap');
let { setWalls } = require('../settings');
let { makeGrid } = require('./setup');
let co = require('co');

let { sort, removeCurrent, isCurrentAtEnd } = require('../wrap');
let { getGrid } = require('../organize/createMap');

//let { printPlainGrid } = require('../logging');

//////
const mapSize = {
	rows: 25,
	cols: 70,
};
//Set the Geo Data Boundries
const north = 47.121800, east = 88.539000, south = 47.115226, west = 88.553000;
const top = 1, right = 68, bottom = 23, left = 1;

const geoBound = {
	nw_n: north,
	nw_w: west,
	nw_pt: [top, left],
	ne_n: north,
	ne_w: east,
	ne_pt: [top, right],
	sw_n: south,
	sw_w: west,
	sw_pt: [bottom, left],
	se_n: south,
	se_w: east,
	se_pt: [bottom, right],
};

//Declare the gpx files that need to be parsed
const gpsFile = [
	'./gpx_files/mtu.gpx',
	'./gpx_files/mtu1.gpx',
	'./gpx_files/mtu2.gpx',
	'./gpx_files/mtu3.gpx',
	'./gpx_files/mtu4.gpx',
	'./gpx_files/mtu5.gpx',
];

const start = {
	x: 16,
	y: 56,
},
	end = {
		x: 7,
		y: 12,
	};
//////

//// Initial Setup
let initalSetup = (grid_opts, Spot) => {
	return new Promise((res, rej) => {
		co(function*() {
			let grid = yield getGrid(gpsFile, mapSize, geoBound);

			printPlainGrid(grid);

			//Select the start point
			let current = grid.area[start.x][start.y];
			current.isStart = true;

			//tell grid where it is
			grid.current = current;

			//Get start's initial neighbors
			current.getNeighbors(grid.area, end);

			//Process neighbors into the open set
			grid.openSet = current.processNeighbors(grid.openSet);

			//Put the most reasonable next guess at the end of list
			grid.openSet = sort(grid.openSet);
			res(grid);
		}).catch(err => {
			console.log(err);
		});
	});
};

let getNextSpot = grid => {
	return grid.openSet[grid.openSet.length - 1];
};

let selectPoint = (grid, point) => {
	point = grid.area[point.x][point.y];
	return point;
};

let actionLoop = grid => {
	//Get next spot
	nextSpot = getNextSpot(grid);

	//set the spot to 'current'
	let current = selectPoint(grid, nextSpot.spot);

	//tell grid where it is
	grid.current = current;

	//mark spot as closed
	current.close();

	//remove spot from the processable array
	grid.openSet = removeCurrent(grid.openSet);

	//Get start's initial neighbors
	current.getNeighbors(grid.area, end);

	//Process neighbors into the open set
	grid.openSet = current.processNeighbors(grid.openSet);

	//Put the most reasonable next guess at the end of list
	grid.openSet = sort(grid.openSet);
	return grid;
};

let getEndPoint = grid => {
	return {
		x: end.x,
		y: end.y,
	};
};

let runIndex = 1;
function runLoop(grid) {
	return new Promise((res, rej) => {
		if (runIndex >= 5000) rej('too many passes');
		if (!isCurrentAtEnd(grid.current, end)) {
			runIndex += 1;
			res(runLoop(actionLoop(grid)));
		} else {
			grid.current.isEnd = true;
			grid.iterations = runIndex;
			res(grid);
		}
	});
}

let printPlainGrid = grid => {
	grid.area.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = `•`;
			if (row[i].set == 'W') set = ` `;

			cols += `${set} `;
		}
		console.log(cols);
	});
};

module.exports = {
	actionLoop,
	getEndPoint,
	initalSetup,
	runLoop,
};
