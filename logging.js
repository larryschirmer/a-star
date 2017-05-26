const util = require('util');

let log = msg => {
	console.log(util.inspect(msg, false, null));
};

//end = grid[row(rows)][col(cols)];

//openSet = [...openSet, start];

let openSet = [], closedSet = [], start, end;

let printGrid = grid => {
	grid.forEach(row => {
		let cols = '';

		for (let i = 0; i < row.length; i++) {
			let set = row[i].set;
			if (row[i].isNeighbor) set = 'N';
			cols += ` ${set} `;
		}
		console.log(cols);
	});
};

module.exports = {
	log,
	printGrid,
};
