let co = require('co');
let fs = require('fs');
let { Spot } = require('../make_map/setup');

let describe = {
	className: 'Grid',
	properties: [
		'files: The gpx files that make up the map',
		'geoBound: The properties of the map, the view window and point boundries',
		'rows: mapSize.rows',
		'cols: mapSize.cols',
		'points: the gps points n/w that are stored in the gpx files',
	],
	methods: [
		'setPoints: parses over the gpx files and places x/y values in an array',
		'makeGrid: returns a two dimentional array with Spot objects where gps points were',
	],
	supportingFunctions: [
		'getGpxData:      setWalls - requests the gps values from each *.gpx file',
		'readGpxFile:     setWalls - parses each file and returns gps points in an array',
		'isPointInBounds: setWalls - checks is gps point is in the specified range',
		'applyGPSPoint:   setWalls - converts gps point to row/col place in the grid',
		'getGridScale:    setWalls - returns the amount of lat/long per cell in grid',
		'unitsToShift:    setWalls - returns the amount to shift the point from the NW point',
	],
	usage: ['let grid = yield getGrid(gpsFile, mapSize, geoBound)'],
};
let getGrid = (gpsFile, mapSize, geoBound) => {
	return new Promise((res, rej) => {
		co(function*() {
			let masterMap = new Grid(gpsFile, mapSize, geoBound);
			let grid = yield masterMap.setPoints().then(masterMap.makeGrid);
			res(grid);
		}).catch(err => {
			console.log(err);
		});
	});
};

function Grid(gpxFiles = null, mapSize = null, geo_props = null) {
	//Error Messages
	//if () throwError('');
	//if () throwError('');

	//Properties
	let properties = {
		files: gpxFiles,
		geoBound: geo_props,
		rows: mapSize.rows,
		cols: mapSize.cols,
		points: [],
	};

	//Create Object
	const obj = {};
	Object.setPrototypeOf(obj, Map.prototype);

	//Define Methods
	function setPoints() {
		return new Promise((res, rej) => {
			co(function*() {
				let rawGPX = yield getGpxData(properties.files);

				for (let i = 0; i < rawGPX.length; i++) {
					if (isPointInBounds(properties.geoBound, rawGPX[i]))
						properties.points.push(applyGPSPoint(properties.geoBound, rawGPX[i]));
				}

				res();
			}).catch(err => {
				console.log(err);
			});
		});
	}

	function makeGrid() {
		let gridArray = Array.from(new Array(properties.rows), (u, i) => {
			return Array.from(new Array(properties.cols), (u, j) => {
				return { set: 'W' };
			});
		});

		for (let i = 0; i < properties.points.length; i++) {
			let cell = new Spot();
			cell.x = properties.points[i].x;
			cell.y = properties.points[i].y;
			cell.rows = properties.rows;
			cell.cols = properties.cols;
			cell.set = '';
			gridArray[cell.x][cell.y] = cell;
		}

		return {
			openSet: [],
			closedSet: [],
			area: gridArray,
			current: {},
			iterations: 0,
		};
	}

	obj.setPoints = setPoints;
	obj.makeGrid = makeGrid;

	return obj;
}

module.exports = {
	getGrid,
	describe,
};

////
//Functions that Support 'setWalls'
function getGpxData(fileNames) {
	return new Promise((res, rej) => {
		co(function*() {
			let files = [];
			for (let i = 0; i < fileNames.length; i++) {
				let parsedFile = yield readGpxFile(fileNames[i]);
				files.push(...parsedFile);
			}
			res([...files]);
		}).catch(err => {
			console.log(err);
		});
	});
}
//--V
function readGpxFile(fileName) {
	return new Promise((res, rej) => {
		let gpxPoints = [];
		fs.readFile(fileName, 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}
			let lat, lng, head;
			for (let i = 0; i < 999; i++) {
				head = data.indexOf('<trkpt') + 12;
				lat = data.substr(head, 9);
				data = data.substring(head + 10);
				lng = data.substr(7, 9);
				gpxPoints.push({
					n: lat,
					w: lng,
				});
				let pnt = gpxPoints.length - 1;
				if (data.indexOf('<trkpt') == -1) i = 1000;
			}
			res(gpxPoints);
		});
	});
}

//
function isPointInBounds(geoData, pointData) {
	let isEnoughSouth = geoData.nw_n >= pointData.n;
	let isEnoughNorth = geoData.sw_n <= pointData.n;
	let isEnoughEast = geoData.nw_w >= pointData.w;
	let isEnoughWest = geoData.ne_w <= pointData.w;
	return isEnoughSouth && isEnoughNorth && isEnoughEast && isEnoughWest ? true : false;
}
//
function applyGPSPoint(geoData, pointData) {
	let scaleLeftRight = getGridScale(geoData, 'lr');

	let unitsSouthMove = unitsToShift(geoData, pointData, scaleLeftRight, 's');

	let scaleUpDown = getGridScale(geoData, 'ud');

	let unitsWestMove = unitsToShift(geoData, pointData, scaleUpDown, 'e');

	return {
		x: geoData.nw_pt[0] + unitsSouthMove,
		y: geoData.nw_pt[1] + unitsWestMove,
	};
}
// --V
function getGridScale(geoData, dir) {
	let geoDifference, gridDifference;
	if (dir == 'lr') {
		geoDifference = geoData.nw_n - geoData.sw_n;
		gridDifference = geoData.sw_pt[0] - geoData.nw_pt[0];
	} else if (dir == 'ud') {
		geoDifference = geoData.nw_w - geoData.ne_w;
		gridDifference = geoData.ne_pt[1] - geoData.nw_pt[1];
	} else {
		throw new Error('pick valid scale option');
	}
	return geoDifference / gridDifference;
}
//
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
