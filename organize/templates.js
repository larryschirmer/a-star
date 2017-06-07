let Obj = () => {
	//Error Messages
	//if () throwError('');
	//if () throwError('');

	//Properties
	let properties = {};

	const obj = {};
	Object.setPrototypeOf(obj, Map.prototype);

	return obj;
};

let className = '';

let properties = ['', '', ''];

let methods = ['', ''];

let usage = ['', ''];

let fileTree = _ => {
	let log = string => {
		console.log(`  ${string}`);
	};

	let printBreak = opt => {
		if (opt == 'line') console.log(`--------------------`);
		if (!opt) console.log(``);
	};

	let print = _ => {
		console.log(`Class Name: ${className}`);
		printBreak('line');
		console.log(`  Properties:`);
		properties.forEach(log);
		printBreak();
		console.log(`  Methods:`);
		methods.forEach(log);
		printBreak();
		console.log(`  Usage:`);
		usage.forEach(log);
		printBreak();
	};
	print();
};
