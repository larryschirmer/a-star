const util = require('util');

let row = index => {
	return index - 1;
};

let col = index => {
	return index - 1;
};

let log = msg => {
	console.log(util.inspect(msg, false, null));
};

let showNeighbors = neighbors => {
	neighbors.forEach(spot => {
		spot.isNeighbor = true;
	});
};

//end = grid[row(rows)][col(cols)];

//openSet = [...openSet, start];

let openSet = [], closedSet = [], start, end;

let printGrid = grid => {
	start = grid[row(3)][col(3)];
	start.open();
	start.getNeighbors(grid);
	showNeighbors(start.neighbors);
	grid.forEach(row => {
		let cols = '|';

		for (let i = 0; i < row.length; i++) {
			let set = row[i].set;
			if (row[i].isNeighbor) set = 'N';
			cols += ` ${set} |`;
		}
		console.log(cols);
	});
};

module.exports = {
	log,
	printGrid,
};
