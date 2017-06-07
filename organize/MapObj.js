let describe = {
	className: 'MapObj',
	properties: [
		'area: the two-dimentional array holding all the walls and points',
		'openSet: the set of points that still need to be processed',
		'current: the point in the grid that the algorithm is currently at',
		'iterations: the amount of loops it took to process',
	],
	methods: [''],
	supportingFunctions: [''],
	usage: ['new MapObj(gridArray)'],
};

function MapObj(array) {
	this.area = array;
	this.openSet = [];
	this.current = {};
	this.iterations = 0;
}

module.exports = {
	MapObj,
	describe,
};
