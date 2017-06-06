let Map = (gpxFiles = null, mapSize = null) => {
	//Error Messages
	//if () throwError('');
	//if () throwError('');

	//Properties
	let properties = {
		files: gpxFiles,
		rows: mapSize.rows,
		cols: mapSize.cols,
	};

	const obj = {};
	Object.setPrototypeOf(obj, Map.prototype);

	return obj;
};

module.exports = {
	Spot,
};

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;

	this.rows = 0;
	this.cols = 0;

	this.isStart = false;
	this.isEnd = false;

	this.end = {};

	this.path = '';

	this.set = '';
	this.open = _ => {
		this.set = 'X';
	};
	this.close = _ => {
		this.set = 'C';
	};
	this.makeWall = _ => {
		this.set = 'W';
	};
	this.isNeighbor = false;
	this.neighbors = [];
	this.getNeighbors = grid => {
		let point = {
			r: this.x,
			c: this.y,
		};
		this.neighbors = findNeighbors(point, grid);
	};

	this.processNeighbors = openSet => {
		this.neighbors.forEach(point => {
			point.open();
			openSet = [
				...openSet,
				{
					f: point.f,
					spot: point,
				},
			];
		});
		return openSet;
	};

	this.previous = {
		x: 0,
		y: 0,
		dir: '',
	};
}
