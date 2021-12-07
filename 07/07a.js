exportFunctions = require("../export-functions");

let textOfFile = exportFunctions.readTextFile("./07.txt");

array = textOfFile.split(",");

sortedArray = array.sort((a, b) => {
  return parseInt(a) < parseInt(b) ? -1 : 1;
});

let fuel = 0;
for (let i = 0; i < sortedArray.length; i ++) {
  fuel += Math.abs(sortedArray[i] - sortedArray[sortedArray.length / 2]);
}

console.log(fuel);
