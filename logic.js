let { log, roundTo, heuristic } = require('./wrap');

let assignValues = (newPoint, originalPoint, d = 1) => {
	newPoint.g = d + originalPoint;
	newPoint.h = heuristic(newPoint);
	newPoint.f = newPoint.g + newPoint.h;
	return newPoint;
};

let findNeighbors = (point, grid) => {
	let rowAmt = grid.length - 1;
	let colAmt = grid[0].length - 1;
	let list = [];
	let point_g = grid[point.r][point.c].g;

	//Point to the Top
	let topPoint = grid[point.r - 1][point.c];
	if (point.r > 0) {
		if (topPoint.g == 0) {
			topPoint = assignValues(topPoint, point_g);
			list.push(topPoint);
		}
	}

	//Point to the Top Right
	let topRightPoint = grid[point.r - 1][point.c + 1];
	if (point.r > 0 && point.c < colAmt) {
		if (topRightPoint.g == 0) {
			topRightPoint = assignValues(topRightPoint, point_g, 1.414);
			list.push(topRightPoint);
		}
	}

	//Point to the Right
	let rightPoint = grid[point.r][point.c + 1];
	if (point.c < colAmt) {
		if (rightPoint.g == 0) {
			rightPoint = assignValues(rightPoint, point_g);
			list.push(rightPoint);
		}
	}

	//Point to the Bottom Right
	let bottomRightPoint = grid[point.r + 1][point.c + 1];
	if (point.r < rowAmt && point.c < colAmt) {
		if (bottomRightPoint.g == 0) {
			bottomRightPoint = assignValues(bottomRightPoint, point_g, 1.414);
			list.push(bottomRightPoint);
		}
	}

	//Point to the Bottom
	let bottomPoint = grid[point.r + 1][point.c];
	if (point.r < rowAmt) {
		if (bottomPoint.g == 0) {
			bottomPoint = assignValues(bottomPoint, point_g);
			list.push(bottomPoint);
		}
	}

	//Point to the Bottom Left
	let bottomLeftPoint = grid[point.r + 1][point.c - 1];
	if (point.r < rowAmt && point.c > 0) {
		if (bottomLeftPoint.g == 0) {
			bottomLeftPoint = assignValues(bottomLeftPoint, point_g, 1.414);
			list.push(bottomLeftPoint);
		}
	}

	//Point to the Left
	let leftPoint = grid[point.r][point.c - 1];
	if (point.c > 0) {
		if (leftPoint.g == 0) {
			leftPoint = assignValues(leftPoint, point_g);
			list.push(leftPoint);
		}
	}

	//Point to the Top Left
	let topLeftPoint = grid[point.r - 1][point.c - 1];
	if (point.r > 0 && point.c > 0) {
		if (topLeftPoint.g == 0) {
			topLeftPoint = assignValues(topLeftPoint, point_g, 1.414);
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
};
