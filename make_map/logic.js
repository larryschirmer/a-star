let { log } = require('../wrap');
let fs = require('fs');
let co = require('co');

function getGpsFile(fileNames) {
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

module.exports = { getGpsFile, getGridScale, unitsToShift };
