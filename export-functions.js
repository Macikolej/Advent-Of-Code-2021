const readTextFile = (path) => {
  let fs = require('fs');
  let text = fs.readFileSync(path, 'utf8');
  return text;
}

const splitTextFileByNewLine = (path) => {
  return readTextFile(path).split("\n")
}

module.exports = { readTextFile, splitTextFileByNewLine }
