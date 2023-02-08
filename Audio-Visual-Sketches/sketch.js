//Variables
let song1, song2;
let currentSong;
let amp;
let amp2;
let fft;
//Arays - can store information within
let particles = []; 
let volhistory = [];

//The function preload happens before setup - so before anything is called
function preload() {
  //Variables are given values of songs
  song1 = loadSound("../Music/Omen.mp3");
  song2 = loadSound("../Music/Cartoon - On and On.mp3");
}


function setup() {
  createCanvas(800, 800); //Canvas size of 800px by 800px - making a square
  currentSong = song1; //Assigning a song to the variable 
  //Setting the volume to the songs - amplitude cannot go higher than these values
  song1.setVolume(0.25);
  song2.setVolume(0.25);


  amp = new p5.Amplitude(); //Records the amplitude (0-1)

  fft = new p5.FFT(); //Analyses the frequence of sound
}

//Draw function
function draw() {
  //Text
  push(); //Store information
  background(0); //Background colour of black
  textAlign(CENTER); //Text will be written centrally 
  fill(255); //White 
  text('PRESS KEYS - 1 OR 2', width / 2, height / 2); //Text will appear in the middle of the screen
  pop(); //Restore to 'default' settings


  //Switch key
  switch (key) {
    case "1": //When the key "1" is pressed it will call on drawshape_speaker() in speaker.js
      drawshape_speaker();
      break; //Terminates the current switch

    case "2": //When the key "2" is pressed it will call on drawshape_vinyl() in vinyl.js
      drawshape_vinyl();
      break; //Terminates the current switch
  }


}

function keyPressed() {
  userStartAudio(); //Audio will play on the users command
  switch (key) {
    case "1":
      //When the key "1" is pressed the current song will stop playing it will then call the specified song and start playing
      currentSong.stop();
      currentSong = song1;
      currentSong.play();

      break; //Terminates the current switch

    case "2":
      //When the key "2" is pressed the current song will stop playing it will then call the specified song and start playing
      currentSong.stop();
      currentSong = song2;
      currentSong.play();

      break; //Terminates the current switch
    default: //When a key besides "1" or "2" is pressed it will revert back to the original screen with no music playing
      currentSong.stop();
      break; //Terminates the current switch
  }

}

