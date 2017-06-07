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

let describe = {
	className: '',
	properties: [''],
	methods: [''],
	supportingFunctions: [''],
	usage: [''],
};

let funcName = _ => {
	return new Promise((res, rej) => {
		co(function*() {
			res();
		}).catch(err => {
			console.log(err);
		});
	});
};
