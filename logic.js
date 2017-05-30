let { log, roundTo, heuristic } = require('./wrap');

let assignValues = (newPoint, originalPoint, dir, d = 1) => {
	newPoint.g = d * 0.9 + originalPoint.g;
	newPoint.h = heuristic(newPoint);
	newPoint.f = newPoint.g + newPoint.h;

	newPoint.previous.x = originalPoint.x;
	newPoint.previous.y = originalPoint.y;
	newPoint.previous.dir = dir;
	return newPoint;
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

let findNeighbors = (point, grid) => {
	let rowAmt = grid.length - 1;
	let colAmt = grid[0].length - 1;
	let list = [];
	let point_info = grid[point.r][point.c];

	//Point to the Top
	let topPoint = grid[point.r - 1][point.c];
	if (topPoint.set !== 'W' && topPoint.isStart !== true) {
		if (topPoint.g == 0) {
			let dir = '|';
			topPoint = assignValues(topPoint, point_info, dir);
			list.push(topPoint);
		}
	}

	//Point to the Top Right
	let topRightPoint = grid[point.r - 1][point.c + 1];
	if (topRightPoint.set !== 'W' && topRightPoint.isStart !== true) {
		if (topRightPoint.g == 0) {
			let dir = '/';
			topRightPoint = assignValues(topRightPoint, point_info, dir, 1.414);
			list.push(topRightPoint);
		}
	}

	//Point to the Right
	let rightPoint = grid[point.r][point.c + 1];
	if (rightPoint.set !== 'W' && rightPoint.isStart !== true) {
		if (rightPoint.g == 0) {
			let dir = '-';
			rightPoint = assignValues(rightPoint, point_info, dir);
			list.push(rightPoint);
		}
	}

	//Point to the Bottom Right
	let bottomRightPoint = grid[point.r + 1][point.c + 1];
	if (bottomRightPoint.set !== 'W' && bottomRightPoint.isStart !== true) {
		if (bottomRightPoint.g == 0) {
			let dir = '\\';
			bottomRightPoint = assignValues(bottomRightPoint, point_info, dir, 1.414);
			list.push(bottomRightPoint);
		}
	}

	//Point to the Bottom
	let bottomPoint = grid[point.r + 1][point.c];
	if (bottomPoint.set !== 'W' && bottomPoint.isStart !== true) {
		if (bottomPoint.g == 0) {
			let dir = '|';
			bottomPoint = assignValues(bottomPoint, point_info, dir);
			list.push(bottomPoint);
		}
	}

	//Point to the Bottom Left
	let bottomLeftPoint = grid[point.r + 1][point.c - 1];
	if (bottomLeftPoint.set !== 'W' && bottomLeftPoint.isStart !== true) {
		if (bottomLeftPoint.g == 0) {
			let dir = '/';
			bottomLeftPoint = assignValues(bottomLeftPoint, point_info, dir, 1.414);
			list.push(bottomLeftPoint);
		}
	}

	//Point to the Left
	let leftPoint = grid[point.r][point.c - 1];
	if (leftPoint.set !== 'W' && leftPoint.isStart !== true) {
		if (leftPoint.g == 0) {
			let dir = '-';
			leftPoint = assignValues(leftPoint, point_info, dir);
			list.push(leftPoint);
		}
	}

	//Point to the Top Left
	let topLeftPoint = grid[point.r - 1][point.c - 1];
	if (topLeftPoint.set !== 'W' && topLeftPoint.isStart !== true) {
		if (topLeftPoint.g == 0) {
			let dir = '\\';
			topLeftPoint = assignValues(topLeftPoint, point_info, dir, 1.414);
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
			if (end_r_truthy && end_c_truthy) console.log('done');

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
