exportFunctions = require("../export-functions");

const iterateOverArray = (array, index, index2) => {
  if (!isNaN(parseInt(array[index2]))) {
    if (parseInt(array[index2]) > parseInt(array[index])) {
      return 1 + iterateOverArray(array, index2, index2 + 1);
    }
    else return iterateOverArray(array, index2, index2 + 1);
  }
  return 0;
}

let string = exportFunctions.readTextFile("./01.txt");
let array = string.split("\n");

console.log(iterateOverArray(array, 0, 1));
