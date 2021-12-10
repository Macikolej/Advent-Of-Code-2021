exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./09.txt");

let heightMap = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  heightMap.push([]);
  for (let j = 0; j < arrayOfLines[i].length; j ++) {
    heightMap[i].push(parseInt(arrayOfLines[i][j]));
  }
}

const checkIfHeightIsLowerThanNeighbours = (x, y, xLength, yLength) => {
  if (x - 1 >= 0) {
    if (heightMap[y][x] >= heightMap[y][x - 1]) {
      return false;
    }
  }
  if (x + 1 < xLength) {
    if (heightMap[y][x] >= heightMap[y][x + 1]) {
      return false;
    }
  }
  if (y - 1 >= 0) {
    if (heightMap[y][x] >= heightMap[y - 1][x]) {
      return false;
    }
  }
  if (y + 1 < yLength) {
    if (heightMap[y][x] >= heightMap[y + 1][x]) {
      return false;
    }
  }
  return true;
}



let sumOfRiskLevels = 0;

for (let i = 0; i < heightMap.length; i ++) {  ;
  for (let j = 0; j < heightMap[i].length; j ++) {
    if (checkIfHeightIsLowerThanNeighbours(j, i, heightMap[i].length, heightMap.length)) {
      sumOfRiskLevels += 1 + heightMap[i][j];
    }
  }
}

console.log(sumOfRiskLevels);
