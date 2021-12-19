exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./15.txt");

let riskTable = [];

for (let i = 0 ; i < arrayOfLines.length - 1; i ++) { // -1 to avoid blank space
  riskTable.push([]);
  for (let j = 0; j < arrayOfLines[i].length; j ++) {
    riskTable[i].push(parseInt(arrayOfLines[i][j]))
  }
}

let paths = [];

const checkIfPointWasntVisited = (x, y, visited) => {
  for (let i = 0; i < visited.length; i ++) {
    if (visited[i][0] === x && visited[i][1] === y) {
      return false;
    }
  }
  return true;
}

const calculatePath = (x, y, path, visited) => {
  if (y === riskTable.length - 1 && x === riskTable[riskTable.length - 1].length - 1) {
    paths.push(path);
  }
  else {
    path.push([x, y]);
    visited.push([x, y]);

    let newVisited1 = [];
    for (let i = 0; i < visited.length; i ++) {
      newVisited1.push(visited[i]);
    }

    if (x + 1 < riskTable[y].length && checkIfPointWasntVisited(x + 1, y, newVisited1)) {
      calculatePath(x + 1, y, path, newVisited1)
    }

    if (x - 1 >= 0 && checkIfPointWasntVisited(x - 1, y, newVisited1)) {
      calculatePath(x - 1, y, path, newVisited1)
    }

    if (y + 1 < riskTable.length && checkIfPointWasntVisited(x, y + 1, newVisited1)) {
      calculatePath(x, y + 1, path, newVisited1)
    }

    if (y - 1 >= 0 && checkIfPointWasntVisited(x, y - 1, newVisited1)) {
      calculatePath(x, y - 1, path, newVisited1)
    }
  }
}

calculatePath(0, 0, [], []);

console.log(paths);
