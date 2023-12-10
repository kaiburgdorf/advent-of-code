const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
console.log(data);

var races = [];

var [timeRow, distanceRow] = data.split("\n");

var time = timeRow.split(":")[1].trim().replace(/\s+/g, "");
var record = distanceRow.split(":")[1].trim().replace(/\s+/g, "");

var i = 0;
var possibleRecordCounter = 0;
while( i < time) {
    const distance = checkDistanceForChargeTime(i, time);
    //console.log("distance: " + distance + " charge time: " + i);
    if(distance > record) possibleRecordCounter++;
    i++;
}
console.log("possible ways to win: " + possibleRecordCounter);

function checkDistanceForChargeTime(chargeTime, raceTime) {
    const movingTime = raceTime-chargeTime;
    return movingTime*chargeTime;
}