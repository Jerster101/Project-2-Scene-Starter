/* exported setup, draw */
let seed = 12345;

const grassColor = "#e1ac4a";
const skyColor = "#cdd8e6";
const waterColor = "#3E81FF";
const hillColor = "#1e273f";
const treeColor = "#3d1803";
const leaveColor = "#233610";
const sunColor = [254,254,254,80]; // with opacity
const rockColor = "#96A1A4";

const treeGreen = "#315B16";

function preload() {
    // runs before setup 
    // use if you want to load any large files and want to make sure they load before setup()
}

function setup() {
  createCanvas(800, 400);
  createButton("reroll").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 2);

  // An example of making something respond to the mouse
  

  fill(grassColor);
  rect(0, height / 2, width, height / 2);

  // An example of drawing an irregular polygon
  fill(hillColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  // An example of recursively drawing an L-tree 
  function drawLtree() {
    let x = width * random();
    let y = height/1.4 + height/8 * random();
    let s = width/400 + (y - height/2)/2 - 10;
    let jitter = (mouseX - width/2) / width * 2 * Math.PI / 180;
    drawLtreeBranch(x, y, s, (-90 * Math.PI / 180) + jitter, 0, 5); // this angle points north (0 is east)
  }  

  function drawLtreeBranch(x, y, s, angle, max_limit, branch_weight) { // s is length of a segment
    stroke(treeColor);
    strokeWeight(branch_weight);
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);

    let new_s = s * 0.7;
    let new_max = max_limit + random();
    let new_branch_weight = branch_weight - 1;
    new_branch_weight = max(new_branch_weight, 1);

    if (max_limit < 3) {
        if (random() < 1/3) {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else if (random() > 1/3) {
            drawLtreeBranch(x2, y2, new_s, (-45 * Math.PI / 180), new_max, new_branch_weight);
            drawLtreeBranch(x2, y2, new_s, (-115 * Math.PI / 180), new_max, new_branch_weight);
        } else {
            //drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
            //drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        }
        drawLtreeBranch(x2, y2, new_s, angle, new_max, new_branch_weight);
    }
    else {
    
        if (random() < 1/3) {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
        } else if (random() > 1/3) {
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        } else {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        }
    }

  }

  function drawLeave(x, y, s, angle) {
    fill(leaveColor);
    noStroke();
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
    circle(x2, y2, 3);

  }







//back mountains
  fill(hillColor);
  beginShape();
  vertex(0, height / 2);
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 8 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  
  //lake
  fill(waterColor);
  rect(0, height / 2, width, height / 2);

  //mass trees
  fill(treeGreen);
  beginShape();
  vertex(width/2, (height));
  for (let i = 0; i < steps + +1; i++) {
    let x = (width * i) / steps + width/2;
    let y =
      height/2 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);

  //trees
  const trees = 5*random();
  for (let i = 0; i < trees; i++) {
    drawLtree();
  }

  //clouds
  fill(...sunColor);
  ellipse(mouseX+10,0,50,50);
  ellipse(mouseX,0,50,50);
  ellipse(mouseX+20,0,50,50);
  ellipse(mouseX+40,0,50,50);

  ellipse(mouseX+180,0,50,50);
  ellipse(mouseX+170,0,50,50);
  ellipse(mouseX+150,0,50,50);
  ellipse(mouseX+140,0,50,50);

  ellipse(mouseX+280,0,50,50);
  ellipse(mouseX+270,0,50,50);
  ellipse(mouseX+250,0,50,50);

  ellipse(mouseX+380,0,50,50);
  ellipse(mouseX+370,0,50,50);
  ellipse(mouseX+350,0,50,50);
  ellipse(mouseX+340,0,50,50);

  ellipse(mouseX+410,0,50,50);
  ellipse(mouseX+400,0,50,50);
  ellipse(mouseX+420,0,50,50);
  ellipse(mouseX+440,0,50,50);

  ellipse(mouseX+580,0,50,50);
  ellipse(mouseX+570,0,50,50);
  ellipse(mouseX+550,0,50,50);
  ellipse(mouseX+540,0,50,50);

  ellipse(mouseX+680,0,50,50);
  ellipse(mouseX+670,0,50,50);
  ellipse(mouseX+650,0,50,50);

  ellipse(mouseX+780,0,50,50);
  ellipse(mouseX+770,0,50,50);
  ellipse(mouseX+750,0,50,50);
  ellipse(mouseX+740,0,50,50);

  ellipse(mouseX-10,0,50,50);
  ellipse(mouseX,0,50,50);
  ellipse(mouseX-20,0,50,50);
  ellipse(mouseX-40,0,50,50);

  ellipse(mouseX-180,0,50,50);
  ellipse(mouseX-170,0,50,50);
  ellipse(mouseX-150,0,50,50);
  ellipse(mouseX-140,0,50,50);

  ellipse(mouseX-280,0,50,50);
  ellipse(mouseX-270,0,50,50);
  ellipse(mouseX-250,0,50,50);

  ellipse(mouseX-380,0,50,50);
  ellipse(mouseX-370,0,50,50);
  ellipse(mouseX-350,0,50,50);
  ellipse(mouseX-340,0,50,50);

  ellipse(mouseX-410,0,50,50);
  ellipse(mouseX-400,0,50,50);
  ellipse(mouseX-420,0,50,50);
  ellipse(mouseX-440,0,50,50);

  ellipse(mouseX-580,0,50,50);
  ellipse(mouseX-570,0,50,50);
  ellipse(mouseX-550,0,50,50);
  ellipse(mouseX-540,0,50,50);

  ellipse(mouseX-680,0,50,50);
  ellipse(mouseX-670,0,50,50);
  ellipse(mouseX-650,0,50,50);

  ellipse(mouseX-780,0,50,50);
  ellipse(mouseX-770,0,50,50);
  ellipse(mouseX-750,0,50,50);
  ellipse(mouseX-740,0,50,50);

  ellipse(mouseX-810,0,50,50);
  ellipse(mouseX-800,0,50,50);
  ellipse(mouseX-820,0,50,50);
  ellipse(mouseX-840,0,50,50);

  ellipse(mouseX-980,0,50,50);
  ellipse(mouseX-970,0,50,50);
  ellipse(mouseX-950,0,50,50);
  ellipse(mouseX-940,0,50,50);

  ellipse(mouseX-1080,0,50,50);
  ellipse(mouseX-1070,0,50,50);
  ellipse(mouseX-1050,0,50,50);

  ellipse(mouseX-1180,0,50,50);
  ellipse(mouseX-1170,0,50,50);
  ellipse(mouseX-1150,0,50,50);
  ellipse(mouseX-1140,0,50,50);

  //front mountains
  fill(rockColor);
  beginShape();
  vertex(0, (height));
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height/1.3 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}

