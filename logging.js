let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');
let { log, roundTo, digitCount, makeSpace, isCurrentAtEnd } = require('./wrap');
let { getEndPoint } = require('./make_map/astar_export');
let { makeMap } = require('./logic');
require('draftlog')(console);
const readline = require('readline');

let output = console.draft('');

let printGrids = grid => {
	let rows = '';
	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = `•`;
			if (row[i].set == 'W') set = ` `;
			if (row[i].set == 'X') set = `X`;
			if (row[i].set == 'C') set = `C`;
			if (row[i].path == 'P') set = `${row[i].previous.dir}`;
			if (row[i].isStart) set = 'S';
			if (row[i].isEnd) set = 'E';

			cols += ` ${set} `;
		}
		//console.log(cols);
		//console.log('');
		//console.log('');
		rows += `${cols} \n\n\n`;
	});
	output(rows);
	rows = '';
};

let printGrid = 'two';

// let printGrid = grid => {
// 	output(new Date().toString());
// };

let printMap = (grid, pathMap) => {
	for (let i = 0; i < pathMap.length; i++) {
		let x = pathMap[i][0];
		let y = pathMap[i][1];
		grid[x][y].path = 'P';
	}

	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = `•`;
			if (row[i].set == 'W') set = ` `;
			if (row[i].set == 'C') set = `C`;
			if (row[i].path == 'P') set = `${row[i].previous.dir}`;
			if (row[i].isStart) set = 'S';
			if (row[i].isEnd) set = 'E';

			cols += `${set} `;
		}
		console.log(cols);
	});
};

function printEnd(grid) {
	let end = getEndPoint(grid);
	let path = makeMap([], grid.area, grid.area[end.x][end.y]);
	log(path);
	console.log('');
	printMap(grid.area, path);
	log(grid.iterations);
	log(path.length);
	console.log(`end.g: ${grid.area[end.x][end.y].g}`);
}

let printPlainGrid = grid => {
	grid.forEach(row => {
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
	log,
	printGrid,
	printMap,
	printEnd,
	printPlainGrid,
};
