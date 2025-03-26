// This will go into a bead.js file eventually
class Bead{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

function setup() {
  createCanvas(800, 800);
  colors = [color(0, 0, 255), color(255, 0, 0), color(175, 75, 25), color(0, 255, 0), color(255, 255, 0)];
}

let bead = []; //Two dimensional array of 100 beads total
let positions = []; //Duplicate of beads (for original positions)
let curState = []; //0 = bead on the left; 1 = bead on the right side
let newState = [];
let row = []; // Control values of each row
for(var i = 0; i < 10; i++){
  bead.push([]);
  positions.push([]);
  curState.push([]);
  newState.push([]);
  for(var j = 0; j < 10; j++){
    bead[i].push([]);
    positions[i].push([]);
    curState[i].push([]);
    newState[i].push([]);
    curState[i][j].push(0);
    newState[i][j].push(0);
  }
}
let distance = 333; // x distance to add to make bead on right side
// console.log(curState)
let speed = 0.03;
let moving = false;
// Starting parameters (doesn't work while in setup() for some reason)
var x = 106;
var y = 125;
var w = 25;
var h = 35;
for(var i = 0; i < 10; i++){
  row.push(0);
  for(var j = 0; j < 10; j++){ // Create bead objects
    bead[i][j] = new Bead(x + (j * w), y + (i * (h + 20)), w, h);
    positions[i][j] = new Bead(x + (j * w), y + (i * (h + 20)), w, h);
  }
}

// Carrying mechanism for addition (c indicates whether to do recursion)
function carry(i, c){
  // console.log(bLength);
  // if(row[bLength - i - 1] + int(bNumbers[i]) >= 10){
    // carry();
  total = row[bLength - i - 1];
  if(c == 1){
    total += int(bNumbers[i]);
  }
  // console.log(total);
  current = row[bLength - i - 1];
  row[bLength - i - 1] = 10; //animate
  remainder = total - 10;
  row[bLength - i] += 1; //animate
  row[bLength - i - 1] = 0; //animate
  row[bLength - i - 1] += remainder; //animate
  if(row[bLength - i] + c * int(bNumbers[i + 1]) >= 10){ //recursion if needed on above rows
    i -= 1;
    carry(i, 0);
  }
}

function stall(){
  // while(moving){
  //   continue;
  // }
  console.log(moving);
}

// Tried animating step by step with this function

// function display(){
//   for(var m = 0; m < 10; m++){
//     for(var n = 0; n < 10; n++){
//       show(m, n, m % colors.length);
//     }
//   }
// }

// Set all row values to zero
function clearBeads(){
  for(var i = 0; i < 10; i++){
    row[i] = 0;
  }
}

function display(){
  for(var i = 0; i < 10; i++){ //Draw the beads
    for(var j = 0; j < 10; j++){
      show(i, j, i % colors.length);
    }
  }
}

// function delay(time){
//   return new Promise((resolve, reject) >= {
//     if(isNaN(time)){
//       reject(new Error('delay requires a valid number'));
//     }
//   });
// }

// Adds two numbers step by step
function add(a, b){
  clearBeads();
  //delay(3000);
  aNumbers = (""+a).split("");
  aLength = aNumbers.length;
  for(var i = 0; i < aLength; i++){
    row[aLength - i - 1] = int(aNumbers[i]); //animate
    //delay(3000); // display();
  }
  bNumbers = (""+b).split("");
  bLength = bNumbers.length;
  currentI = 0;
  for(var i = 0; i < bLength; i++){
    currentI = i;
    // show(iNum, jNum, 1);
    if(row[bLength - i - 1] + int(bNumbers[i]) >= 10){
      carry(i, 1); // carry if row value is greater or equal to 10
      i = currentI;
    }else{
      row[bLength - i - 1] += int(bNumbers[i]); // animate; add value to row
      //delay(3000);
    }
  }
}


// How I would do it if it weren't step by step

// function add(a, b){
//   clearBeads();
//   result = a + b;
//   rResult = (""+result).split("");
//   rLength = rResult.length;
//   for(var i = 0; i < rLength; i++){
//     row[rLength - i - 1] = int(rResult[i]);
//   }
// }

// Obsolete function

let times = 0;
function repeat(){
  aRandom = floor(random(1,99999999));
  bRandom = floor(random(1,99999999));
  console.log(aRandom + bRandom);
  add(aRandom, bRandom);
  times += 1;
  if(times < 1500){
    setTimeout(repeat, 2500);
  }else{
    return;
  }
}

function move(){
  // bead[bead.length-1][bead.length-1].x = 665;
  // bead[bead.length-1][bead.length-2].x = 665-w;
  // row[0] = 5;
  // bead[bead.length-1][bead.length-2].x += (w * row[2-1]);

}

// console.log(row);

//Determine whether beads should be on left or right side according to row array values

function checkStates(curState){
  for(var i = 1; i <= row.length; i++){
    for(var j = 1; j <= row.length; j++){
      curState[curState.length-i][curState.length-j] = 0;
    }
  }
  for(var i = 1; i <= row.length; i++){
    for(var j = 1; j <= row[i - 1]; j++){
      curState[curState.length-i][curState.length-j] = 1;
    }
  }
}

// For debugging only log positions when manually called (or else overload)

function checkState(curState){
  checkStates(curState);
  console.log(positions);
}

function moveLeft(i, j){
  for(var k = 1; k <= curState.length; k++){
    for(var l = 1; l <= curState.length; l++){
      if(curState[curState.length-k][curState.length-l] == 0){ //If bead needs to be on left side, animate if not there already
        while(bead[bead.length-k][bead.length-l].x > positions[positions.length-k][positions.length-l].x){
          bead[bead.length-k][bead.length-l].x -= speed;
          ellipse(bead[k][l].x, bead[k][l].y, bead[k][l].w, bead[k][l].h);
        // }else{
          // bead[bead.length-k][bead.length-l].x = positions[positions.length-k][positions.length-l].x;
        }
        ellipse(bead[i][j].x, bead[i][j].y, bead[i][j].w, bead[i][j].h);
      }
    }
  }
}

function moveRight(i, j){
  for(var k = 1; k <= curState.length; k++){
    for(var l = 1; l <= curState.length; l++){
      if(curState[curState.length-k][curState.length-l] != 0){ //If bead needs to be on left side, animate if not there already
        while(bead[bead.length-k][bead.length-l].x < positions[positions.length-k][positions.length-l].x + distance){
          bead[bead.length-k][bead.length-l].x += speed;
          ellipse(bead[k][l].x, bead[k][l].y, bead[k][l].w, bead[k][l].h);
        // }else{
          // bead[bead.length-k][bead.length-l].x = positions[positions.length-k][positions.length-l].x + distance;
        }
        ellipse(bead[i][j].x, bead[i][j].y, bead[i][j].w, bead[i][j].h);
      }
    }
  }
}

function moveBeads(i, j){

  // for(var k = 1; k <= curState.length; k++){
  //   for(var l = 1; l <= curState.length; l++){
  //     if(curState[curState.length-k][curState.length-l] == 0){ //If bead needs to be on left side, animate if not there already
  //       if(bead[bead.length-k][bead.length-l].x > positions[positions.length-k][positions.length-l].x){
  //         bead[bead.length-k][bead.length-l].x -= speed;
  //       }else{ //Stay there if already there
  //         bead[bead.length-k][bead.length-l].x = positions[positions.length-k][positions.length-l].x;
  //       }
  //     }else{ //Same for right side
  //       if(bead[bead.length-k][bead.length-l].x < positions[positions.length-k][positions.length-l].x + distance){
  //         bead[bead.length-k][bead.length-l].x += speed;
  //       }else{
  //         bead[bead.length-k][bead.length-l].x = positions[positions.length-k][positions.length-l].x + distance;
  //       }
  //     }
  //   }
  // }
  // ellipse(bead[i][j].x, bead[i][j].y, bead[i][j].w, bead[i][j].h); // Draw the bead
}

// Display elements
function show(i, j, c){
  // frameRate(1);
  fill(colors[c]);
  noStroke();
  checkStates(curState);
  //
  for(var k = 1; k <= curState.length; k++){
    for(var l = 1; l <= curState.length; l++){
      if(curState[curState.length-k][curState.length-l] != 0){ //If bead needs to be on left side, animate if not there already
        while(bead[bead.length-k][bead.length-l].x < positions[positions.length-k][positions.length-l].x + distance){
          bead[bead.length-k][bead.length-l].x += speed;
          ellipse(bead[k][l].x, bead[k][l].y, bead[k][l].w, bead[k][l].h);
        // }else{
          // bead[bead.length-k][bead.length-l].x = positions[positions.length-k][positions.length-l].x + distance;
        }
        ellipse(bead[i][j].x, bead[i][j].y, bead[i][j].w, bead[i][j].h);
      }
    }
  }
  //
  // moveBeads(i, j);
  moveLeft(i, j);
  moveRight(i, j);
}

function draw() {
  background(220);
  noFill();
  stroke(0);
  strokeWeight(5);
  var spacing = 55; // Spacing of lines (rows)
  for(var i = 0; i < 10; i++){
    line(95, 125 + (i * spacing), 675, 125 + (i * spacing)); //Draw the lines
  }
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      show(i, j, i % colors.length)
    }
  }
  noFill();
  stroke(255, 255, 0);
  strokeWeight(15);
  rect(85, 75, 600, 600); // Frame of abacus
  rect(35, 685, 700, 10); // Bottom surface of abacus
}