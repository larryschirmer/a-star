const util = require('util');

let log = msg => {
	console.log(util.inspect(msg, false, null));
};

module.exports = {
	log,
};
