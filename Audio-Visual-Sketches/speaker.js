//Speaker

//Creating a function to store everything in to be called in the sketch.js
function drawshape_speaker(){
  background("#FF69B4"); //Hot Pink

  //Setting the size in px, colour and position of the text
  push(); //Store information
  fill(255); //White
  textSize(30);
  textAlign(CENTER); //Text will be written centrally 
  text("Cartoon x Time To Talk - Omen (Ft. Asena)", width/2, 100); //("", x-axis,y-axis)
  pop(); //Restore to 'default' settings

  //Vol, diam, diam2 & diam3 are variables
  let vol = amp.getLevel(); //Returns an amplitude reading when called - amplitude is a number between 0 and 1, however I have maxed the sound to 0.3 so that is the highest the amplitude reading can go
  //Maps the range of the volume (0-0.25 in this case) and the volume will correspond with the diameter of the object
  let diam = map(vol, 0, 0.25, 100, 200); //This states the starting object will be 100px and can increase up to 200px
  let diam2 = map(vol, 0, 0.25, 80, 180); //This states the starting object will be 80px and can increase up to 180px
  let diam3 = map(vol, 0, 0.25, 70, 150); //This states the starting object will be 70px and can increase up to 150px


  //Speaker (Outside) - layering circles on one another to create a speaker. Changing the fill and stroke to make each layer stand out
  //Fill colours in the interior of each ellipse unless stated otherwise with noFill()
  //Fill, when only 0-255, colours black to white
  fill(20); 
  //Ellipse creates a circle with the first number being the position on the x coordinate, the second being the y coordinate and the third number being the width
  ellipse(400, 400, 350); 
  //Stroke is the colour of the outline around each object and strokeWeight is the thickness of that outline
  stroke(0);
  strokeWeight(1); //Outline will be a thickness of 1px
  //Inner ring
  fill(50);
  ellipse(400, 400, 300);
  //Screws
  fill(200);
  ellipse(300, 303, 12);
  ellipse(500, 303, 12);
  ellipse(300, 498, 12);
  ellipse(500, 498, 12); 

  //Inside 
  fill(70);
  ellipse(400, 400, 260);
  fill(50);
  ellipse(400, 400, diam, diam); //This uses the sizes given in diam so the corresponding size right now is 100px - 200px
  fill(40);
  ellipse(400, 400, diam2, diam2); //This uses the sizes given in diam2 so the corresponding size right now is 80px - 180px
  fill(80);
  ellipse(400, 400, diam3, diam3); //This uses the sizes given in diam3 so the corresponding size right now is 70px - 150px


  //Particles
  noFill(); //No colour in the interior of the shape
  stroke(255); //Outline colour will be white
  translate(width / 2, height / 2); //Starting position for each object - x and y axis is the middle of the canvas

  // .analyze() must be called before getEnergy 
  fft.analyze(); //Records amplitude values, by default the FFT bin can hold 1024 values. Each value shows the amplitude at that time of the frequence spectrum
  amp2 = fft.getEnergy(20, 200); //Amplitude at a specific frequency

  let wave = fft.waveform(); //Collects values along a certain moment of time and each value represents amplitude of the waveform at that moment in time

  let p = new Particle(); //Variable p now holds the object/class Particle
  particles.push(p); //Inserts the values of variable p into the particles array

  for (let i = particles.length - 1; i >= 0; i--) { //i is set to -1 and cannot go higher or equal 0
    //Spawning particles in places particles are not already there
    if (!particles[i].edges()) {
      particles[i].update(amp2 > 150); //If the frequency is higher than 150 particles increase in velocity
      particles[i].show(); //Draws particles
    } else {
      particles.splice(i, 1); //specifies the array to be modified and the data to be inserted 
    }

  }

  }

  class Particle { //template for the object Particle
    constructor(){ //Creates an object inside a class
      //random2D makes a new 2D unit vector from a random angle 
      //mult is width of starting point
      this.pos = p5.Vector.random2D().mult(180); 
      this.vel = createVector(0,0); //Creates a new datatype for storing vectors
      this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
  
      this.w = random(3, 5); //Size of particles
    }
    update(cond){
      //Controls the velocity of the particles based on the sound
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      if (cond){
        //With certain amplitudes the particles will speed up 
        this.pos.add(this.vel);
        this.pos.add(this.vel);
        this.pos.add(this.vel);
      }
    } 
  
    edges(){ //Sharpens the pixels
      if (this.pos.x < -width /2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2){
        return true;
      } else {
        return false;
      }
    }
    
    show(){
      //How the pixels appear - white cirlce
      noStroke();
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.w);
    }
  }

  
