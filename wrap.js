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

let heuristic = point => {
	let a = point.x - point.end.r;
	let b = point.y - point.end.c;
	let c = Math.sqrt(a * a + b * b);
	return c;
};

let sort = array => {
	// sort by value
	let newArray = array.sort(function(a, b) {
		return a.f - b.f;
	});
	return newArray.reverse();
};

let printf = array => {
	array.forEach(point => {
		console.log(`f: ${roundTo(point.f, 2)} x/y: ${point.spot.x}/${point.spot.y}`);
	});
};

let removeCurrent = array => {
	let workingSet = [];
	let last = array.length - 1;
	array.forEach((v, i) => {
		if (i < last) workingSet = [...workingSet, v];
	});
	return workingSet;
};

module.exports = {
	row,
	col,
	log,
	roundTo,
	digitCount,
	makeSpace,
	heuristic,
	sort,
	printf,
	removeCurrent,
};
