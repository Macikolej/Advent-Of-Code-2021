exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./12.txt");

let neighbourhoodOfPoints = {};
let allPaths = [];

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

const checkIfPathWasntAlreadyPushed = (path) => {
  for (let i = 0; i < allPaths.length; i ++) {
    if (allPaths[i] === path) {
      return false;
    }
  }
  return true;
}

const iterateOverCave = (visited, point, wasVisitedTwice) => {
  visited.push(point);
  if (point === "end") {
    if (checkIfPathWasntAlreadyPushed(visited)) {
      allPaths.push(visited);
    }
    return;
  }
  let neighbours = neighbourhoodOfPoints[point];
  for (let i = 0; i < neighbours.length; i ++) {
    let newarr = [];
    let wasVisitedTwiceBool = wasVisitedTwice;
    for (let i = 0; i < visited.length; i ++) {
      newarr[i] = visited[i];
    }
    if (checkIfStringIsUpperCase(neighbours[i]) || checkIfPointIsntVisited(newarr, neighbours[i])) {
      iterateOverCave(newarr, neighbours[i], wasVisitedTwiceBool);
    }
    else if (!wasVisitedTwiceBool && neighbours[i] !== "start") {
      wasSmallCaveVisitedTwice = true;
      iterateOverCave(newarr, neighbours[i], true);
    }
  }
}

iterateOverCave([], "start", false);

console.log(allPaths.length);
