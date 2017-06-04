let { log } = require('./wrap');
fs = require('fs');
let {
	applyBoundPoints,
	isPointInBounds,
	getGridScale,
	unitsToShift,
	applyGPSPoint,
} = require('./settings_export');

const cols = 70, rows = 70;

let start = {
	x: 9,
	y: 4,
};
let end = {
	r: 1,
	c: 15,
};

walls = [
	{
		x: 7,
		y: 3,
	},
	{
		x: 7,
		y: 4,
	},
	{
		x: 7,
		y: 5,
	},
	{
		x: 7,
		y: 6,
	},
	{
		x: 7,
		y: 7,
	},
	{
		x: 7,
		y: 9,
	},
	{
		x: 8,
		y: 9,
	},
	{
		x: 9,
		y: 9,
	},
	{
		x: 10,
		y: 9,
	},
	{
		x: 6,
		y: 4,
	},
	{
		x: 5,
		y: 4,
	},
	{
		x: 4,
		y: 4,
	},
	{
		x: 9,
		y: 9,
	},
	{
		x: 10,
		y: 9,
	},
	{
		x: 3,
		y: 4,
	},
	{
		x: 6,
		y: 4,
	},
	{
		x: 5,
		y: 4,
	},
	{
		x: 4,
		y: 4,
	},
	{
		x: 4,
		y: 8,
	},
	{
		x: 4,
		y: 9,
	},
	{
		x: 5,
		y: 9,
	},
	{
		x: 6,
		y: 9,
	},
	{
		x: 7,
		y: 8,
	},
];

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

function getGPX_WPT() {
	return new Promise((res, rej) => {
		let gpxPoints = [];
		fs.readFile('./gpx_files/mtu.gpx', 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}
			let lat, lng, head;
			for (let i = 0; i < 100; i++) {
				head = data.indexOf('<wpt') + 10;
				lat = data.substr(head, 9);
				data = data.substring(head + 10);
				lng = data.substr(7, 9);
				//log();
				gpxPoints.push({
					n: lat,
					w: lng,
				});
				let pnt = gpxPoints.length - 1;
				//console.log(`gpx: ${gpxPoints[pnt].n}N ${gpxPoints[pnt].w}W`);
				if (data.indexOf('<wpt') == -1) i = 1000;
			}
			console.log(`get GPX - gpxPoints.length: ${gpxPoints.length}`);
			res(gpxPoints);
		});
	});
}

function getGPX_TRKPT() {
	return new Promise((res, rej) => {
		let gpxPoints = [];
		fs.readFile('./gpx_files/mtu.gpx', 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}
			let lat, lng, head;
			for (let i = 0; i < 999; i++) {
				head = data.indexOf('<trkpt') + 12;
				lat = data.substr(head, 9);
				data = data.substring(head + 10);
				lng = data.substr(7, 9);
				//log();
				gpxPoints.push({
					n: lat,
					w: lng,
				});
				let pnt = gpxPoints.length - 1;
				//console.log(`gpxTRKPT: ${gpxPoints[pnt].n}N ${gpxPoints[pnt].w}W`);
				if (data.indexOf('<trkpt') == -1) i = 1000;
			}
			console.log(`getGPX_TRKPT - gpxPoints.length: ${gpxPoints.length}`);

			fs.readFile('./gpx_files/mtu1.gpx', 'utf8', function(err, data) {
				if (err) {
					return console.log(err);
				}
				let lat, lng, head;
				for (let i = 0; i < 999; i++) {
					head = data.indexOf('<trkpt') + 12;
					lat = data.substr(head, 9);
					data = data.substring(head + 10);
					lng = data.substr(7, 9);
					//log();
					gpxPoints.push({
						n: lat,
						w: lng,
					});
					let pnt = gpxPoints.length - 1;
					//console.log(`gpxTRKPT: ${gpxPoints[pnt].n}N ${gpxPoints[pnt].w}W`);
					if (data.indexOf('<trkpt') == -1) i = 1000;
				}
				console.log(`getGPX_TRKPT - gpxPoints.length: ${gpxPoints.length}`);

				fs.readFile('./gpx_files/mtu2.gpx', 'utf8', function(err, data) {
					if (err) {
						return console.log(err);
					}
					let lat, lng, head;
					for (let i = 0; i < 999; i++) {
						head = data.indexOf('<trkpt') + 12;
						lat = data.substr(head, 9);
						data = data.substring(head + 10);
						lng = data.substr(7, 9);
						//log();
						gpxPoints.push({
							n: lat,
							w: lng,
						});
						let pnt = gpxPoints.length - 1;
						//console.log(`gpxTRKPT: ${gpxPoints[pnt].n}N ${gpxPoints[pnt].w}W`);
						if (data.indexOf('<trkpt') == -1) i = 1000;
					}
					console.log(`getGPX_TRKPT - gpxPoints.length: ${gpxPoints.length}`);

					fs.readFile('./gpx_files/mtu3.gpx', 'utf8', function(err, data) {
						if (err) {
							return console.log(err);
						}
						let lat, lng, head;
						for (let i = 0; i < 999; i++) {
							head = data.indexOf('<trkpt') + 12;
							lat = data.substr(head, 9);
							data = data.substring(head + 10);
							lng = data.substr(7, 9);
							//log();
							gpxPoints.push({
								n: lat,
								w: lng,
							});
							let pnt = gpxPoints.length - 1;
							//console.log(`gpxTRKPT: ${gpxPoints[pnt].n}N ${gpxPoints[pnt].w}W`);
							if (data.indexOf('<trkpt') == -1) i = 1000;
						}
						console.log(`getGPX_TRKPT - gpxPoints.length: ${gpxPoints.length}`);

						fs.readFile('./gpx_files/mtu4.gpx', 'utf8', function(err, data) {
							if (err) {
								return console.log(err);
							}
							let lat, lng, head;
							for (let i = 0; i < 999; i++) {
								head = data.indexOf('<trkpt') + 12;
								lat = data.substr(head, 9);
								data = data.substring(head + 10);
								lng = data.substr(7, 9);
								//log();
								gpxPoints.push({
									n: lat,
									w: lng,
								});
								let pnt = gpxPoints.length - 1;
								//console.log(`gpxTRKPT: ${gpxPoints[pnt].n}N ${gpxPoints[pnt].w}W`);
								if (data.indexOf('<trkpt') == -1) i = 1000;
							}
							console.log(`getGPX_TRKPT - gpxPoints.length: ${gpxPoints.length}`);
							res(gpxPoints);
						});
					});
				});
			});
		});
	});
}

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
	getGPX_WPT,
	getGPX_TRKPT,
	appendGPX,
	appendLights,
	pushLights,
};
