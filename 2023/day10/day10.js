const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
const rows = data.split("\n");

var steps = 0;
var positionA = findStart();
var positionB = findStart();

rows[positionA.y] = rows[positionA.y].replace("S", findStartTile(positionA));

[positionA.prev, positionB.prev] = findDirections(positionA);


while(steps == 0 || !( positionA.x === positionB.x && positionA.y === positionB.y)) {
    positionADirections = findDirections(positionA);
    var aNext = {};
    if(positionADirections[0].x == positionA.prev.x && positionADirections[0].y == positionA.prev.y) {
        aNext = positionADirections[1];
    }
    else {
        aNext = positionADirections[0];
    }
    positionA = {
        prev: positionA,
        x: aNext.x,
        y: aNext.y
    }
    positionBDirections = findDirections(positionB);
    var bNext = {};
    if(positionBDirections[0].x == positionB.prev.x && positionBDirections[0].y == positionB.prev.y) {
        bNext = positionBDirections[1];
    }
    else {
        bNext = positionBDirections[0];
    }
    positionB = {
        prev: positionB,
        x: bNext.x,
        y: bNext.y
    }

    steps++;
}
console.log("steps: " + steps);


// --- functions ---

function findStart() {
    var start = {};
    rows.forEach((row, i) => {
        if(row.indexOf("S") !== -1) {
            start = {
                prev: {x: -1, y: -1},
                x: row.indexOf("S"),
                y: i
            }
            return;
        }
    });
    return start;
}

function findStartTile(startPosition) {
    var top, left, right, bottom = false;

    if(rows[startPosition.y-1].charAt(startPosition.x) === '|' ||
        rows[startPosition.y-1].charAt(startPosition.x) === 'F' ||  
        rows[startPosition.y-1].charAt(startPosition.x) === '7'
    ) {
        top = true;
    }
    if(rows[startPosition.y+1].charAt(startPosition.x) === '|' ||
        rows[startPosition.y+1].charAt(startPosition.x) === 'L' ||  
        rows[startPosition.y+1].charAt(startPosition.x) === 'J'
    ) {
        bottom = true;
    }
    if(rows[startPosition.y].charAt(startPosition.x-1) === '-' ||
        rows[startPosition.y].charAt(startPosition.x-1) === 'F' ||  
        rows[startPosition.y].charAt(startPosition.x-1) === 'L'
    ) {
        left = true;
    }
    if(rows[startPosition.y].charAt(startPosition.x+1) === '-' ||
        rows[startPosition.y].charAt(startPosition.x+1) === '7' ||  
        rows[startPosition.y].charAt(startPosition.x+1) === 'J'
    ) {
        right = true;
    }

    if(top && bottom) return '|';
    if(left && right) return '-';
    if(top && left) return 'J';
    if(top && right) return 'L';
    if(bottom && left) return '7';
    if(bottom && right) return 'F';
    return '.';
}

function findDirections(position) {

    var tile = rows[position.y].charAt(position.x);

    switch(tile) {
        case ".":
            console.warn("hit floor");
            break;
        case "|":
            return [
                { x: position.x, y: position.y-1 },
                { x: position.x, y: position.y+1 }
            ]
        case "-":
            return [
                { x: position.x-1, y: position.y },
                { x: position.x+1, y: position.y }
            ]
        case "F":
            return [
                { x: position.x+1, y: position.y },
                { x: position.x, y: position.y+1 }
            ]
        case "7":
            return [
                { x: position.x-1, y: position.y },
                { x: position.x, y: position.y+1 }
            ]
        case "J":
            return [
                { x: position.x, y: position.y-1 },
                { x: position.x-1, y: position.y }
            ]
        case "L":
            return [
                { x: position.x, y: position.y-1 },
                { x: position.x+1, y: position.y }
            ]
    }
}