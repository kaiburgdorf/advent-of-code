var parsedInput = {};
var data = "";
const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

try {
  data = fs.readFileSync(inputFile, 'utf8');
  //console.log(data);
} catch (err) {
  console.error(err);
}


const inputMaps = data.split("\n\n");

inputMaps.forEach((mapData) => {
  var [name, values] = mapData.split(":");

  name = name.replace(" ", "-");

  var rows = values.trim().split("\n");
  rows.forEach((element, i) => {
    rows[i] = element.split(" ");
  })

  parsedInput = {...parsedInput, [name]: rows};
});


console.log(parsedInput.seeds);
var lowestLocationNumber = -1;
parsedInput.seeds[0].forEach((element, i) => {
  const seedLocation = getLocation(element);
  if(lowestLocationNumber > seedLocation || lowestLocationNumber == -1) {
    lowestLocationNumber = seedLocation;
  } 
  console.log("\n\n")
});
console.log("lowestLocationNumber: " + lowestLocationNumber);

function getLocation(seed){
  return getDest("humidity-to-location-map", getHumidity(seed));
}

function getHumidity(seed){
  return getDest("temperature-to-humidity-map", getTemperature(seed));
}

function getTemperature(seed){
  return getDest("light-to-temperature-map", getLight(seed));
}

function getLight(seed){
  return getDest("water-to-light-map", getWater(seed));
}

function getWater(seed){
  return getDest("fertilizer-to-water-map", getFertilizer(seed));
}

function getFertilizer(seed){
  return getDest("soil-to-fertilizer-map", getSoil(seed));
}

function getSoil(seed) {
  return getDest("seed-to-soil-map", seed);
}




function getDest(mapName, seed) {
  var mapElements = parsedInput[mapName];
  var correctDest = -1;
  mapElements.forEach((element, i) => {

    const destStart = parseInt(element[0]);
    const sourceStart = parseInt(element[1]);
    const range = parseInt(element[2]);

    var i = 0;
    while(i < range) {
      if(sourceStart+i == seed) {
        correctDest = destStart+i;
      }
      i++;
    }
    if(correctDest == -1) correctDest = seed;
  });
  
  console.log(mapName + "source: " + seed + " dest: " + correctDest);
  return correctDest; 
}
