//I need to force one map
//Give the map certain properties
//You will be done when:
//let masterMap = new Map(gpxArr,map_opts)
//let grid = masterMap.setWalls().makeGrid();

//The One difference between this and the old version is that
//There is no embedded starting place

//Don't forget to refuse to make a 'Spot' where there is already a wall

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
	Map,
};

let makeGrid = ({ rows, cols, start, end, walls }, node_obj) => {
	let gridArray = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.x = i;
			nodeObject.y = j;
			nodeObject.rows = rows;
			nodeObject.cols = cols;
			nodeObject.end = end;
			nodeObject.makeWall();
			if (start.x == i && start.y == j) nodeObject.isStart = true;
			if (end.r == i && end.c == j) nodeObject.isEnd = true;
			if (nodeObject.isStart == true && nodeObject.set == 'W') {
				//throw new TypeError('start cannot be a wall');
			}
			if (nodeObject.isEnd == true && nodeObject.set == 'W') {
				//throw new TypeError('end cannot be a wall');
			}
			return nodeObject;
		});
	});
	let openSet = [], closedSet = [];

	for (let i = 0; i < walls.length; i++) {
		let x = walls[i].x;
		let y = walls[i].y;
		gridArray[x][y].set = '';
	}

	return {
		openSet: openSet,
		closedSet: closedSet,
		area: gridArray,
		current: {},
		iterations: 0,
	};
};

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
