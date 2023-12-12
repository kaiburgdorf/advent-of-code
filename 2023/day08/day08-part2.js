const fs = require('node:fs');

//const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';
const inputFile = './puzzle-example2.txt';

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

var currentNodes = [];
Object.keys(network).forEach((element, index) => {
    if(element.substring(2, 3) === 'A') currentNodes.push(element);
});

console.log(currentNodes);

var steps = 0;
var solved = false;
while(!solved) {
    instructions.forEach((instruction, index) => {

      if(instruction === 'L') {
          currentNodes.forEach((element, index) => {
            currentNodes[index] = network[element].left;
          });
          console.log("go left");
      }
      else if(instruction === 'R') {
          currentNodes.forEach((element, index) => {
            currentNodes[index] = network[element].right;
          });
          console.log("go right");
      }
      else {
          console.warn("no R or L instruction");
      }
      
      steps++;

      //check all for ending with Z
      solved = true;
      currentNodes.forEach((element, index) => {
        if(element.substring(2, 3) === 'Z') {
          solved = solved && true;
        }
        else {
          solved = solved && false;
        }
      });

      if(solved) {
        console.log("solved in steps: " + steps)
        fs.writeFileSync("./result", "solved in steps: " + steps + "\n");
        return;
      } 

    });
}