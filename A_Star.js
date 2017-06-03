let { log } = require('./logging');
let { start, grid_opts } = require('./settings');
let { initalSetup, runLoop } = require('./astar_export');
let { Spot } = require('./logic_setup');
let { printEnd } = require('./logging');
let { chainError } = require('./wrap');

initalSetup(grid_opts, Spot, start).then(runLoop, chainError).then(printEnd, chainError);
