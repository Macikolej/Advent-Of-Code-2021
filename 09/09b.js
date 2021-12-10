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

const checkIfCoordinateDoesntBelongToArray = (x, y, array) => {
  for (let i = 0; i < array.length; i ++) {
    if (array[i][0] === y && array[i][1] === x) {
      return false;
    }
  }
  return true;
}

const iterateOverBasin = (toVisit, visited, counterOfElements) => {
  if (toVisit.length === 0) {
    return counterOfElements;
  }
  let y = toVisit[0][0];
  let x = toVisit[0][1];
  let visitQueue = toVisit;
  let visitedArray = visited;
  let counter = counterOfElements + 1;

  if (y - 1 >= 0) {
    if (heightMap[y - 1][x] < 9 && checkIfCoordinateDoesntBelongToArray(x, y - 1, visitQueue) && checkIfCoordinateDoesntBelongToArray(x, y - 1, visitedArray)) {
      visitQueue.push([y - 1, x]);
    }
  }

  if (y + 1 < heightMap.length) {
    if (heightMap[y + 1][x] < 9 && checkIfCoordinateDoesntBelongToArray(x, y + 1, visitQueue) && checkIfCoordinateDoesntBelongToArray(x, y + 1, visitedArray)) {
      visitQueue.push([y + 1, x]);
    }
  }

  if (x - 1 >= 0) {
    if (heightMap[y][x - 1] < 9 && checkIfCoordinateDoesntBelongToArray(x - 1, y, visitQueue) && checkIfCoordinateDoesntBelongToArray(x - 1, y, visitedArray)) {
      visitQueue.push([y, x - 1]);
    }
  }

  if (x + 1 < heightMap[y].length)  {
    if (heightMap[y][x + 1] < 9 && checkIfCoordinateDoesntBelongToArray(x + 1, y, visitQueue) && checkIfCoordinateDoesntBelongToArray(x + 1, y, visitedArray)) {
      visitQueue.push([y, x + 1]);
    }
  }
  visitedArray.push([y, x]);
  visitQueue.shift();
  return iterateOverBasin(visitQueue, visitedArray, counter);
}

let firstPlaceBasin = 0;
let secondPlaceBasin = 0;
let thirdPlaceBasin = 0;

for (let i = 0; i < heightMap.length; i ++) {  ;
  for (let j = 0; j < heightMap[i].length; j ++) {
    if (checkIfHeightIsLowerThanNeighbours(j, i, heightMap[i].length, heightMap.length)) {
      let basinSize = iterateOverBasin([[i, j]], [], 0);
      if (basinSize > firstPlaceBasin) {
        thirdPlaceBasin = secondPlaceBasin;
        secondPlaceBasin = firstPlaceBasin;
        firstPlaceBasin = basinSize;
      }
      else if (basinSize > secondPlaceBasin) {
        thirdPlaceBasin = secondPlaceBasin;
        secondPlaceBasin = basinSize;
      }
      else if (basinSize > thirdPlaceBasin) {
        thirdPlaceBasin = basinSize;
      }
    }
  }
}

console.log(firstPlaceBasin * secondPlaceBasin * thirdPlaceBasin);

