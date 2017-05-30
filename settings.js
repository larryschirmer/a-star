const cols = 15, rows = 15;

let start = {
	r: 13,
	c: 1,
};
let end = {
	r: 1,
	c: 13,
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
		y: 8,
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
];

let grid_opts = {
	rows: rows,
	cols: cols,
	start: start,
	end: end,
	walls: walls,
};

module.exports = {
	start,
	grid_opts,
};
