let imgs = new Array(54);
let cans = [];

let xpos = 0;
let xvel = 0;
let lpos, mpos;
let paused = false;
let upright = false;

function preload() {
  for (let i=0; i<54; i++){
    imgs[i] = loadImage("C/"+i+".png");
  }
}

const CYCLE = 300;
const NUM = 54;


function setup() {
	//let s = min(windowWidth, windowHeight) * 1.0;
	createCanvas(windowWidth, windowHeight, WEBGL);
	
	let dep = max(width,height);
	ortho(-width / 1.5, width / 1.5, -height / 2, height / 2,-dep*4 , dep*4);

    zoom = 1.2 * height;
	lpos = createVector(0, 0);
	mpos = createVector(mouseX, mouseY);
}



function draw() {
	background(0);
    setLighting();

  for (let c of cans) {
		if (frameCount > 90 && paused == false) {
			c.move();
		} else if (upright) {
			c.upright();
		}
		c.show();
	}
	const frameSpan = CYCLE / NUM;
	const unitMaxSize = width * 0.3;
	
	let radius = 0.5 * (width - unitMaxSize * 1.2);
	
	noStroke();
	push();
	rotateX(-PI/4);
	rotateY(-PI/4);
  

	for(let i = 0; i < NUM; i++){
		let angle = getRaioEased(frameCount + i * frameSpan) * TAU;
		let r = unitMaxSize * (0.6 + 0.4 * sin(i / NUM * TAU));
		
		let x = radius * cos(angle);
		let y = 0;
		let z = radius * sin(angle);
		rectMode(CENTER);
	    let hoho = i%8;
        texture(imgs[hoho]); 
		push();
		translate(x, y, z);
		rotateY(-angle);
		rect(0, 0, r, r, 45);
		pop();
	}
	pop();
  
}

 function mousePressed(){
  save("imgs" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() +  "imgs");
}
  

function getRatio(count){
   let frameRatio  = (count % CYCLE) / CYCLE;
	return frameRatio;
  
}

function getRaioEased(count){
	let ratio = getRatio(count);
	let easeRatio = inOutQuint(ratio)* 0.9 + ratio * 0.1 ;
	return easeRatio;
}


    /*function inOutCubic (x){
	if(x < 0.5)return 0.5 * pow(2*x, 3);
	else return 0.5 * pow(2*(x-1), 3) + 1;
} */

function inOutQuint(x){
  if (x < 0.5) {
    return 0.5 * pow(2 * x, 5);
  } else {
    return 0.5* pow(2 * (x - 1), 5) + 1;
  }
}

  function createCols(imgs) {}


function setLighting() {
	ambientLight(0);
	mpos.x = mouseX - width / 2;
	mpos.y = mouseY - height / 2;
	lpos.x = lerp(lpos.x, mpos.x, 0.1);
	lpos.y = lerp(lpos.y, mpos.y, 0.1);
	pointLight(250, 250, 250, lpos.x, lpos.y, 50);
}


function keyPressed() {
	if (keyCode == 32) {
		paused = !paused;
		upright = false;
	}
	if (keyCode == 82) {
		paused = true;
		upright = true;
	}

}

