let createMap = require('./createMap').describe;
let SpotObj = require('./SpotObj').describe;
let MapObj = require('./MapObj').describe;

let fileTree = obj => {
	let log = string => {
		console.log(`  ${string}`);
	};

	let printBreak = opt => {
		if (opt == 'line') console.log(`--------------------`);
		if (!opt) console.log(``);
	};

	let print = _ => {
		console.log(`Class Name: ${obj.className}`);
		printBreak('line');
		console.log(`  Properties:`);
		obj.properties.forEach(log);
		printBreak();
		console.log(`  Methods:`);
		obj.methods.forEach(log);
		printBreak();
		console.log(`  Supporting Functions:`);
		obj.supportingFunctions.forEach(log);
		printBreak();
		console.log(`  Usage:`);
		obj.usage.forEach(log);
		printBreak();
	};
	print();
};

fileTree(createMap);
fileTree(SpotObj);
fileTree(MapObj);
