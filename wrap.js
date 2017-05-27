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

function roundTo(n, digits = 0) {
	let m = Math.pow(10, digits);
	return Math.round(n * m) / m;
}

function digitCount(num) {
	return num.toString().length;
}

function makeSpace(num) {
	let spaceArray = Array.from(new Array(num), _ => {
		return ' ';
	});
	return spaceArray.join('');
}

module.exports = {
	row,
	col,
	log,
	roundTo,
	digitCount,
	makeSpace,
};
