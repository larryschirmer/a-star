let co = require('co');

let describe = {
	className: '',
	properties: [''],
	methods: [''],
	supportingFunctions: [''],
	usage: [''],
};

// gets a grid and returns the processed grid and a path map

let Process = (grid, start, end) => {
	//Error Messages
	//if () throwError('');
	//if () throwError('');

	return new Promise((res, rej) => {
		co(function*() {
			grid = setCurrent(grid, start);
			grid = yield runLoop(grid, end);

			let path = yield makeMap(grid.area, grid.current, []);
			res({
				grid,
				path,
			});
		}).catch(err => {
			console.log(err);
		});
	});
};

module.exports = {
	Process,
	describe,
};

let setCurrent = (grid, start) => {
	grid.current = grid.area[start.x][start.y];
	grid.current.isStart = true;
	return grid;
};

let runIndex = 1;
function runLoop(grid, end) {
	return new Promise((res, rej) => {
		if (runIndex >= 500) rej('too many passes');
		if (runIndex < 500) {
			if (!isCurrentAtEnd(grid.current, end)) {
				runIndex += 1;
				res(runLoop(actionLoop(grid, end), end));
			} else {
				grid.current.isEnd = true;
				grid.iterations = runIndex;
				res(grid);
			}
		} else {
			res(grid);
		}
	}).catch(err => {
		console.log(err);
	});
}

let isCurrentAtEnd = (point, end) => {
	let currentXY = [point.x, point.y];
	let endXY = [end.x, end.y];
	let truth = currentXY[0] == endXY[0] && currentXY[1] == endXY[1] ? true : false;
	return truth;
};

let actionLoop = (grid, end) => {
	//remove spot from the processable array
	grid.openSet = removeCurrent(grid.openSet);

	//Get start's initial neighbors
	grid.current.getNeighbors(grid.area, end);

	//Process neighbors into the open set
	grid.openSet = grid.current.processNeighbors(grid.openSet);

	//mark spot as closed
	grid.current.close();

	//Get next current
	grid.current = getNextSpot(grid);
	return grid;
};

let removeCurrent = array => {
	let workingSet = [];
	let last = array.length - 1;
	array.forEach((v, i) => {
		if (i < last) workingSet = [...workingSet, v];
	});
	return workingSet;
};

let getNextSpot = grid => {
	let nextSpot = grid.openSet[grid.openSet.length - 1];
	return nextSpot.spot;
};

let maxRun = 1000;
let makeMap = (grid, point, map) => {
	return new Promise((res, rej) => {
		if (point.isStart !== true && maxRun >= 0) {
			map = [...map, [point.x, point.y]];
			let nextPoint = {
				x: point.previous.x,
				y: point.previous.y,
			};
			maxRun -= 1;
			res(makeMap(grid, grid[nextPoint.x][nextPoint.y], map));
		} else {
			map = [...map, [point.x, point.y]];
			res(map.reverse());
		}
	}).catch(err => {
		console.log(err);
	});
};
