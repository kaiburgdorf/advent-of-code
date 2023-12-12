const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
const rows = data.split("\n");

console.log(rows);

var network = {};
var instructions = rows[0].trim().split("");
console.log(instructions);

const networkRows = rows.splice(2);

networkRows.forEach((element, index) => {
    const key = element.substring(0,3);
    const left = element.substring(7, 10);
    const right = element.substring(12, 15);

    console.log("key " + key + " left: " + left + " right " + right);

    network = {
        ...network,
        [key]: {
            left,
            right
        }

    }
});

var currentNode = 'AAA';
var steps = 0;
var solved = false;
while(!solved) {
    instructions.forEach((instruction, index) => {

      if(instruction === 'L') {
          currentNode = network[currentNode].left;
          console.log("go left");
      }
      else if(instruction === 'R') {
          currentNode = network[currentNode].right;
          console.log("go right");
      }
      else {
          console.warn("no R or L instruction");
      }
      
      steps++;
      if(currentNode === 'ZZZ') {
          console.log("steps to ZZZ: " + steps);
          solved = true;
          return;
      }
    });
}