exportFunctions = require("../export-functions");

let arrayOfLines = exportFunctions.splitTextFileByNewLine("./10.txt");
let arrayOfChars = [];
let totalSyntaxScore = 0;

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

const calculateSyntaxErrorScore = (char) => {
  switch(char) {
    case ")":
      return 3;
      break;
    case "]":
      return 57;
      break;
    case "}":
      return 1197;
      break;
    case ">":
      return 25137;
      break;
  }
}

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
        totalSyntaxScore += calculateSyntaxErrorScore(char);
      }
    }
  }
}


console.log(totalSyntaxScore);
