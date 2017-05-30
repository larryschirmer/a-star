let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');
let { log, roundTo, digitCount, makeSpace, isCurrentAtEnd } = require('./wrap');
//require('draftlog')(console);
//const readline = require('readline');

let printGrid = grid => {
	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set;
			if (set == 0) set = '0    ';
			if (row[i].set == 'X') set = `  X `;
			if (row[i].set == '') set = `  | `;
			if (row[i].set == 'C') set = `  M `;
			if (row[i].set == 'W' && digitCount(row[i].x) == 2) set = `${row[i].x}/${row[i].y}`;
			if (row[i].set == 'W' && digitCount(row[i].x) == 1) set = ` ${row[i].x}/${row[i].y}`;

			if (row[i].set !== 'W' && digitCount(row[i].y) > 1) set += ` `;

			if (row[i].isStart) set = '  S ';
			if (row[i].isEnd) set = '  E ';

			cols += ` ${set} `;
		}
		console.log(cols);
		console.log('');
		console.log('');
	});
};

let makeMap = (map, grid, point) => {
	if (point.isStart !== true) {
		map = [...map, [point.x, point.y]];
		let nextPoint = {
			x: point.previous.x,
			y: point.previous.y,
		};
		//log(map);
		return makeMap(map, grid, grid[nextPoint.x][nextPoint.y]);
	} else {
		map = [...map, [point.x, point.y]];
		return map.reverse();
	}
};

let printMap = grid => {
	let endPoint = {
		x: grid[0][0].end.r,
		y: grid[0][0].end.c,
	};
	let pathMap = makeMap([], grid, grid[endPoint.x][endPoint.y]);
	log(pathMap);

	for (let i = 0; i < pathMap.length; i++) {
		let x = pathMap[i][0];
		let y = pathMap[i][1];
		grid[x][y].path = 'P';
		log(grid[x][y].set);
	}

	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = `  A `;
			if (row[i].set == 'W') set = `  W `;

			if (row[i].path == 'P') set = `  ${row[i].previous.dir} `;
			if (row[i].isStart) set = '  S ';
			if (row[i].isEnd) set = '  E ';

			cols += ` ${set} `;
		}
		console.log(cols);
		console.log('');
		console.log('');
	});
};

module.exports = {
	log,
	printGrid,
	printMap,
};
