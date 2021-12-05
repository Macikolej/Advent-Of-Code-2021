exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./04.txt");

const sequence = arrayOfLines[0].split(",");
const tables = [];
let tableCounter = 0;

let winner = {
  numberOfMoves: 999,
  table: [],
  winningNumber: 0,
}

for (let i = 2; i < arrayOfLines.length; i += 6 ) { //we want to iterate from third element, as the tables start there
  tables.push([]);
  let tableLineCounter = 0;
  for (let j = i; j < i + 5; j ++) {
    tables[tableCounter][tableLineCounter] = arrayOfLines[j]
    .split("\n")[0].split(/\s+/).filter((el) => {
      return el !== ""
    });
    tableLineCounter ++;
  }
  tableCounter ++;
}

const checkHitTable = (hitTable) => {
  for (let i = 0; i < hitTable.length; i ++) {
    let rowProduct = 1;
    let columnProduct = 1;
    for (let j = 0; j < hitTable[i].length; j ++) {
      columnProduct *= hitTable[i][j];
      rowProduct *= hitTable[j][i];
    }
    if (columnProduct == 1 || rowProduct == 1) {
      return true;
    }
  }
  return false;
}

const checkSequenceMoveNumber = (array) => {
  let hitTable = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]

  for (let i = 0; i < sequence.length; i ++) {
    for (let j = 0; j < array.length; j ++) {
      for (let k = 0; k < array[j].length; k ++) {
        if (sequence[i] == array[j][k]) {
          hitTable[j][k] = 1;
        }
      }
    }
    if (i >= 4) {  // first win can only appear after 5 moves
      if(checkHitTable(hitTable) && i <= winner.numberOfMoves) {
          winner.numberOfMoves = i;
          winner.table = array;
          winner.winningNumber = sequence[i];
      }
    }
  }
}

for (let i = 0; i < tables.length; i ++) {
  checkSequenceMoveNumber(tables[i]);
}

const sumUnmarkedNumbers = (array, numberOfMoves) => {

  let sum = 0;
  for (let i = 0; i < array.length; i ++) {
    for (let j = 0; j < array[i].length; j ++) {
      let isMarked = false;
      for (let k = 0; k <= numberOfMoves; k ++) {
        if (array[i][j] === sequence[k]) {
          isMarked = true;
        }
      }
      if (!isMarked) {
        sum += parseInt(array[i][j])
      }
    }
  }
  return sum;
}

console.log(sumUnmarkedNumbers(winner.table, winner.numberOfMoves) * winner.winningNumber);
