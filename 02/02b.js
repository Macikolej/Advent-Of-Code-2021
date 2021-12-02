exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./02.txt");
let submarineParameters = [0, 0, 0];
// first parameter is depth, second is vertical position, and third is aim

for (let i = 0; i < arrayOfLines.length; i ++) {
  let arrayOfWords = arrayOfLines[i].split(" ");
  switch(arrayOfWords[0]) {
    case "forward":
      submarineParameters[1] += parseInt(arrayOfWords[1])
      submarineParameters[0] += parseInt(arrayOfWords[1] * submarineParameters[2])
    break;
    case "up":
      submarineParameters[2] -= parseInt(arrayOfWords[1])
    break;
    case "down":
      submarineParameters[2] += parseInt(arrayOfWords[1])
    break;
  }
}
console.log(submarineParameters[0] * submarineParameters[1]);
