exportFunctions = require("../export-functions");

let textOfFile = exportFunctions.readTextFile("./06.txt");

lanternFishArray = textOfFile.split(",");
newLanternFishArray = [];

const day = () => {
  for (let i = 0; i < lanternFishArray.length; i ++) {
    if (parseInt(lanternFishArray[i]) === 0) {
      lanternFishArray[i] = 6;
      newLanternFishArray.push(8);
    }
    else {
      lanternFishArray[i] = parseInt(lanternFishArray[i]) - 1;
    }
  }
  lanternFishArray = [...lanternFishArray, ...newLanternFishArray];
  newLanternFishArray = [];
}

for (let i = 0; i < 256; i ++) {
  day();
}

console.log(lanternFishArray.length);
