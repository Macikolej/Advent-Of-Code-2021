exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./01.txt");

const iterateOverArray = (array, index, index2, index3, index4) => {
  if (!isNaN(parseInt(array[index4]))) {
    if ((parseInt(array[index2]) + parseInt(array[index3]) + parseInt(array[index4])) > (parseInt(array[index]) + parseInt(array[index2]) + parseInt(array[index3]))) {
      return 1 + iterateOverArray(array, index2, index3, index4, index4 + 1);
    }
    else return iterateOverArray(array, index2, index3, index4, index4 + 1);
  }
  return 0;
}

console.log(iterateOverArray(arrayOfLines, 0, 1, 2, 3));
