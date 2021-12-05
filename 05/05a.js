exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./05.txt");

let dangerTable = Array.from({length: 1000}, (_, i) =>
    Array.from({length: 1000}, (_, i) => 0)
  );

let coordinateChanges = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  coordinateChanges.push(arrayOfLines[i].split(" -> "));
}

for (let i = 0; i < coordinateChanges.length - 1; i ++) {  //last item is emtpy string as sublime adds one
  let x1, x2, y1, y2;
  x1 = parseInt(coordinateChanges[i][0].split(",")[0])
  y1 = parseInt(coordinateChanges[i][0].split(",")[1])
  x2 = parseInt(coordinateChanges[i][1].split(",")[0])
  y2 = parseInt(coordinateChanges[i][1].split(",")[1])
  if (x1 == x2) {
    for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j ++) {
      dangerTable[j][x1] += 1;
    }
  }
  else if (y1 == y2) {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j ++) {
      dangerTable[y1][j] += 1;
    }
  }
  else {
    let g = 0;
    if (Math.min(y1, y2) == y1) {
      if (x1 < x2) {
        for (let j = y1; j <= y2; j ++) {
          dangerTable[j][x1 + g] += 1;
          g++;
        }
      }
      else {
        for (let j = y1; j <= y2; j ++) {
          dangerTable[j][x1 - g] += 1;
          g++;
        }
      }
    }
    else {
      if (x2 < x1) {
        for (let j = y2; j <= y1; j ++) {
          dangerTable[j][x2 + g] += 1;
          g++;
        }
      }
      else {
        for (let j = y2; j <= y1; j ++) {
          dangerTable[j][x2 - g] += 1;
          g++;
        }
      }
    }
  }
}

let dangerFieldCounter = 0;

for (let i = 0; i < dangerTable.length; i ++) {
  for (let j = 0; j < dangerTable[i].length; j ++) {
    if (dangerTable[i][j] >= 2) {
      dangerFieldCounter += 1;
    }
  }
}

console.log(dangerFieldCounter);
