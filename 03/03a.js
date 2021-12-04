exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./03.txt");

const ones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const zeroes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const gamma = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const epsilon = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let oxygen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let co2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

arrayOfLines.forEach((line) => {
  for (let i = 0; i < 12; i ++) {
    if (parseInt(line[i]) == 0) {
      zeroes[i] += 1;
    }
    else {
      ones[i] += 1;
    }
  }
});

for (let i = 0; i < 12; i ++) {
  let onesCount = ones[i];
  let zeroesCount = zeroes[i];
  let gammaVal = onesCount > zeroesCount ? 1 : 0;
  gamma[i] = gammaVal;
  epsilon[i] = Math.abs(gammaVal - 1);
}



console.log(exportFunctions.transformNumberFromBinaryToDecimal(gamma) * exportFunctions.transformNumberFromBinaryToDecimal(epsilon));
