let { findNeighbors, Spot, showNeighbors, makeGrid } = require('./logic');
let { log, roundTo, digitCount, makeSpace } = require('./wrap');

let printGrid = grid => {
	grid.forEach(row => {
		let cols = '';
		for (let i = 0; i < row.length; i++) {
			let set = roundTo(row[i].h + row[i].g, 2);
			if (set == 0) set = '0    ';
			if (digitCount(set) == 1) set = `${set}    `;
			if (digitCount(set) == 2) set = `${set}   `;
			if (digitCount(set) == 3) set = `${set}  `;
			if (digitCount(set) == 4) set = `${set} `;
			if (row[i].isStart) set = 'start';
			if (row[i].isEnd) set = 'end  ';
			cols += ` ${set} `;
		}
		console.log(cols);
	});
};

module.exports = {
	log,
	printGrid,
};
