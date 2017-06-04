let { log } = require('./wrap');
let {
	applyBoundPoints,
	isPointInBounds,
	getGridScale,
	unitsToShift,
	applyGPSPoint,
	readGpxFile,
	getGpsFile,
} = require('./settings_export');

//Assign how big to make the map
const cols = 70, rows = 70;

//Assign the start and end points
const start = {
	x: 9,
	y: 4,
},
	end = {
		r: 1,
		c: 15,
	};

//Place any custom walls
let walls = [
	{
		x: 0,
		y: 0,
	},
];

//Set the Geo Data Boundries
let geoBound = {
	nw_n: 47.120026,
	nw_w: 88.550250,
	nw_pt: [25, 4],
	ne_n: 47.120026,
	ne_w: 88.542057,
	ne_pt: [25, 63],
	sw_n: 47.116026,
	sw_w: 88.550250,
	sw_pt: [55, 4],
	se_n: 47.116026,
	se_w: 88.542057,
	se_pt: [55, 63],
};

//Declare the gpx files that need to be parsed
let gpsFile = ['./gpx_files/mtu.gpx', './gpx_files/mtu1.gpx', './gpx_files/mtu2.gpx'];

//Get the GPX data
function getGpxData() {
	return new Promise((res, rej) => {
		res(getGpsFile(gpsFile));
	});
}

let gpsPoints = [];
let lights = [];
let lightCollection = [];

function pushGeo() {
	return new Promise((res, rej) => {
		walls.push(...applyBoundPoints(walls, geoBound));

		for (let i = 0; i < gpsPoints.length; i++) {
			if (isPointInBounds(geoBound, gpsPoints[i]))
				walls.push(applyGPSPoint(walls, geoBound, gpsPoints[i]));
		}
		res();
	});
}

// Have everything be a wall,
// then have the geo point disbale the wall

function pushLights() {
	return new Promise((res, rej) => {
		for (let i = 0; i < lights.length; i++) {
			if (isPointInBounds(geoBound, lights[i]))
				lightCollection.push(applyGPSPoint(lightCollection, geoBound, lights[i]));
		}
		res();
	});
}

// a light would go one step further,
// disbaling the wall, and setting it as
// a special point

function appendGPX(points) {
	return new Promise((res, rej) => {
		gpsPoints.push(...points);
		console.log(`appendGPX - gpsPoints.length: ${gpsPoints.length}`);
		res();
	});
}

function appendLights(points) {
	return new Promise((res, rej) => {
		lights.push(...points);
		console.log(`appendGPX - gpsPoints.length: ${gpsPoints.length}`);
		res();
	});
}

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
	walls: walls,
	lights: lightCollection,
	geoBound,
};

module.exports = {
	grid_opts,
	pushGeo,
	getGpxData,
	appendGPX,
	appendLights,
	pushLights,
};
