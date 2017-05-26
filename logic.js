let findNeighbors = (point, grid) => {
	let rowAmt = grid.length - 1;
	let colAmt = grid[0].length - 1;
	let list = [];
	//Point to the Top
	if (point.r > 0) list.push(grid[point.r - 1][point.c]);
	//Point to the Top Right
	if (point.r > 0 && point.c < colAmt) list.push(grid[point.r - 1][point.c + 1]);
	//Point to the Right
	if (point.c < colAmt) list.push(grid[point.r][point.c + 1]);
	//Point to the Bottom Right
	if (point.r < rowAmt && point.c < colAmt) list.push(grid[point.r + 1][point.c + 1]);
	//Point to the Bottom
	if (point.r < rowAmt) list.push(grid[point.r + 1][point.c]);
	//Point to the Bottom Left
	if (point.r < rowAmt && point.c > 0) list.push(grid[point.r + 1][point.c - 1]);
	//Point to the Left
	if (point.c > 0) list.push(grid[point.r][point.c - 1]);
	//Point to the Top Left
	if (point.r > 0 && point.c > 0) list.push(grid[point.r - 1][point.c - 1]);
	return list;
};

function Spot() {
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;

	this.rows = 0;
	this.cols = 0;

	this.set = 'X';
	this.open = _ => {
		this.set = 'O';
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
}

let showNeighbors = neighbors => {
	neighbors.forEach(spot => {
		spot.isNeighbor = true;
	});
};

let makeGrid = ({ rows, cols }, node_obj) => {
	return (gridArray = Array.from(new Array(rows), (u, i) => {
		return Array.from(new Array(cols), (u, j) => {
			let nodeObject = new node_obj();
			nodeObject.x = i;
			nodeObject.y = j;
			nodeObject.rows = rows;
			nodeObject.cols = cols;
			return nodeObject;
		});
	}));
};

module.exports = {
	findNeighbors,
	Spot,
	showNeighbors,
	makeGrid,
};