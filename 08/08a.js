exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./08.txt");

input = [];
output = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  const splitLine = arrayOfLines[i].split(" | ");
  if (splitLine[0] !== undefined) {
    input.push(splitLine[0].split(" "));
  }
  if (splitLine[1] !== undefined) {
    output.push(splitLine[1].split(" "));
  }
}

let counter1478 = 0;

for (let i = 0; i < output.length; i ++) {
  for (let j = 0; j < output[i].length; j ++) {
    let l = output[i][j].length
    if (l === 2 || l === 4 || l === 7 || l === 3) {
      counter1478 += 1;
    }
  }
}

console.log(counter1478);


