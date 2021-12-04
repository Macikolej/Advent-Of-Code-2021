exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./03.txt");

const calcGamma = (array) => {
  const ones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const zeroes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const gamma = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  array.forEach((line) => {
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
    let gammaVal = onesCount >= zeroesCount ? 1 : 0;
    gamma[i] = gammaVal;
  }
  return gamma;
}

const calcEpsilon = (gamma) => {
  const epsilon = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 12; i ++) {
    epsilon[i] = Math.abs(gamma[i] - 1);
  }
  return epsilon;
}

const filterForOxygen = (array, i) => {
  if (array.length == 1) {
    return array;
  }

  return filterForOxygen(array.filter((line) => {
    return line[i] == calcGamma(array)[i];
  }), i + 1)
}

const filterForCo2 = (array, i) => {
  if (array.length == 1) {
    return array;
  }

  return filterForCo2(array.filter((line) => {
    return line[i] == calcEpsilon(calcGamma(array))[i];
  }), i + 1)
}

let oxygen = exportFunctions.transformNumberFromBinaryToDecimal(filterForOxygen(arrayOfLines, 0)[0]);
let co2 = exportFunctions.transformNumberFromBinaryToDecimal(filterForCo2(arrayOfLines, 0)[0]);

console.log(oxygen * co2);


