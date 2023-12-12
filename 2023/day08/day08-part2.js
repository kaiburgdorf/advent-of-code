const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';
//const inputFile = './puzzle-example2.txt';

const data = fs.readFileSync(inputFile, 'utf8');
const rows = data.split("\n");

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
cycles = [];

currentNodes.forEach((element, index) => {
  cycles.push(getCycles(element));
});

function getCycles(startItem) {
  var cycleStarts = [];
  var cycles = [];

  var steps = 0;
  var currentNode = startItem;
  while(!cycleStarts.includes(currentNode)) {
    instructions.forEach((instruction, index) => {

      //console.log("node: " + currentNode + " instruction: " + instruction);
      if(instruction === 'L') {
          currentNode = network[currentNode].left;
      }
      else if(instruction === 'R') {
          currentNode = network[currentNode].right;
      }
      else {
          console.warn("no R or L instruction");
      }

      steps++;
      if(currentNode.substring(2, 3) === 'Z') {
        cycleStarts.push(currentNode);
        cycles.push({
          startAtStep: steps,
          roundtripSteps: getCylcle(currentNode)
        })
      }
    });
  }

  return cycles;
}

function getCylcle(startItem, instructionsIndex) {
  var steps = 0;
  var currentNode = startItem;
  var skip = instructionsIndex;
  while(currentNode != startItem || steps < 1) {
    instructions.forEach((instruction, index) => {
      if(skip > 0) {
        skip--;
      } 
      else {
        if(instruction === 'L') {
            currentNode = network[currentNode].left;
        }
        else if(instruction === 'R') {
            currentNode = network[currentNode].right;
        }
        else {
            console.warn("no R or L instruction");
        }
        steps++;
      }
    });
  }
  return steps;
}

var refNode = cycles[0][0];
cycles.forEach((element, index) => {
  const node = element[0];
  if(node.roundtripSteps > refNode.roundtripSteps) {
    refNode = node;
  }
});

var isSolved = false;
var i = 0;
while(!isSolved) {
  if(i%1000000 == 0) console.log(i);
  var stepsToCheck = refNode.startAtStep + i * refNode.roundtripSteps;
  possibleForI = true;
  cycles.forEach((element, i) => {

   var possibleForNode = false;
   element.forEach((node, index) => {
      const isRoundTrip = (stepsToCheck - node.startAtStep) % node.roundtripSteps == 0;
      if(isRoundTrip) {
        possibleForNode = true;
      }
   });
    if(possibleForNode) {
      possibleForI = possibleForI && true;
    }
    else {
      possibleForI = possibleForI && false;
    }
  });

  if(possibleForI) {
    console.log(cycles);
    console.log(refNode);
    console.log(i);
    console.log("steps: " + (refNode.startAtStep + i * refNode.roundtripSteps));
    isSolved = true;
    return;
  }
  i++;
}
