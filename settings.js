let { log } = require('./wrap');
let { getGpxData, applyBounds, isPointInBounds, applyGPSPoint } = require('./make_map/setWalls');

let co = require('co');

//Assign how big to make the map
const cols = 70, rows = 35;

//Assign the start and end points
const start = {
	x: 4,
	y: 4,
},
	end = {
		r: 21,
		c: 56,
	};

//Place any custom walls
let walls = [];

//Set the Geo Data Boundries
let north = 47.120800, east = 88.539000, south = 47.115226, west = 88.553000;

let geoBound = {
	nw_n: north,
	nw_w: west,
	nw_pt: [1, 1],
	ne_n: north,
	ne_w: east,
	ne_pt: [1, 68],
	sw_n: south,
	sw_w: west,
	sw_pt: [33, 1],
	se_n: south,
	se_w: east,
	se_pt: [33, 68],
};

//Declare the gpx files that need to be parsed
let gpsFile = [
	'./gpx_files/mtu.gpx',
	'./gpx_files/mtu1.gpx',
	'./gpx_files/mtu2.gpx',
	'./gpx_files/mtu3.gpx',
	'./gpx_files/mtu4.gpx',
];

function setWalls() {
	return new Promise((res, rej) => {
		co(function*() {
			let rawGPX = yield getGpxData(gpsFile);
			//walls.push(...applyBounds(walls, geoBound));

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
