let { makeGrid } = require('./logic_setup');
let { sort, removeCurrent, isCurrentAtEnd } = require('./wrap');
let { pushGeo, getGpxData, appendGPX, appendLights, pushLights } = require('./settings');

let getNextSpot = grid => {
	return grid.openSet[grid.openSet.length - 1];
};

let selectPoint = (grid, point) => {
	return grid.area[point.x][point.y];
};

let actionLoop = grid => {
	//Get next spot
	nextSpot = getNextSpot(grid);

	//set the spot to 'current'
	let current = selectPoint(grid, nextSpot.spot);

	//tell grid where it is
	grid.current = current;

	//mark spot as closed
	current.close();

	//remove spot from the processable array
	grid.openSet = removeCurrent(grid.openSet);

	//Get start's initial neighbors
	current.getNeighbors(grid.area);

	//Process neighbors into the open set
	grid.openSet = current.processNeighbors(grid.openSet);

	//Put the most reasonable next guess at the end of list
	grid.openSet = sort(grid.openSet);
	return grid;
};

let getEndPoint = grid => {
	return {
		x: grid.area[0][0].end.r,
		y: grid.area[0][0].end.c,
	};
};

//// Initial Setup
let initalSetup = (grid_opts, Spot) => {
	return new Promise((res, rej) => {
		//add GPS points
		getGpxData()
			.then(appendGPX)
			.then(pushGeo)
			.then(_ => {
				//Make the grid
				let grid = makeGrid(grid_opts, Spot);

				//Select the start point
				let current = selectPoint(grid, grid_opts.start);

				//tell grid where it is
				grid.current = current;

				//Get start's initial neighbors
				current.getNeighbors(grid.area);

				//Process neighbors into the open set
				grid.openSet = current.processNeighbors(grid.openSet);

				//Put the most reasonable next guess at the end of list
				grid.openSet = sort(grid.openSet);
				res(grid);
			})
			.catch(err => {
				console.log(err);
			});
	});
};

let runIndex = 1;
function runLoop(grid) {
	return new Promise((res, rej) => {
		if (runIndex >= 5000) rej('too many passes');
		if (!isCurrentAtEnd(grid.current)) {
			runIndex += 1;
			res(runLoop(actionLoop(grid)));
		} else {
			grid.iterations = runIndex;
			res(grid);
		}
	});
}

module.exports = {
	actionLoop,
	getEndPoint,
	initalSetup,
	runLoop,
};
