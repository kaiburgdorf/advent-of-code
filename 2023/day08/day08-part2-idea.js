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


/**
 * cycle: {
 *   startsAtStep: x
 *   roundtripSteps: y
 *    instruction index kann aus startstep berechnet werden
 * }
 */
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



console.log(cycles);

var isSolved = false;
var i = 0;
while(!isSolved) {

  firstNodeCycles = cycles[0];
  allButFirstNodeCycles = cycles.splice(1);
  
  firstNodeCycles.forEach((firstNodeCycle, index) => {
    allButFirstNodeCycles.forEach((nodeCycles, j) => {
      var possible = false;
      nodeCycles.forEach((nodeCycle, k) => {
        //entw. passt schon firstNodeCycle.start
        //sonst vielleicht firstNodeCycle.start + i*firstNodeCycle.rts
        //a.start + i * a.rts % b.start + i * b.rtt == 0
        if(firstNodeCycle.startAtStep < nodeCycle.startAtStep) {
          if((nodeCycle.startAtStep - firstNodeCycle.startAtStep) % firstNodeCycle.roundtripSteps == 0) {
            console.log("possible in steps " + (firstNodeCycle.startAtStep + firstNodeCycle.roundtripSteps * ((nodeCycle.startAtStep - firstNodeCycle.startAtStep) / firstNodeCycle.roundtripSteps)));
            possible = true;
            return;
          }
        }
      });

    })
  })

}
