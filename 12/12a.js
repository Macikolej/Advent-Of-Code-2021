exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./12.txt");

let neighbourhoodOfPoints = {};

for (let i = 0; i < arrayOfLines.length; i ++) {
  let neighbours = arrayOfLines[i].split("-");
  if (neighbours[0] !== "") {
    if (neighbourhoodOfPoints[neighbours[0]] === undefined) {
      neighbourhoodOfPoints[neighbours[0]] = [];
    }
    if (neighbourhoodOfPoints[neighbours[1]] === undefined) {
      neighbourhoodOfPoints[neighbours[1]] = [];
    }
    neighbourhoodOfPoints[neighbours[0]].push(neighbours[1]);
    neighbourhoodOfPoints[neighbours[1]].push(neighbours[0]);
  }
}

const checkIfStringIsUpperCase = (string) => {
  return string === string.toUpperCase();
}

const checkIfPointIsntVisited = (visited, point) => {
  for (let i = 0; i < visited.length; i ++) {
    if (visited[i] === point) {
      return false;
    }
  }
  return true;
}

let goodPathsCounter = 0;

const iterateOverCave = (visited, point) => {
  if (point === "end") {
    goodPathsCounter += 1;
    return;
  }
  visited.push(point);
  let neighbours = neighbourhoodOfPoints[point];
  for (let i = 0; i < neighbours.length; i ++) {
    let newarr = [];
    for (let i = 0; i < visited.length; i ++) {
      newarr[i] = visited[i];
    }
    if (checkIfStringIsUpperCase(neighbours[i]) || checkIfPointIsntVisited(newarr, neighbours[i])) {
      iterateOverCave(newarr, neighbours[i]);
    }
  }
}

iterateOverCave([], "start");

console.log(goodPathsCounter);
