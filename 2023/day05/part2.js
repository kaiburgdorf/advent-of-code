const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
const inputMaps = data.split("\n\n");
var parsedInput = {};

inputMaps.forEach((mapData) => {
  var [name, values] = mapData.split(":");
  name = name.replace(" ", "-");
  var rows = values.trim().split("\n");
  rows.forEach((element, i) => {
    rows[i] = element.split(" ");
  })
  parsedInput = {...parsedInput, [name]: rows};
});

var location = 0; //50000000;
var seed = -1;
while(!checkSeed(seed)) {
  location++;
  if(location%1000000 == 0) console.log("location-progress: " + location);
  const humidity = findHumidity(location);
  const temperature = findTemperature(humidity);
  const light = findLight(temperature);
  const water = findWater(light);
  const fertilizer = findFertilizer(water);
  const soil = findSoil(fertilizer);
  seed = findSeed(soil);
}
console.log("got it");
console.log("its location: " + location);

function checkSeed(seed) {
  const mySeeds = parsedInput.seeds[0];
  var i = 0;
  var result = false;
  while(i+1 < mySeeds.length) {
    const start = parseInt(mySeeds[i]);
    const range = parseInt(mySeeds[i+1]);
    if(seed >= start && seed < start+range) {
      console.log("seed: " + seed);
      result = true;
      break;
    }
    i += 2;
  }
  return result;
}

function findSource(destObj, mapName) {
  var objMap = parsedInput[mapName];

  var result = destObj;
  
  objMap.forEach((element, i) => {
    const destStart = parseInt(element[0]);
    const sourceStart = parseInt(element[1]);
    const range = parseInt(element[2]);

    if(destObj >= destStart && destObj < destStart+range) {
      var offset = destObj-destStart;
      result = sourceStart+offset;
      return;
    }
  });

  return result;
}

function findSeed(soil) {
  return findSource(soil, "seed-to-soil-map");
}

function findSoil(fertilizer) {
  return findSource(fertilizer, "soil-to-fertilizer-map");
}

function findFertilizer(water) {
  return findSource(water, "fertilizer-to-water-map");
}

function findWater(light) {
  return findSource(light, "water-to-light-map");
}

function findHumidity(location) {
  return findSource(location, "humidity-to-location-map");
}

function findTemperature(humidity) {
  return findSource(humidity, "temperature-to-humidity-map");
}

function findLight(temperature) {
  return findSource(temperature, "light-to-temperature-map");
}