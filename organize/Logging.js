let describe = {
	className: 'gridPrint',
	properties: [''],
	methods: [''],
	supportingFunctions: [''],
	usage: [''],
};

// gets a grid and returns the processed grid and a path map

let gridPrint = {
	plain: function(grid) {
		return new Promise((res, rej) => {
			grid.area.forEach(row => {
				let cols = '';
				for (let i = 0; i < row.length; i++) {
					let set = `•`;
					if (row[i].type == 'W') set = ` `;

					cols += `${set} `;
				}
				console.log(cols);
			});
		});
	},
	map: function(results) {
		return new Promise((res, rej) => {
			for (let i = 0; i < results.path.length; i++) {
				let x = results.path[i][0];
				let y = results.path[i][1];
				results.grid.area[x][y].path = 'P';
			}

			results.grid.area.forEach(row => {
				let cols = '';
				for (let i = 0; i < row.length; i++) {
					let set = `•`;
					if (row[i].type == 'W') set = ` `;
					if (row[i].type == 'C') set = `C`;
					if (row[i].path == 'P') set = `${row[i].previous.dir}`;
					if (row[i].isStart) set = 'S';
					if (row[i].isEnd) set = 'E';

					cols += `${set} `;
				}
				console.log(cols);
			});
		}).catch(err => {
			console.log(err);
		});
	},
};

module.exports = {
	gridPrint,
	describe,
};

let printPlainGrid = grid => {};

function printEnd(results) {
	let grid = results.grid;
	let path = results.path;
	printMap(grid.area, path);
	log(grid.iterations);
	log(path.length);
	console.log(`end.g: ${grid.area[end.x][end.y].g}`);
}

let printMap = (grid, pathMap) => {};
