const util = require('util');

let log = msg => {
	console.log(util.inspect(msg, false, null));
};

let printGrid = grid => {
	grid.forEach(row => {
		let cols = '|';
		for (let i = 0; i < row.length; i++) {
			cols += ` ${row[i].i}, ${row[i].j} |`;
		}
		console.log(cols);
	});
};

module.exports = {
	log,
	printGrid,
};
