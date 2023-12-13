const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
const rows = data.split("\n");

console.log(rows);
var sum = 0;
rows.forEach((row, index) => {

    var history = row.split(/\s+/).map(o => parseInt(o));
    sum += predictNext(history);
});

console.log("sum: " + sum);

function predictNext(history) {
   console.log(history);
   var sequences = [history];

   while (!isAllZeros(sequences[sequences.length-1])) {
    sequences.push(getNextSequence(sequences[sequences.length-1]));
   }

   console.log(sequences);
   return extrapolateFromSequences(sequences);
}

function extrapolateFromSequences(sequences) {

    var predictedValue = 0;
    sequences.reverse().forEach((sequence, index) => {
        console.log("prediction: " + predictedValue)
        if(index >= sequences.length-1) return;
        preveousSequence = sequences[index+1];
        predictedValue = preveousSequence[0] - predictedValue;
    })
    return predictedValue;
}

function getNextSequence(sequence) {
    var nextSequence = [];
    sequence.forEach((element, index) => {
        if(index < sequence.length-1) {
            nextSequence.push(sequence[index+1] - element);
        }
    });

    if (sequence.length == 1) return [0];
    return nextSequence;
}


function isAllZeros(sequence) {
    var result = true;
    sequence.forEach((element) => result = result && element == 0);
    return result;
}