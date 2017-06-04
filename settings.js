let { log } = require('./wrap');
let {
	applyBoundPoints,
	isPointInBounds,
	getGridScale,
	unitsToShift,
	applyGPSPoint,
	readGpxFile,
	getGpsFile,
	getGpxData,
} = require('./settings_export');

let co = require('co');

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

function setWalls() {
	return new Promise((res, rej) => {
		co(function*() {
			let rawGPX = yield getGpxData(gpsFile);
			walls.push(...applyBoundPoints(walls, geoBound));

			for (let i = 0; i < rawGPX.length; i++) {
				if (isPointInBounds(geoBound, rawGPX[i]))
					walls.push(applyGPSPoint(walls, geoBound, rawGPX[i]));
			}

			res();
		}).catch(err => {
			console.log(err);
		});
	});
}

let grid_opts = {
	rows,
	cols,
	start,
	end,
	walls,
	geoBound,
};

module.exports = {
	grid_opts,
	setWalls,
};
