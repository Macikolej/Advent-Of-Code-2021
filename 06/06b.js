exportFunctions = require("../export-functions");

let textOfFile = exportFunctions.readTextFile("./06.txt");

lanternFishArray = textOfFile.split(",");

const countChildren = (fish, daysLeft) => {
  let days = daysLeft;
  days -= (fish + 1);
  let sum = 0;
  for (let i = days; i >= 0; i -= 7) {
    sum += 1 + countChildren(8, i)
  }
  return sum;
}

const startDate = new Date();

let sum = 0;
let values = [0, 0, 0, 0, 0, 0];
for (let i = 0; i < lanternFishArray.length; i ++ ) {
  if (values[parseInt(lanternFishArray[i])] === 0) {
    console.log("Counting value for: " + parseInt(lanternFishArray[i]));
    values[parseInt(lanternFishArray[i])] = 1 + countChildren(parseInt(lanternFishArray[i]), 256);
  }
  sum += values[parseInt(lanternFishArray[i])];
}
const endingDate = new Date();

console.log(sum);
console.log("Date of start: " + startDate);
console.log("Date of end: " + endingDate);


