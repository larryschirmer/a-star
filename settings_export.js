let { log, roundTo, heuristic } = require('./wrap');

function applyBoundPoints(walls, geoData) {
	return [
		{
			x: geoData.nw_pt[0],
			y: geoData.nw_pt[1],
		},
		{
			x: geoData.ne_pt[0],
			y: geoData.ne_pt[1],
		},
		{
			x: geoData.sw_pt[0],
			y: geoData.sw_pt[1],
		},
		{
			x: geoData.se_pt[0],
			y: geoData.se_pt[1],
		},
	];
}

function isPointInBounds(geoData, pointData) {
	let isEnoughSouth = geoData.nw_n >= pointData.n;
	let isEnoughNorth = geoData.sw_n <= pointData.n;
	let isEnoughEast = geoData.nw_w >= pointData.w;
	let isEnoughWest = geoData.ne_w <= pointData.w;
	return isEnoughSouth && isEnoughNorth && isEnoughEast && isEnoughWest ? true : false;
}

function getGridScale(geoData, dir) {
	let geoDifference, gridDifference;
	if (dir == 'lr') {
		geoDifference = geoData.nw_w - geoData.ne_w;
		gridDifference = geoData.ne_pt[1] - geoData.nw_pt[1];
	} else if (dir == 'ud') {
		geoDifference = geoData.nw_n - geoData.sw_n;
		gridDifference = geoData.sw_pt[0] - geoData.nw_pt[0];
	} else {
		throw new Error('pick valid scale option');
	}
	return geoDifference / gridDifference;
}

function unitsToShift(geoData, pointData, scale, dir) {
	let max, point;
	if (dir == 's') {
		max = geoData.nw_n;
		point = pointData.n;
	} else if (dir == 'e') {
		max = geoData.nw_w;
		point = pointData.w;
	}
	return Math.floor((max - point) / scale);
}

function applyGPSPoint(walls, geoData, pointData) {
	let scaleLeftRight = getGridScale(geoData, 'lr');
	//console.log(`scaleLeftRight: ${scaleLeftRight}`);
	let unitsSouthMove = unitsToShift(geoData, pointData, scaleLeftRight, 's');
	//console.log(`unitsSouthMove: ${unitsSouthMove}`);

	let scaleUpDown = getGridScale(geoData, 'ud');
	//console.log(`scaleUpDown: ${scaleUpDown}`);
	let unitsWestMove = unitsToShift(geoData, pointData, scaleUpDown, 'e');
	//console.log(`unitsWestMove: ${unitsWestMove}`);

	// console.log(
	// 	`GPS Point: [${geoData.nw_pt[0] + unitsSouthMove},${geoData.nw_pt[1] + unitsWestMove}]`
	// );

	return {
		x: geoData.nw_pt[0] + unitsSouthMove,
		y: geoData.nw_pt[1] + unitsWestMove,
	};
}

module.exports = {
	applyBoundPoints,
	isPointInBounds,
	getGridScale,
	unitsToShift,
	applyGPSPoint,
};
