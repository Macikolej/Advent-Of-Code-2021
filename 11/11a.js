exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./11.txt");
let lightTable = [];
let flashCounter = 0;
let flashed = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  if (arrayOfLines[i] !== "") {
    lightTable.push([]);
    for (let j = 0; j < arrayOfLines[i].length; j ++) {
      lightTable[i].push(parseInt(arrayOfLines[i][j]));
    }
  }
}

const didFlash = (y, x) => {
  for (let i = 0; i < flashed.length; i++) {
    if (flashed[i][0] === y && flashed[i][1] === x) {
      return true;
    }
  }
  return false;
}

const flash = (queue) => {
  if (queue.length !== 0 ) {
    let flashQueue = queue;
    let x = queue[0][1];
    let y = queue[0][0];
    flashQueue.shift();
    if (!didFlash(y, x)) {
      flashed.push([y, x]);
      let horizontalRightViable = x + 1 < lightTable[y].length;
      let horizontalLeftViable = x - 1 >= 0;
      let verticalUpViable = y + 1 < lightTable.length;
      let verticalDownViable = y - 1 >= 0;

      if (horizontalRightViable) {
        lightTable[y][x + 1] += 1;
        if (lightTable[y][x + 1] > 9) {
          flashQueue.push([y, x + 1]);
        }
      }
      if (horizontalLeftViable) {
        lightTable[y][x - 1] += 1;
        if (lightTable[y][x - 1] > 9) {
          flashQueue.push([y, x - 1]);
        }
      }
      if (verticalUpViable) {
        lightTable[y + 1][x] += 1;
        if (lightTable[y + 1][x] > 9) {
          flashQueue.push([y + 1, x]);
        }
      }
      if (verticalDownViable) {
        lightTable[y - 1][x] += 1;
        if (lightTable[y - 1][x] > 9) {
          flashQueue.push([y - 1, x]);
        }
      }
      if (horizontalRightViable && verticalUpViable) {
        lightTable[y + 1][x + 1] += 1;
        if (lightTable[y + 1][x + 1] > 9) {
          flashQueue.push([y + 1, x + 1]);
        }
      }
      if (horizontalRightViable && verticalDownViable) {
        lightTable[y - 1][x + 1] += 1;
        if (lightTable[y - 1][x + 1] > 9) {
          flashQueue.push([y - 1, x + 1]);
        }
      }
      if (horizontalLeftViable && verticalUpViable) {
        lightTable[y + 1][x - 1] += 1;
        if (lightTable[y + 1][x - 1] > 9) {
          flashQueue.push([y + 1, x - 1]);
        }
      }
      if (horizontalLeftViable && verticalDownViable) {
        lightTable[y - 1][x - 1] += 1;
        if (lightTable[y - 1][x - 1] > 9) {
          flashQueue.push([y - 1, x - 1]);
        }
      }
    }
    flash(flashQueue);
  }
}

const resetFlashed = () => {
  for (let i = 0; i < flashed.length; i ++) {
    lightTable[flashed[i][0]][flashed[i][1]] = 0;
  }
}

const step = () => {
  flashed = [];
  let flashQueue = [];
  for (let i = 0; i < lightTable.length; i ++) {
    for (let j = 0; j < lightTable[i].length; j ++) {
      lightTable[i][j] += 1;
      if (lightTable[i][j] > 9) {
        flashQueue.push([i, j]);
      }
    }
  }
  flash(flashQueue);
  flashCounter += flashed.length;
  resetFlashed();
}

for (let i = 0; i < 100; i ++) {
  step();
}

console.log(flashCounter);
