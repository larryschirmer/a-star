let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');
let { log, roundTo, digitCount, makeSpace, isCurrentAtEnd } = require('./wrap');
let { getEndPoint } = require('./astar_export');
let { makeMap } = require('./logic');
require('draftlog')(console);
const readline = require('readline');

let output = console.draft('');

let printGrid = grid => {
	let rows = '';
	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set;
			if (set == 0) set = '0    ';
			if (row[i].set == 'X') set = `  X `;
			if (row[i].set == '') set = `  • `;
			if (row[i].set == 'C') set = `  M `;
			if (row[i].set == 'W' && digitCount(row[i].x) == 2) set = `${row[i].x}/${row[i].y}`;
			if (row[i].set == 'W' && digitCount(row[i].x) == 1) set = ` ${row[i].x}/${row[i].y}`;

			if (row[i].set !== 'W' && digitCount(row[i].y) > 1) set += ` `;

			if (row[i].isStart) set = '  S ';
			if (row[i].isEnd) set = '  E ';

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
			let set = ` `;
			if (row[i].set == 'W') set = `•`;
			if (row[i].set == 'L') set = `•`;
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

module.exports = {
	log,
	printGrid,
	printMap,
	printEnd,
};
