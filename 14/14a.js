exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./14.txt");

let currentPolymer = arrayOfLines[0];

let polymersInstructions = {};

for (let i = 2; i < arrayOfLines.length - 1; i ++) { // to avoid blank spaces
  polymersInstructions[arrayOfLines[i].split(" -> ")[0]] = arrayOfLines[i].split(" -> ")[1];
}

const step = () => {
  let steps = currentPolymer.split("");
  let toInsert = [];
  for (let i = 0; i < steps.length - 1; i ++) {
    let polymerStep = steps[i] + steps[i + 1];
    if (polymersInstructions[polymerStep] !== undefined) {
      toInsert.push([polymersInstructions[polymerStep], i + 1]);
    }
  }

  let newPolymer = steps;

  let g = 0;
  for (let i = 0; i < toInsert.length; i ++) {
    for (let j = newPolymer.length; j > toInsert[i][1] + g; j --) {
      newPolymer[j] = newPolymer[j - 1];
    }
    newPolymer[toInsert[i][1] + g] = toInsert[i][0];
    g++;
  }
  currentPolymer = newPolymer.join("");
}

for (let i = 0; i < 10; i ++) {
  step();
}

let counter = {};
let biggest = 0;
let lowest = 9999999;

for (let i = 0; i < currentPolymer.length; i ++) {
  if (counter[currentPolymer[i]] === undefined) {
    counter[currentPolymer[i]] = 1;
  }
  else {
    counter[currentPolymer[i]] += 1;
  }
}

for (let i = 0; i < currentPolymer.length; i ++) {
  if (counter[currentPolymer[i]] > biggest) {
    biggest = counter[currentPolymer[i]];
  }
  if (counter[currentPolymer[i]] < lowest) {
    lowest = counter[currentPolymer[i]];
  }
}

console.log(biggest - lowest);


