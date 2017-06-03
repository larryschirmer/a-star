const cols = 16, rows = 16;

let start = {
	x: 9,
	y: 4,
};
let end = {
	r: 1,
	c: 14,
};

let walls = [
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
		x: 2,
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

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
	walls: walls,
};

module.exports = {
	grid_opts,
};
