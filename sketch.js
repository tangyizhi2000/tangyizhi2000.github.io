let bananas = [];
let shadow;
// all parameters
//   banana setting
let total_bananas = 6;
let banana_size = 200;
//   canvas setting
let canvas_size = 800;
//   orbit setting
let orbit_hori = 600;
let orbit_verti = 300;
let speed = 0;
let rotate_deg = 40;
let starting_loc_x = 0;
let starting_loc_y = 0;
let speed_sum = 0;
//   shadow setting
let flip = 0;
let shadow_width = 100;

function setup() {
  createCanvas(canvas_size, canvas_size);
  
  for (let i = 1; i <= total_bananas; i++) {
    let temp_filename = 'https://raw.githubusercontent.com/tangyizhi2000/BananaTimer/main/' + str(i) + '.png'
    bananas.push(loadImage(temp_filename));
  }
  shadow = loadImage('https://raw.githubusercontent.com/tangyizhi2000/BananaTimer/main/finalshadow3.png');
  number = loadImage('https://raw.githubusercontent.com/tangyizhi2000/BananaTimer/main/number.png');

}

function draw() {
  // background
  background(color(255,255,240));
  translate(width / 2, height / 2);
  image(number, 0, 0, 800, 800);
  
  // rotation & shadow
  let s = map(second() + minute() * 60 + hour() * 60 * 60, 0, 60 * 60 * 24, PI, 3 * PI);
  //let s = map(millis() + second() * 1000, 0, 60 * 1000, 0, TWO_PI);
  x = starting_loc_x + orbit_hori * cos(s);
  y = starting_loc_y + orbit_verti * sin(s);
  new_xloc = x * cos(rotate_deg) - y * sin(rotate_deg);
  new_yloc = y * cos(rotate_deg) + x * sin(rotate_deg);
  push();
  distance_to_orbit = sqrt(new_xloc * new_xloc + new_yloc * new_yloc);
  if(new_xloc >= 0 && new_yloc >= 0){
    //print(x, y, 180 - degrees(atan(y / x)));
    rotate(-radians(180 - degrees(atan(new_yloc / new_xloc))));
  } else if(new_xloc >= 0 && new_yloc < 0){
    //print(x, y, 180 + degrees(atan(abs(y) / abs(x))));
    rotate(-radians(180 + degrees(atan(abs(new_yloc) / abs(new_xloc)))));
  } else if(new_xloc < 0 && new_yloc < 0){
    //print(x, y, 360 - degrees(atan(abs(y) / abs(x))));
    rotate(-radians(360 - degrees(atan(abs(new_yloc) / abs(new_xloc)))));
  } else {
    //print(x, y, degrees(atan(abs(y) / abs(x))));
    rotate(-radians(degrees(atan(abs(new_yloc) / abs(new_xloc)))));
  }
  imageMode(CENTER);
  image(shadow, 0, 0, distance_to_orbit, shadow_width);
  pop();
  
  //banana
  imageMode(CENTER);
  image(bananas[second() % total_bananas], 0, 0, banana_size, banana_size);
}