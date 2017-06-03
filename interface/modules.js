let { log } = require('../logging');
let { grid_opts } = require('../settings');
let { initalSetup, runLoop } = require('../astar_export');
let { Spot } = require('../logic_setup');
let { printEnd } = require('../logging');
let { chainError } = require('../wrap');

module.exports = {
	make_map: {
		grid_opts,
		Spot,
		initalSetup,
	},
	processing: {
		runLoop,
	},
	printing: {
		printEnd,
		log,
	},
	chainError,
};
