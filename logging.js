let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');
let { log, roundTo, digitCount, makeSpace } = require('./wrap');
//require('draftlog')(console);
//const readline = require('readline');

let printGrid = grid => {
	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = roundTo(row[i].g, 2); //row[i].h +
			if (set == 0) set = '0    ';
			//if (digitCount(set) == 1) set = `${set}    `;
			//if (digitCount(set) == 2) set = `${set}   `;
			//if (digitCount(set) == 3) set = `${set}  `;
			//if (digitCount(set) == 4) set = `${set} `;
			if (row[i].set == 'X') set = `  X `;
			if (row[i].set == '') set = `  | `;
			if (row[i].set == 'C') set = `  M `;
			//log(digitCount(row[i].x));
			if (row[i].set == 'W' && digitCount(row[i].x) == 2) set = `${row[i].x}/${row[i].y}`;
			if (row[i].set == 'W' && digitCount(row[i].x) == 1) set = ` ${row[i].x}/${row[i].y}`;

			if (row[i].set !== 'W' && digitCount(row[i].y) > 1) set += ` `;
			if (row[i].isStart) set = '  S ';
			if (row[i].isEnd) set = '  E ';

			cols += ` ${set} `;
		}
		console.log(cols);
	});
};

module.exports = {
	log,
	printGrid,
};
