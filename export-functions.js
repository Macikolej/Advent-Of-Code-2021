const readTextFile = (path) => {
  let fs = require('fs');
  let text = fs.readFileSync(path, 'utf8');
  return text;
}

module.exports = { readTextFile }
