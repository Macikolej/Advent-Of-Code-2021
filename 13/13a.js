exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./13.txt");

let dots = [];
let coordinates = [];
let indexOfLastCoordinate = 0;
let i = 0;
let ySize = 0;
let xSize = 0;
while (!isNaN(parseInt(arrayOfLines[i]))) {
  if (parseInt(arrayOfLines[i].split(",")[0]) > xSize) {
    xSize = parseInt(arrayOfLines[i].split(",")[0]);
  }
  if (parseInt(arrayOfLines[i].split(",")[1]) > ySize) {
    ySize = parseInt(arrayOfLines[i].split(",")[1]);
  }
  coordinates.push([parseInt(arrayOfLines[i].split(",")[0]), parseInt(arrayOfLines[i].split(",")[1])])
  i++;
  indexOfLastCoordinate = i;
}


for (let i = 0; i <= ySize; i ++) {
  dots.push([]);
  for (let j = 0 ; j <= xSize; j ++) {
    dots[i].push(".");
  }
}

for (let i = 0; i < coordinates.length; i ++) {
  dots[coordinates[i][1]][coordinates[i][0]] = "#";
}

if (arrayOfLines[indexOfLastCoordinate + 1].split("fold along")[1] !== undefined) {
  let splitCoordinate = arrayOfLines[indexOfLastCoordinate + 1].split("fold along")[1].split("");
  let splitCoordinateNumber = splitCoordinate[3];
  for (let i = 4; i < splitCoordinate.length; i ++) {
    splitCoordinateNumber += splitCoordinate[i];
  }
  if (splitCoordinate[1] === "y") {
    for (let i = (parseInt(splitCoordinateNumber) + 1); i < dots.length; i ++) {
      for (let j = 0; j < dots[i].length; j ++) {
        if (dots[i][j] === "#") {
          dots[parseInt(splitCoordinateNumber) - (i - parseInt(splitCoordinateNumber))][j] = "#";
        }
      }
    }
    dots.splice(parseInt(splitCoordinateNumber), dots.length - parseInt(splitCoordinateNumber));
  }
  if (splitCoordinate[1] === "x") {
    for (let i = 0; i < dots.length; i ++) {
      for (let j = (parseInt(splitCoordinateNumber) + 1); j < dots[i].length; j ++) {
        if (dots[i][j] === "#") {
          dots[i][parseInt(splitCoordinateNumber) - (j - parseInt(splitCoordinateNumber))] = "#";
        }
      }
    }
    for (let i = 0; i < dots.length; i ++) {
      dots[i].splice(parseInt(splitCoordinateNumber), dots[i].length - parseInt(splitCoordinateNumber));
    }
  }
}

let dotsCounter = 0;

for (let i = 0; i < dots.length; i ++) {
  for (let j = 0; j < dots[i].length; j ++) {
    if (dots[i][j] === "#") {
      dotsCounter ++;
    }
  }
}

console.log(dotsCounter);
