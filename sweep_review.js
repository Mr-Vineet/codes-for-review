// Do not rename minefield, use it as input for your program.
const minefield = "-*--\n---*\n*-*-\n-*--";

// Clear the mines one by one, always choosing the mine closest to the top left hand corner
// See the README for more details
// START YOUR CODE AFTER THIS LINE. DO NOT REMOVE THIS LINE

// DO IT USING ADIL'S METHOD 

// const DIFFUSE = "+";
let row = 0;
let column = 0;
let distance = "";
let noOfMines = 0;

// finding the distance and noOfMines in the field
for (let index = 0; index < minefield.length; index++) {
    if (minefield[index] === "*") {
        distance = distance + (row + column);
        noOfMines++;
    }
    
    column++;
    
    if (minefield[index] === "\n") {
        row++;
        column = 0;
    }
}
// console.log(distance);
// console.log(noOfMines);
let partlyDiffusedField = minefield;

for (let mineCounter= 0; mineCounter < noOfMines; mineCounter++) {
    let diffusedField = "";
    
    // finding closestMineLoc
    let disIndex = 0;
    let closestMineLoc = distance[disIndex];

    for (let disIndex = 0; disIndex < distance.length - 1; disIndex++) {
        if (closestMineLoc > (+distance[disIndex + 1])) {
            closestMineLoc = distance[disIndex + 1];
        }
    }

    // console.log(closestMineLoc);

    // removing closestMineLoc from distance and counting sameDistanceMines
    let newDistance = "";
    let sameDistanceMines = 0;
    let closestFound = false;

    for (let disIndex = 0; disIndex < distance.length; disIndex++) {
        if (distance[disIndex] === closestMineLoc && !closestFound) {
            sameDistanceMines++;
            closestFound = true;
        } else {
            newDistance += distance[disIndex];
        }
    }

    distance = newDistance;

    // console.log(sameDistanceMines);
    
    // console.log(newDistance);
    // console.log(distance);
    // defusing closest mine and printing the map without further change
    let xcordinate = 0;
    let ycordinate = 0;
    let position = 0;
    let currentIndex = 0;

    while (currentIndex < minefield.length ) {
        position = xcordinate + ycordinate;
        const isTheMineClosest = position === +closestMineLoc;
        const isMineFound = partlyDiffusedField[currentIndex] === "*";
        if (isMineFound && isTheMineClosest && sameDistanceMines !== 0) {
                diffusedField += "+";
                sameDistanceMines--;
        } else {
            diffusedField += partlyDiffusedField[currentIndex];
        }
    
        xcordinate++;

        if (partlyDiffusedField[currentIndex] === "\n") {
            ycordinate++;
            xcordinate = 0;
        }
        
        currentIndex++;
    }

    partlyDiffusedField = diffusedField;

    console.log(diffusedField);
    console.log();
}
