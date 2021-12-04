const readTextFile = (path) => {
  let fs = require('fs');
  let text = fs.readFileSync(path, 'utf8');
  return text;
}

const splitTextFileByNewLine = (path) => {
  return readTextFile(path).split("\n")
}

const transformNumberFromBinaryToDecimal = (number) => {
  let result = 0;
  for (let i = number.length - 1; i >= 0; i --) {
    result += number[i] * Math.pow(2, number.length - i - 1);
  }
  return result;
}

module.exports = { readTextFile, splitTextFileByNewLine, transformNumberFromBinaryToDecimal }
