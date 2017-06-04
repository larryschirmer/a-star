let { log } = require('../wrap');
let { getGpsFile, getGridScale, unitsToShift } = require('./logic');

//Get the GPX data
function getGpxData(gpsFile) {
	return new Promise((res, rej) => {
		res(getGpsFile(gpsFile));
	});
}

function applyBounds(walls, geoData) {
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

function applyGPSPoint(walls, geoData, pointData) {
	let scaleLeftRight = getGridScale(geoData, 'lr');

	let unitsSouthMove = unitsToShift(geoData, pointData, scaleLeftRight, 's');

	let scaleUpDown = getGridScale(geoData, 'ud');

	let unitsWestMove = unitsToShift(geoData, pointData, scaleUpDown, 'e');

	return {
		x: geoData.nw_pt[0] + unitsSouthMove,
		y: geoData.nw_pt[1] + unitsWestMove,
	};
}

module.exports = {
	getGpxData,
	applyBounds,
	isPointInBounds,
	applyGPSPoint,
};
