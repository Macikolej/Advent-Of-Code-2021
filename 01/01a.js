exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./01.txt");

const iterateOverArray = (array, index, index2) => {
  if (!isNaN(parseInt(array[index2]))) {
    if (parseInt(array[index2]) > parseInt(array[index])) {
      return 1 + iterateOverArray(array, index2, index2 + 1);
    }
    else return iterateOverArray(array, index2, index2 + 1);
  }
  return 0;
}

console.log(iterateOverArray(arrayOfLines, 0, 1));
