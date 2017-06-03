let { log } = require('./logging');

//Start 10,3 to End 1,13
let map0 = [
	[10, 3],
	[10, 4],
	[10, 5],
	[10, 6],
	[10, 7],
	[10, 8],
	[11, 9],
	[10, 10],
	[9, 10],
	[8, 10],
	[7, 10],
	[6, 10],
	[5, 10],
	[4, 10],
	[3, 11],
	[2, 12],
	[1, 13],
];

//Start 13,1 to End 1,13
let map1 = [
	[13, 1],
	[13, 2],
	[13, 3],
	[13, 4],
	[13, 5],
	[13, 6],
	[13, 7],
	[12, 8],
	[11, 9],
	[10, 10],
	[9, 10],
	[8, 10],
	[7, 10],
	[6, 10],
	[5, 10],
	[4, 10],
	[3, 11],
	[2, 12],
	[1, 13],
];

let map2 = [
	[8, 5],
	[8, 6],
	[9, 7],
	[10, 8],
	[11, 9],
	[10, 10],
	[9, 10],
	[8, 10],
	[7, 10],
	[6, 10],
	[5, 10],
	[4, 10],
	[3, 11],
	[2, 12],
	[1, 13],
];

function myIndexOf(compare, original) {
	for (var i = 0; i < original.length; i++) {
		if (original[i].at[0] == compare[0] && original[i].at[1] == compare[1]) {
			return i;
		}
	}

	return -1;
}

let makePathTrie = pathArrays => {
	let pathLengths = pathArrays.map(path => {
		return path.length;
	});
	let numOfIterations = Math.max(...pathLengths);
	let steps = { amount: numOfIterations };
	for (let i = 0; i < pathArrays.length; i++) {
		pathArrays[i].reverse().forEach((node, nodeIndex) => {
			if (!steps[nodeIndex]) {
				steps[nodeIndex] = {
					maps: [
						{
							map: i,
							node: node,
						},
					],
					points: [],
				};
			} else {
				steps[nodeIndex].maps.push({
					map: i,
					node: node,
				});
			}
			if (myIndexOf(node, steps[nodeIndex].points) == -1) {
				steps[nodeIndex].points.push({
					maps: [i],
					at: node,
				});
			} else {
				//steps[nodeIndex].points
				steps[nodeIndex].points[myIndexOf(node, steps[nodeIndex].points)].maps.push(i);
				//steps[nodeIndex].points.push(myIndexOf(node, steps[nodeIndex].points));
			}
		});
	}

	log(steps);
	return steps;
};

let steps = makePathTrie([map0, map1, map2]);

let getMaps = (map, index) => {
	let mapsGathered = '';
	map[index].points.forEach(point => {
		mapsGathered += `${point.maps} at ${point.at}\n`;
	});

	return mapsGathered;
};

for (let i = steps.amount - 1; i >= 0; i--) {
	console.log(`Step ${i}: Trigger \nMaps: \n${getMaps(steps, i)}`);
}
