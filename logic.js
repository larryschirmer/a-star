let { log, roundTo, heuristic } = require('./wrap');

let assignValues = (end, newPoint, originalPoint, dir, d = 1) => {
	newPoint.g = d * 0.9 + originalPoint.g;
	//log(newPoint);
	newPoint.h = heuristic(newPoint, end);
	newPoint.f = newPoint.g + newPoint.h;

	newPoint.previous.x = originalPoint.x;
	newPoint.previous.y = originalPoint.y;
	newPoint.previous.dir = dir;
	return newPoint;
};

let maxRun = 1000;
let makeMap = (map, grid, point) => {
	if (point.isStart !== true && maxRun >= 0) {
		map = [...map, [point.x, point.y]];
		let nextPoint = {
			x: point.previous.x,
			y: point.previous.y,
		};
		maxRun -= 1;
		return makeMap(map, grid, grid[nextPoint.x][nextPoint.y]);
	} else {
		map = [...map, [point.x, point.y]];
		return map.reverse();
	}
};

let findNeighbors = (grid, point, end) => {
	let rowAmt = grid.length - 1;
	let colAmt = grid[0].length - 1;
	let list = [];
	let point_info = grid[point.x][point.y];

	//Point to the Top
	let topPoint = grid[point.x - 1][point.y];
	if (topPoint.set !== 'W' && topPoint.isStart !== true) {
		if (topPoint.g == 0) {
			let dir = '|';
			topPoint = assignValues(end, topPoint, point_info, dir);
			list.push(topPoint);
		}
	}

	//Point to the Top Right
	let topRightPoint = grid[point.x - 1][point.y + 1];
	if (topRightPoint.set !== 'W' && topRightPoint.isStart !== true) {
		if (topRightPoint.g == 0) {
			let dir = '/';
			topRightPoint = assignValues(end, topRightPoint, point_info, dir, 1.414);
			list.push(topRightPoint);
		}
	}

	//Point to the Right
	let rightPoint = grid[point.x][point.y + 1];
	if (rightPoint.set !== 'W' && rightPoint.isStart !== true) {
		if (rightPoint.g == 0) {
			let dir = '-';
			rightPoint = assignValues(end, rightPoint, point_info, dir);
			list.push(rightPoint);
		}
	}

	//Point to the Bottom Right
	let bottomRightPoint = grid[point.x + 1][point.y + 1];
	if (bottomRightPoint.set !== 'W' && bottomRightPoint.isStart !== true) {
		if (bottomRightPoint.g == 0) {
			let dir = '\\';
			bottomRightPoint = assignValues(end, bottomRightPoint, point_info, dir, 1.414);
			list.push(bottomRightPoint);
		}
	}

	//Point to the Bottom
	let bottomPoint = grid[point.x + 1][point.y];
	if (bottomPoint.set !== 'W' && bottomPoint.isStart !== true) {
		if (bottomPoint.g == 0) {
			let dir = '|';
			bottomPoint = assignValues(end, bottomPoint, point_info, dir);
			list.push(bottomPoint);
		}
	}

	//Point to the Bottom Left
	let bottomLeftPoint = grid[point.x + 1][point.y - 1];
	if (bottomLeftPoint.set !== 'W' && bottomLeftPoint.isStart !== true) {
		if (bottomLeftPoint.g == 0) {
			let dir = '/';
			bottomLeftPoint = assignValues(end, bottomLeftPoint, point_info, dir, 1.414);
			list.push(bottomLeftPoint);
		}
	}

	//Point to the Left
	let leftPoint = grid[point.x][point.y - 1];
	if (leftPoint.set !== 'W' && leftPoint.isStart !== true) {
		if (leftPoint.g == 0) {
			let dir = '-';
			leftPoint = assignValues(end, leftPoint, point_info, dir);
			list.push(leftPoint);
		}
	}

	//Point to the Top Left
	let topLeftPoint = grid[point.x - 1][point.y - 1];
	if (topLeftPoint.set !== 'W' && topLeftPoint.isStart !== true) {
		if (topLeftPoint.g == 0) {
			let dir = '\\';
			topLeftPoint = assignValues(end, topLeftPoint, point_info, dir, 1.414);
			list.push(topLeftPoint);
		}
	}

	return list;
};

let showNeighbors = neighbors => {
	let leastNeighbor = {
		place: {},
		val: Infinity,
	};
	neighbors.forEach(spot => {
		if (spot.h == 0) {
			spot.h = heuristic(spot);
			let end_r_truthy = leastNeighbor.place.x == spot.end.r;
			let end_c_truthy = leastNeighbor.place.y == spot.end.c;
			//if (end_r_truthy && end_c_truthy) console.log('done');

			if (spot.h + spot.g < leastNeighbor.val) {
				leastNeighbor.place = {
					x: spot.x,
					y: spot.y,
				};
				leastNeighbor.val = spot.h + spot.g;
			}
		}
	});

	return leastNeighbor;
};

module.exports = {
	findNeighbors,
	showNeighbors,
	makeMap,
};
