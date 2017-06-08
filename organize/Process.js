let co = require('co');

let describe = {
	className: '',
	properties: [''],
	methods: [''],
	supportingFunctions: [''],
	usage: [''],
};

// gets a grid and returns the processed grid and a path map

let Process = (grid, start) => {
	//Error Messages
	//if () throwError('');
	//if () throwError('');

	return new Promise((res, rej) => {
		co(function*() {
			grid = setCurrent(grid, start);
			grid = actionLoop(grid);
			grid = yield runLoop(grid);

			res(grid);
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
	grid.openSet = [grid.current];
	//
	return grid;
};

let runIndex = 1;
function runLoop(grid) {
	return new Promise((res, rej) => {
		if (runIndex < 500) {
			if (grid.openSet.length > 1) {
				runIndex += 1;

				res(runLoop(actionLoop(grid)));
			} else {
				grid.openSet = removeCurrent(grid.openSet);
				grid.current.getNeighbors(grid.area);
				grid.openSet = grid.current.processNeighbors(grid.openSet);
				grid.current.close();
				grid.iterations = runIndex;
				res(grid);
				if (grid.openSet.length >= 1) {
					runIndex += 1;
					grid.current = getNextSpot(grid);
					res(runLoop(actionLoop(grid)));
					res(grid);
				} else {
					runIndex += 1;

					res(grid);
				}
			}
		} else {
			// console.log(grid.openSet);
			// console.log(grid.openSet[0]);
			// console.log('open set amount: ', grid.openSet.length);
			res(grid);
		}
	}).catch(err => {
		console.log(err);
	});
}

let actionLoop = (grid, msg = '') => {
	//remove spot from the processable array
	grid.openSet = removeCurrent(grid.openSet);

	//Get start's initial neighbors
	grid.current.getNeighbors(grid.area);

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
	//let last = array.length - 1;
	array.forEach((v, i) => {
		if (i > 0) workingSet = [...workingSet, v];
	});
	return workingSet;
};

let getNextSpot = grid => {
	let nextSpot = grid.openSet[0];
	return nextSpot.spot;
};
