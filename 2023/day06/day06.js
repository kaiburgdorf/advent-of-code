const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
console.log(data);

var races = [];

var [timeRow, distanceRow] = data.split("\n");

var times = timeRow.split(":")[1].trim().split(/\s+/);
var distances = distanceRow.split(":")[1].trim().split(/\s+/);

times.forEach((element, i) => {
    races.push({
        time: parseInt(element),
        record: parseInt(distances[i])
    })
});

console.log(races);

var possibilities = [];

races.forEach((race, index) => {
    console.log("Race: " + index);
    var i = 0;
    var possibleRecordCounter = 0;
    while( i < race.time) {
        const distance = checkDistanceForChargeTime(i, race.time);
        //console.log("distance: " + distance + " charge time: " + i);
        if(distance > race.record) possibleRecordCounter++;
        i++;
    }
    console.log("possible ways to win: " + possibleRecordCounter);
    possibilities.push(possibleRecordCounter);
});

result = possibilities.reduce((a, b)=> a*b, 1);
console.log("result: " + result);

function checkDistanceForChargeTime(chargeTime, raceTime) {
    const movingTime = raceTime-chargeTime;
    return movingTime*chargeTime;
}