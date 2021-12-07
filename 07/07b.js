exportFunctions = require("../export-functions");

let textOfFile = exportFunctions.readTextFile("./07.txt");

array = textOfFile.split(",");

let hashMap = {};

let maxValue = 0;

for (let i = 0; i < array.length; i ++) {
  array[i] = parseInt(array[i]);
  if (array[i] > maxValue) {
    maxValue = array[i];
  }
}

let minFuel = Infinity;

for (let i = 0; i <= maxValue; i ++) {
  hashMap[i] = 0;

  for (let j = 0; j <= array.length; j ++) {
    if (array[j] === i) {
      hashMap[i] += 1;
    }
  }

  let fuel = 0;

  for (let j = 0; j < array.length; j ++) {
    fuel += ((2 + Math.abs(array[j] - i) - 1) / 2) * (Math.abs(array[j] - i));
  }

  if (fuel < minFuel) {
    minFuel = fuel;
  }
}

console.log(minFuel);
