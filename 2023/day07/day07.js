const fs = require('node:fs');

const inputFile = './puzzle.txt';
//const inputFile = './puzzle-example.txt';

const data = fs.readFileSync(inputFile, 'utf8');
const rows = data.split("\n");
var handObjects = [];

rows.forEach((row, i) => {
    const [hand, bid] = row.trim().split(" ");

    var i = 0;
    while(isCurrenHandBetter(handObjects[i]?.hand, hand) && i <= handObjects.length) {
        i++;
    }

    if(handObjects.length < 1) {
        handObjects.push({hand, bid});
    }
    else {
      handObjects.splice(i, 0, {hand, bid});
    }
});

var sum = 0;
handObjects.forEach((element, index) => {
    sum += (index+1)*element.bid;
});
console.log("sum: " + sum);

function isCurrenHandBetter(indexHand, currentHand) {
    if(!indexHand) return true;

    if(isFiveOfAKind(indexHand)) {
        if(!isFiveOfAKind(currentHand)) return false;
    }
    if(isFourOfAKind(indexHand)) {
        if(isFiveOfAKind(currentHand)) return true;
        if(isFourOfAKind(currentHand) && compareFirstCard(indexHand, currentHand) == 1) return true;
    }
    else if(isFullHouse(indexHand)) {
        if(isFiveOfAKind(currentHand)) return true;
        if(isFourOfAKind(currentHand)) return true;
        if(isFullHouse(currentHand) && compareFirstCard(indexHand, currentHand) == 1) return true;
    }
    else if(isThreeOfAKind(indexHand)) {
        if(isFiveOfAKind(currentHand)) return true;
        if(isFourOfAKind(currentHand)) return true;
        if(isFullHouse(currentHand)) return true;
        if(isThreeOfAKind(currentHand) && compareFirstCard(indexHand, currentHand) == 1) return true;
    }
    else if(isTwoPair(indexHand)) {
        if(isFiveOfAKind(currentHand)) return true;
        if(isFourOfAKind(currentHand)) return true;
        if(isFullHouse(currentHand)) return true;
        if(isThreeOfAKind(currentHand)) return true;
        if(isTwoPair(currentHand) && compareFirstCard(indexHand, currentHand) == 1) return true;
    }
    else if(isOnePair(indexHand)) {
        if(isFiveOfAKind(currentHand)) return true;
        if(isFourOfAKind(currentHand)) return true;
        if(isFullHouse(currentHand)) return true;
        if(isThreeOfAKind(currentHand)) return true;
        if(isTwoPair(currentHand)) return true;
        if(isOnePair(currentHand) && compareFirstCard(indexHand, currentHand) == 1) return true;
    }
    else {
        if(isFiveOfAKind(currentHand)) return true;
        if(isFourOfAKind(currentHand)) return true;
        if(isFullHouse(currentHand)) return true;
        if(isThreeOfAKind(currentHand)) return true;
        if(isTwoPair(currentHand)) return true;
        if(isOnePair(currentHand)) return true;
        if(compareFirstCard(indexHand, currentHand) == 1) return true;
    }
 
    return false;
}

function compareFirstCard(a, b) {

    var differntIndex = 0;
    const aChars = a.split("");
    const bChars = b.split("");
    while(differntIndex <= 5 && aChars[differntIndex] === bChars[differntIndex]) differntIndex++;

    if(differntIndex > 5) return 1;

    const values = "A,K,Q,J,T,9,8,7,6,5,4,3,2".split(",").reverse();
    if(values.findIndex((a) => a === aChars[differntIndex]) < values.findIndex((b) => b === bChars[differntIndex]) ) {
        return 1;
    }
    return 0;
}

function isFiveOfAKind(value) {
    const counts = {};
    const cards = value.split("");
    cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
   
    var result = false;
    cards.forEach((element, i) => {
        if(counts[element] == 5) {
            result = true;
            return
        }
    });

    return result;
}

function isFourOfAKind(value) {
    const counts = {};
    const cards = value.split("");
    cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
   
    var result = false;
    cards.forEach((element, i) => {
        if(counts[element] == 4) {
            result = true;
            return
        }
    });

    return result;
}

function isThreeOfAKind(value) {
    const counts = {};
    const cards = value.split("");
    cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
   
    var result = false;
    cards.forEach((element, i) => {
        if(counts[element] == 3) {
            result = true;
            return
        }
    });

    return result;
}

function isFullHouse(value) {
    const counts = {};
    const cards = value.split("");
    cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
   
    var hasTwoOfaKind = false;
    var hasThreeOfaKind = false;
    cards.forEach((element, i) => {
        if(counts[element] == 3) {
            hasThreeOfaKind = true;
        }
        if(counts[element] == 2) {
            hasTwoOfaKind = true;
        }
    });

    return hasTwoOfaKind && hasThreeOfaKind;
}

function isTwoPair(value) {
    const counts = {};
    const cards = value.split("");
    cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
   
    var twoPairCount = 0;
    cards.forEach((element, i) => {
        if(counts[element] == 2) {
            twoPairCount++;
        }
    });

    return twoPairCount === 4;
}

function isOnePair(value) {
    const counts = {};
    const cards = value.split("");
    cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
   
    var twoPairCount = 0;
    cards.forEach((element, i) => {
        if(counts[element] == 2) {
            twoPairCount++;
        }
    });

    return twoPairCount == 2;
}