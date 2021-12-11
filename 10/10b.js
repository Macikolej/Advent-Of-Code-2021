exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./10.txt");
let arrayOfChars = [];
let syntaxScoreArray = [];

const validateChunk = (char, lastChar) => {
  switch (lastChar) {
    case "{":
      if (char !== "}") {
        return false;
      }
      break;
    case "<":
      if (char !== ">") {
        return false;
      }
      break;
    case "(":
      if (char !== ")") {
        return false;
      }
      break;
    case "[":
      if (char !== "]") {
        return false;
      }
      break;
  }
  return true;
}

const calculateSyntaxErrorScore = (stack) => {
  let syntaxErrorScore = 0;
  for (let i = stack.length - 1; i >= 0; i --) {
    switch(stack[i]) {
      case "{":
        syntaxErrorScore = syntaxErrorScore * 5 + 3;
        break;
      case "[":
        syntaxErrorScore = syntaxErrorScore * 5 + 2;
        break;
      case "(":
        syntaxErrorScore = syntaxErrorScore * 5 + 1;
        break;
      case "<":
        syntaxErrorScore = syntaxErrorScore * 5 + 4;
        break;
    }
  }
  return syntaxErrorScore;
}

let indexesToDelete = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  arrayOfChars.push(arrayOfLines[i].split(""));
  let stackOfChars = [];
  for (let j = 0; j < arrayOfChars[i].length; j ++) {
    let char = arrayOfChars[i][j];
    if (char === "{" || char === "<" || char === "(" || char === "[") {
      stackOfChars.push(char);
    }
    else if (char === "}" || char === ">" || char === ")" || char === "]") {
      let lastChar = stackOfChars.pop();
      if (!validateChunk(char, lastChar)) {
        indexesToDelete.push(i);
      }
    }
  }
}

for (let i = 0; i < indexesToDelete.length; i ++) {
  arrayOfLines.splice(indexesToDelete[i] - i, 1);
}

arrayOfChars = [];

for (let i = 0; i < arrayOfLines.length; i ++) {
  arrayOfChars.push(arrayOfLines[i].split(""));
  let stackOfChars = [];
  for (let j = 0; j < arrayOfChars[i].length; j ++) {
    let char = arrayOfChars[i][j];
    if (char === "{" || char === "<" || char === "(" || char === "[") {
      stackOfChars.push(char);
    }
    else if (char === "}" || char === ">" || char === ")" || char === "]") {
      stackOfChars.pop();
    }
  }
  if (arrayOfChars[i].length !== 0) {
    syntaxScoreArray.push(calculateSyntaxErrorScore(stackOfChars));
  }
}

let syntaxScoreArraySorted = syntaxScoreArray.sort((a, b) => {
  if (b < a) {
    return 1;
  }
  return -1;
});

console.log(syntaxScoreArraySorted[(syntaxScoreArraySorted.length - 1) / 2]);
