let angle = 0; //Setting a variable


//Creating a function to store everything in to be called in the sketch.js
function drawshape_vinyl(){ 
  //Background
  background("#8A2BE2"); //Blue Violet background colour
  push(); //Store information
  //Setting the size in px, colour and position of the text
  strokeWeight(0); //No outline around text
  fill(255); //White
  textSize(30);
  textAlign(CENTER); //Text will be written centrally 
  text("Cartoon - On & On", width/2, 100); //("", x-axis,y-axis)
  pop(); //Restore to 'default' settings

  //Settings
  angleMode(DEGREES); //Changing from radians to degrees
  push(); //Store information

  let vol = amp.getLevel(); //Returns an amplitude reading when called - amplitude is a number between 0 and 1, however I have maxed the sound to 0.3 so that is the highest the amplitude reading can go
  let diam = map(vol, 0.02, 0.25, 125, 1500);
  volhistory.push(vol); //Calling on the array in sketch.js and inserting the values from the vol variable
  //White outline with a thickness of 3px
  strokeWeight(3);
  stroke(255);
  
  translate(width/2,height/2); //Starting position for each object - x and y axis is the middle of the canvas

  for (let i = 0; i < 10; i++) { // i cannot be greater than 10

    //These variables control the colours 
    //frameCount is the number of frames since the display started
    let r = map(sin(frameCount/2), -1, 1, 50, 220); //Speec at which it changes colour
    let g = map(i, 0, 0, 50, 100);
    let b = map(cos(frameCount), -1, 1, 20, 180);

    fill(r,g,b); //Colouring the interior with the variables r, g, b

    beginShape(); //Records vertices for a shape 

    for (let i = 0; i < 360; i++){ //Makes it so i cannot go greater than 360 - a circle
      let r = map(volhistory[i], 0, 1, 125, diam); //Calling on the array - given a starting diameter of 125px and can expand out to 1200px
      //Creating a circle
      let x = r * cos(i);
      let y = r * sin(i)


      vertex(x, y); //Specifiy the coordinates for the x and y axis. Used only for beginShape and endShape functions
    }
    endShape(); //Stops recording vertices
  }

  if (volhistory.length > 360){ //Makes it go round a full 360 - circle
    volhistory.splice(0,1); //specifies the array to be modified and the data to be inserted 
  }
  pop(); //Restore to 'default' settings

  
  //Vinyl Track
  //Rotation

  translate(width/2,height/2); //Starting position for each object - x and y axis is the middle of the canvas
  rotate(angle); //Shape will rotate around the origin point of the value specified - in this case it is the variable angle

  //Main circle

  //Fill colours in the interior of each ellipse unless stated otherwise with noFill()
  //Fill, when only 0-255, colours black to white
  fill(20);
  //strokeWeight is the thickness of that outline
  strokeWeight(1);
  //The x and y position of every ellipse has been given with the tranlate function
  ellipse(0,0,250);

  //Rings

  strokeWeight(2);
  //stroke is the colour of the outline around each object
  stroke("#808080"); //Grey
  ellipse(0,0,225);
  ellipse(0,0,175);

  //Outline around middle

  strokeWeight(0);
  fill(0);
  ellipse(0,0,125);
  //Middle of Vinyl
  fill(255,165,0);
  ellipse(0,0,100);

  //Design on track

  fill(255,255,0);
  ellipse(0,0,60);
  fill(0);
  //x and y coordinates contain negatives here as the origin point is now the centre of the screen
  ellipse(10,-10,10);
  ellipse(-10,-10,10);
  fill(255);
  ellipse(10,-10,7);
  ellipse(-10,-10,7);
  fill(0);
  ellipse(10,-10,3);
  ellipse(-10,-10,3);
  fill(255);
  strokeWeight(2);
  stroke(0);
  ellipse(0,10,15);
  //Rotates anticlockwise (with a positive number it would be clockwise)
  angle = angle + 1.25; //1.25 is the speed in which it is rotating
}

