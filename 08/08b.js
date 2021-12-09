exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./08.txt");

input = [];
output = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  const splitLine = arrayOfLines[i].split(" | ");
  if (splitLine[0] !== undefined) {
    input.push(splitLine[0].split(" "));
  }
  if (splitLine[1] !== undefined) {
    output.push(splitLine[1].split(" "));
  }
}

const decodeInput = (array, i) => {
  let rightEdge = array.filter((el) => {
    return el.length === 2;
  })
  let right1 = rightEdge[0][0];
  let right2 = rightEdge[0][1];
  let seven = array.filter((el) => {
    return el.length === 3 && el.includes(right1) && el.includes(right2);
  })
  let upperFinal = seven[0].split("").filter((el) => {
    return el !== right1 && el !== right2;
  })[0];
  let four = array.filter((el) => {
    return el.length === 4
  });
  let leftAndMiddle = four[0].split("").filter((el) => {
    return el !== right2 && el !== right1;
  })
  let leftOrMiddle = leftAndMiddle[0];
  let middleOrLeft = leftAndMiddle[1];

  let three = array.filter((el) => {
    return el.length === 5 && el.includes(right1) && el.includes(right2) && el.includes(upperFinal)
  })

  let middleFinal = three[0].split("").filter((el) => {
    if (el === leftOrMiddle) {
      return true;
    }
    else if (el === middleOrLeft) {
      return true;
    }
    else {
      return false;
    }
  })[0]

  let leftFinal;

  leftFinal = middleFinal === middleOrLeft ? leftOrMiddle : middleOrLeft;

  let five = array.filter((el) => {
    return el.length === 5 && el.includes(upperFinal) && el.includes(leftFinal) && el.includes(middleFinal);
  })

  let bottomOrLowerRight = five[0].split("").filter((el) => {
    return el !== upperFinal && el !== leftFinal && el !== middleFinal;
  })

  let finalLowerRight;
  let finalLower;
  let finalRight;

  if (bottomOrLowerRight[0] === right1) {
    finalLowerRight = right1;
    finalRight = right2;
    finalLower = bottomOrLowerRight[1]
  }
  else if (bottomOrLowerRight[0] === right2){
    finalLowerRight = right2;
    finalRight = right1;
    finalLower = bottomOrLowerRight[1]
  }
  else if (bottomOrLowerRight[1] === right1) {
    finalLowerRight = right1;
    finalRight = right2;
    finalLower = bottomOrLowerRight[0]
  }
  else {
    finalRight = right1;
    finalLowerRight = right2;
    finalLower = bottomOrLowerRight[0]
  }

  let eight = array.filter((el) => {
    return el.length === 7
  })

  let finalLowerLeft = eight[0].split("").filter((el) => {
    return el !== finalLower && el !== finalLowerRight && el !== finalRight && el !== middleFinal && el !== upperFinal && el !== leftFinal
  })[0]

  let sum = "";

  for (let j = 0; j < output[i].length; j ++) {
    if (output[i][j].length === 2) {
      sum +=  "1"
    }
    else if (output[i][j].length === 4) {
      sum +=  "4"
    }
    else if (output[i][j].length === 7) {
      sum +=  "8"
    }
    else if (output[i][j].length === 3) {
      sum +=  "7"
    }
    else if (output[i][j].length === 5 && output[i][j].includes(finalLowerLeft)) {
      sum += "2"
    }
    else if (output[i][j].length === 5 && output[i][j].includes(finalRight) && output[i][j].includes(finalLowerRight)) {
      sum += "3"
    }
    else if (output[i][j].length === 5) {
      sum += "5"
    }
    else if (output[i][j].length === 6 && output[i][j].includes(finalLowerLeft) && output[i][j].includes(middleFinal)) {
      sum += "6"
    }
    else if (output[i][j].length === 6 && output[i][j].includes(middleFinal)) {
      sum += "9"
    }
    else {
      sum += "0"
    }
  }
  return sum;
}

let overallSum = 0;

for (let i = 0; i < input.length; i ++) {
  if (input[i][0] !== "") {
    overallSum += parseInt(decodeInput(input[i], i));
  }
}

console.log(overallSum);

