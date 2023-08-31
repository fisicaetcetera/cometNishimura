//sketchPlanetsCamErro.js
let miliseconds = 24*3600000;  //miliseconds in a day
let timestamp ;  // miliseconds since 
let stampj2013; ///milisecondas since reference in 2013
let ii; // number of days before of after today
let ifim ; //when simulation ends

let ne = 0.985611; //same as n, for earth
let Le = 324.5489; //same as L, for earth
let pe = 103.147; //same as p, for earth
let ee = 0.016679; // same as e, for earth
let ae = 1.000; //same as a, for earth
let oe = 0.0; //same as o, for earth
let ie = 0.0; // same as i, for earth
let earthLong;

let RAsolhr;
let DecSoldeg;
let RA_hours, Dec_degrees; //all
let RA_Jup, RA_Mar, RA_Mer, RA_Sat;
let lat;
let lon;
let dlon;
let Nm;
let twopi;
let degs;
let rads;
let d0;
let d; //days since the date of the elements for Earth and Mars;
let dRoadster; //days since Tesla elements
let drb1;
let dastrb1;
//obliquity of the ecliptic, degrees
let ec = 23.439292;
let ec_rads;

let m; //  Mean anomaly
let me; //
let v; // true anomaly
let ve;
let r; // length of radius vector of the planet
let re;
// ecliptic coordinates of a body - cartesian
let Xms, Yms, Zms;
let Xj, Yj, Zj;
let Xsat, Ysat, Zsat;
let Xv, Yv, Zv;
let Xrdstr, Yrdstr, Zrdstr;
let Xrb1, Yrb1, Zrb1;          //2016RB1
let camera;
//let zcam;

// ecliptic c//
//
// coordinates for Earth - cartesian
let Xe, Ye, Ze;
// distance of a body to Earth:
let distance;
var now;
let daysRover;    //days from launch
let diasLanding;  //days to landing
let diaEHora, diaEHora1;
let print = true;
let posx;
let posy;
let posxe;
let posye;
let posxms, posyms;
let posxrb1, posyrb1, poszrb1;
let p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y;
let ox = 0, oy = 0;
let venusjpg, saturnjpg;
let marsjpg, jupiterjpg, sunjpg, earthjpg;
let myfont;
//rotations
let anguloz = 0;
let angulox = 0;
let anguloy = 0;
let delta = 0.005;
//

function preload() {
  myfont = loadFont('Catallina.otf');
  sunjpg = loadImage('sun.jpg');
  earthjpg = loadImage('earthcloud.jpg');
  marsjpg = loadImage('mars.jpg');
  jupiterjpg = loadImage('jupiter.jpg');
  venusjpg = loadImage('venus.jpg');
  saturnjpg = loadImage('saturnmap.jpg');
  mercury = loadImage('mercury.jpg');
}

//
//
function setup() {

  //textSize(20);
  console.log('1. inside setup');
  twopi = TWO_PI;
  degs = 180 / PI;
  rads = 1 / degs;
  ec_rads = ec * rads;
  //
  createCanvas(750, 620, WEBGL);
    camera = createCamera();
    setCamera(camera);
  background(0)

console.log('2. antes de numerodedias()');
  d0 = numeroDeDias();
  d = d0;

  ano = now.getFullYear();
  mes = now.getMonth() + 1;
  dia = now.getDate();
  hora = now.getHours();
  minutos = now.getMinutes();
  segundos = now.getSeconds();
  console.log('agora ',now);
  console.log('now = ', now.getHours(), now.getMinutes(), now.getSeconds());
  //
  ii = -int(420*365) //year of 1603
  ifim = ii + 5*365;
  //


  anguloz = random(0, PI);
  angulox = random(0, PI);
  anguloy = random(0, PI);

  } //setup
  
  function draw(){
  frameRate(10);
  background(0);

  translate(0,0,0);
  
        //sunlight
        pointLight(255,255,105,0,0,0);

 

   if (ii++ < ifim) { //till 30 days after

    print = false;
    d = d0 + ii;
    //calcula data
     diaEHoraf();//gera diaEHora e diaEHora1

    daysPercyNow = d-daysRover;
    //dastrb1 = d0rb1 + ii;
    //////console.log('ii , day = ', ii, d);
      raioTerra = 15;
      raioMercury = 5;
      raioMarte = 12;
      raioJupiter = 40;
      raioSaturn = 40;
      raioVenus = 12;
      raiordstr = 3;
    let tint = 0.;
    let tout = 0.;
    noStroke();
    //
    jupiter(); //calculates for Jupiter
    RA_Jup = RA_hours*15;
    console.log('ascensão reta jup = ', RA_Jup);
    push();
      //rotateZ(RA_Jup);
      translate(500,0,0);

      stroke('white');
      strokeWeight(1);
      sphere(1);
    pop();
      fill(111);
      strokeWeight(1);
      textFont(myfont, 25);
      text('w Piscium',350,0,0);
      //
      fill(111);
      strokeWeight(1);
      textFont(myfont, 30);
      text('4 Sagitarii',0,630,0);
      //
      fill(111);
      strokeWeight(1);
      textFont(myfont, 25);
      text('B Virginis',-width/2,0,0);
      //
      fill(111);
      strokeWeight(1);
      textFont(myfont, 25);
      text('1 Geminorum',0,-height/2,0);
      //
    Mars(); //calculates quantities for earth and mars
    //////console.log('Mars ', Xms, Yms, Zms);
    Venus(); // Xv, Yv, Zv
    Saturn(); //Xsat, etc.
    RA_Sat = RA_hours*15;
    console.log('RA sat jup  : ', RA_Sat, RA_Jup);
    Mercury(); //Xmer, etc.
    rb12016(); //asteroid, Xrb1,etc.
    //////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
    //
    totalAnglePercy = 3 * PI / 4 - 0.075; //radians
    angularVelocityPercy = totalAnglePercy / timeTotalPercy;
    console.log('total time percy', timeTotalPercy);
    console.log('angularvelocity = ', angularVelocityPercy);
    //origem or position of the sun
    let position; //now, launch, landing
    ox = 0;
    oy = 0;
    posxms = ox + 150 * Xms; //x coordinate of mars
    posyms = oy - 150 * Yms; //y coordinate of mars
    posxmer = ox + 150 * Xmer; //x coordinate of mercury
    posymer = oy - 150 * Ymer; //y coordinate of mars    
    posxe = ox + 150 * Xe; // same, for earth
    posye = oy - 150 * Ye;
    posxj = ox + 150 * Xj; //x coordinate of jupiter
    posyj = oy - 150 * Yj; //y coordinate of jupiter
    posxv = ox + 150 * Xv; //x coordinate of Venus
    posyv = oy - 150 * Yv; //y coordinate of Venus
    posxsat = ox + 150 * Xsat; //x coordinate of Saturn
    posysat = oy - 150 * Ysat; //y coordinate of Saturn
    posxrdstr = ox + 150 * Xrdstr;
    posyrdstr = oy - 150 * Yrdstr;
    posxrb1 = ox + 150 * Xrb1;
    posyrb1 = oy - 150 * Yrb1; 
    terrarb1x = Xe-Xrb1;
    terrarb1y = Ye-Yrb1;
    terrarb1 = sqrt(terrarb1x*terrarb1x + terrarb1y * terrarb1y);
  // Escreve a data
  fill(111);
  textFont(myfont, 35);
  text(diaEHora1 + '\n' + diaEHora,posxj-150, posyj-90,0);
    //
    //camera pointing to Saturn
        zcam = 500 - 300*exp(-frameCount/40);
    //camera.setPosition(posxe, posye,0);
    camera.setPosition(0,0,1500);

    camera.lookAt(posxsat/3,posysat/3,0);
    //camera.lookAt(posxj,posyj,0);
    
    if(terrarb1 < 0.01){
      console.log('days ago = ', ii);
      console.log( 'distancia Terra-RB1:  ', terrarb1);
    }
    //poszrb1 = oz + 150 * Zrb1;   
    //
    //console.log('Data: ', now.getDate() + ii, (now.getMonth() + 1), now.getFullYear());
    //

    //sol
    push();
    fill('#dddd00');
    translate(ox, oy, 0);
    rotateX(PI / 2);
    texture(sunjpg);
    emissiveMaterial(255,255,190);
    sphere(15);
    //text('SOL', ox, oy);
    pop();
    //===== lines to s and j always
         //Draws //line to Saturn
      //
      stroke('grey');
      noFill();
      strokeWeight(1);
      line(0, 0, 0, 300,0,0); // x-axis
      //
      stroke('yellow');
      noFill();
      strokeWeight(1);
      line(0, 0,0, 0, 600, 0); // y-axis
      //
      stroke('red');
      noFill();
      strokeWeight(2);
      line(0,0,0,0,0,300);//z-axis
      //
      stroke('yellow');
      noFill();
      strokeWeight(1);
      line(posxe, posye, posxsat, posysat);
      stroke('green');
      line(posxe, posye, posxj, posyj);
      stroke('red');
      noFill();
      strokeWeight(1);
      stroke('yelow');
      //line(posxms, posyms, posxsat, posysat);
      stroke('green');
      noFill();
      strokeWeight(1);
      //line(posxv, posyv, posxsat, posysat);
      noStroke();

    //
    if (ii == 0 ) { // agora ************** AGORA ou then
      ////console.log('days roadster = ', dRoadster);
      //persevernce position:
      noLoop();
      //daysPercyNow = d-daysRover;
      raioTerra = 15;
      raioMercury = 5;
      raioMarte = 12;
      raioJupiter = 20;
      raioSaturn = 20;
      raioVenus = 12;
      raiordstr = 3;
      px2 = posxms;
      py2 = posyms;
      tout =25;
      tint = 3;
      ////console.log('NOW ===============');
      //
      //Draws //line to Saturn
      //
      stroke('yellow');
      noFill();
      strokeWeight(1);
      line(posxe, posye, posxsat, posysat);
      stroke('green');
      line(posxe, posye, posxj, posyj);
      stroke('red');
      noFill();
      strokeWeight(1);
      stroke('yelow');
      //line(posxms, posyms, posxsat, posysat);
      stroke('green');
      noFill();
      strokeWeight(1);
      //line(posxv, posyv, posxsat, posysat);

      noStroke();

    }
    //
    if (int(d) == int(d0 - daysRover)) { ///date of launching
      //raioTerra = 10;
      //raioMarte = 10;
      // raioJupiter = 10;
      // raioSaturn = 10;
      // raioVenus = 7;
      //px2 = posxms;
      //py2 = posyms;
      px1 = posxe;
      py1 = posye;

      print = true;
    }
    if (int(d) == int(d0 + diasLanding)) { // date of landing
      //raioTerra = 20;
      // raioMarte = 16;
      // raioJupiter = 20;
      // raioSaturn = 20;
      // raioVenus = 15;
      noLoop();
      px3 = posxms;
      py3 = posyms;
      fill(255);
      text('18/02/2021', posxms + 95, posyms - 3);
      let px4 = posxms;
      let py4 = posyms;
      print = true;

    }

    //Draws Mars, Earth, Percy
    push();
    translate(posxms, posyms, 0);
    rotateX(PI / 2);
    texture(marsjpg);
    rm = raioMarte;
    sphere(rm);
        rotateZ(frameCount/50);

    if (print) {
      //text('Marte', posxms + 15, posyms - 3);
      ////console.log('Mars: ', Xms, Yms, Zms);
    }
    pop();
    //
    //draws Jupiter
    push();
    texture(jupiterjpg);
    translate(posxj, posyj, 0);
    rotateX(PI / 2);
    rotateY(-frameCount/50);
    sphere(raioJupiter);
    pop();
    //
    //draws Saturn
    push();
    texture(saturnjpg);
    translate(posxsat, posysat, 0);
    rotateX(PI / 2);
    rotateY(-frameCount/100);
    sphere(raioSaturn);
        rotateX(1.0);
    fill('white'),
    torus(65,3);
    fill('gray');
    torus(78,3);
    fill(111,121,131);
    torus(87,5);
    fill(121,111,131);
    torus(111,7);

    pop();
    //
    //mercury
        //draws Mercury
    push();
    texture(mercury);
    translate(posxmer, posymer, 0);
    rotateX(PI / 2);
    rotateY(frameCount/125);
    sphere(raioMercury);
    //specularMaterial(red);
    pop();
    //
    //draws Venus
    push();
    texture(venusjpg);
    translate(posxv, posyv, 0);
    rotateX(PI / 2);
    rotateY(frameCount/200);
    sphere(raioVenus);
    pop();
    //
    //Draws 2016rb1
    push();
    //texture(venusjpg);
    fill('yellow');
    //translate(posxrb1, posyrb1, 0);
    ////console.log('pos rb1 ' ,posxrb1,posyrb1);
    //rotateX(PI / 2);
    //box(2);
    pop();
    // Draws earth
    //

    fill('#00ccFF');
    push()
    translate(posxe, posye, 0);
    rotateX(PI / 2);
    rotate(frameCount/100);
    texture(earthjpg);
    rotateY(frameCount/24);
    sphere(raioTerra);
    if (print) {
      //text('Terra', posxe + 10, posye + 20);
      ////////console.log('Terra: ', Xe, Ye, Ze);
      //////console.log('Day = ', d)
    }
    pop();
    //
    // Draws Tesla
    //
    push();
    translate(posxrdstr, posyrdstr, 0);
    rotateX(ii*0.01);
    fill(111);
    //texture(teslajpg);
    //box(3*raiordstr, 1.5*raiordstr, raiordstr);
    if (print) {
      //text('Tesla', posxrdstr + 15, posyrdstr - 3);
      //////console.log('Tesla: ', Xms, Yms, Zms);
    }
    pop();

    console.log('d, d0 : ', d,d0);
  
  //
  //draws trajectory of rover-mars2020
  //
  stroke('white');
  noFill();
  strokeWeight(3);
  push()
  //arc(-35, -32, 400, 400, -PI / 2 + 0.15, PI / 4 + 0.075);
  pop();
  //
  // draws actual position of Percy at  given day d
  //
  push();
  

  //console.log('anguloinicial, angulofinal ', angleInicial, angleFinal);
  stroke('yellow');
  noStroke(); 
  //aqui
  angleFinal = -1.058*angularVelocityPercy * (daysPercyNow) + angleInicial;
  console.log('angulo inicial = ', angleInicial);

  pop();

  console.log('daysePercyNow = ', daysPercyNow);
  console.log('mars coordinates: ', posxms, posyms);
    //arc(-35, -32, 400, 400, angleInicial, angleFinal);
  
  } //if ii  
  else{
  ii = -204;
  //frameRate(5);
  background(0);
  //frameRate(30);

  }
      
} //draw()
//
//************** FUNCTIONS ****************

function mousePressed(){
  noLoop();
}
function mouseReleased(){
  loop();
}

// ***** JUPITER
//
//
function jupiter() {
  //
  // Jupiter elements
  //
  nj = 0.083099
  oj = 100.629;
  ij = 1.3033;
  pj = 14.556;
  aj = 5.20245;
  ej = 0.048892;
  Lj = 87.9728;
  ec = 23.4393 - 3.563E-7 * d;

  me_degrees = ne * d + Le - pe; //earth
  mj_degrees = nj * d + Lj - pj; //earth


  //////console.log('m = ', m);
  //////console.log('me = ', me);
  mj = mj_degrees * rads
  mj = FNrange(mj);
  //////console.log('m, em radianos = ', m)
  //
  me = me_degrees * rads;
  me = FNrange(me);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  vj = mj + (2 * ej - 0.25 * pow(ej, 3) + 5 / 96 * pow(ej, 5)) * sin(mj) +
    (1.25 * pow(ej, 2) - 11 / 24 * pow(ej, 4)) * sin(2 * mj) +
    (13 / 12 * pow(ej, 3) - 43 / 64 * pow(ej, 5)) * sin(3 * mj) +
    103 / 96 * pow(ej, 4) * sin(4 * mj) + 1097 / 960 * pow(ej, 5) * sin(5 * mj);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  vj = FNrange(vj),
    //  ////console.log('vj radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    rj = aj * (1 - ej * ej) / (1 + ej * cos(vj));
  //////console.log('radius (au) = ', rj);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  oj = oj * rads;
  pj = pj * rads;
  ij = ij * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;

  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xj = rj * [cos(oj) * cos(vj + pj - oj) - sin(oj) * sin(vj + pj - oj) *
    cos(ij)
  ]
  Yj = rj * [sin(oj) * cos(vj + pj - oj) + cos(oj) * sin(vj + pj - oj) *
    cos(ij)
  ]
  Zj = rj * [sin(vj + pj - oj) * sin(ij)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node
  //////console.log('X, Y, Z = ', X, Y, Z);
  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  let remainder = rj * rj - Xj * Xj - Yj * Yj - Zj * Zj;
  //////console.log('rj - rj = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for planet
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  //////console.log('Xe, Ye, Ze = ', Xe, Ye, Ze);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xj - Xe;
  Yrel = Yj - Ye;
  Zrel = Zj - Ze;
  //
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);
  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  //////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  ////console.log('Jupiter: ', RA_hours, Dec_degrees, distance);
  //  
} //end function jupiter()
//
//


//
function Mars() {
  //
  //   Mars elements
  //

  let n = 0.523998; //daily motion
  let ne = 0.985611; //same as n, for earth
  let L = 82.9625; //mean longitude
  let Le = 324.5489; //same as L, for earth
  let p = 336.322; //longitude of the prihelion, degrees
  let pe = 103.147; //same as p, for earth
  let e = 0.093346; //eccentricity of orbit
  let ee = 0.016679; // same as e, for earth
  let a = 1.523762; //semi-major axis
  let ae = 1.000; //same as a, for earth
  let o = 49.668; //longitude of ascending node, degrees
  let oe = 0.0; //same as o, for earth
  let i = 1.8496; // inclination of plane of orbit, degrees
  let ie = 0.0; // same as i, for earth
  //Mean anomaly
  //////console.log('Dentro de Mars - ec = ', ec);
  m = n * d + L - p; //planet
  me = ne * d + Le - pe; //earth
  ec = 23.4393 - 3.563E-7 * d; //earth's
  //////console.log('m = ', m);
  //////console.log('me = ', me);

  m = FNrange(m * rads);
  //////console.log('m, em radianos = ', m)
  //////console.log('inside Mars, ec = ', ec, ec * degs);
  //
  me = FNrange(me * rads);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  v = m + (2 * e - 0.25 * pow(e, 3) + 5 / 96 * pow(e, 5)) * sin(m) +
    (1.25 * pow(e, 2) - 11 / 24 * pow(e, 4)) * sin(2 * m) +
    (13 / 12 * pow(e, 3) - 43 / 64 * pow(e, 5)) * sin(3 * m) +
    103 / 96 * pow(e, 4) * sin(4 * m) + 1097 / 960 * pow(e, 5) * sin(5 * m);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  v = FNrange(v),
    //  ////console.log('v radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    r = a * (1 - e * e) / (1 + e * cos(v));
  //////console.log('radius (au) = ', r);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  o = o * rads;
  p = p * rads;
  i = i * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;
  //////console.log('ec, rads = ', ec, rads);
  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xms = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  Yms = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  Zms = r * [sin(v + p - o) * sin(i)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node

  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  //let remainder = r * r - X * X - Y * Y - Z * Z;
  //////console.log('r - r = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for earth
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  earthLong = atan2(Ye/Xe);
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  // ////console.log('X, Y, Z = ', X, Y, Z);
  //////console.log('Xe, Ye, Ze = ', Xe, Ye, Ze);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xms - Xe;
  Yrel = Yms - Ye;
  Zrel = Zms - Ze;

  RAsolhr = atan2(-Ye, -Xe) * degs / 15;
  DecSoldeg = atan2(Ze, sqrt(Ye * Ye + Xe * Xe)) * degs;
  ////////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);

  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  Xsun = Xe;
  Ysun = Ye * cos(ec);
  Zsun = Ye * sin(ec);
  //////console.log ('ec = ', ec );
  //////console.log('Xsun, Ysun, Zsun =  ',Xsun, Ysun, Zsun );
  RAsolhr = atan2(Ysun, Xsun) * degs / 15;
  DecSoldeg = atan2(Zsun, sqrt(Ysun * Ysun + Xsun * Xsun)) * degs;
  //////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  ////////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance(Mars) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  ////console.log('Mars: ', RA_hours, Dec_degrees, distance);
  //  
} //end function Mars()
//0000
// 
function numeroDeDias() {

  //calcula numero de dias entre duas datas escolhidas
  // Por enquanto entre 201308160000 e o presente (ou data da previsão)
  //por exemplo, já usei 1603 e funcionou.  Kepler.
  now = new Date();
  timestamp = now.getTime(); //agora
  //time for 2013 elements
  //
  let stamprb1 = (new Date('2020-12-01T00:00:00Z')).getTime();
  let stampRoadster = (new Date('2020-12-17T00:00:00Z')).getTime();
  stampj2013 = (new Date('2013-08-16T12:00:00Z')).getTime();
  let stampj2000 = (new Date('1999-12-31T00:00:00Z')).getTime();
  //
  //////console.log('stampj2013 = ', stampj2013);
  // epoca, em milisegundos
  let epocarb1 = (timestamp - stamprb1) / 1000;
  let epocaRoadster = (timestamp - stampRoadster) / 1000;
  let epoca = (timestamp - stampj2013) / 1000;
  //////console.log('epoca = ' + epoca);
  let numdias = epoca / 86400;
  dRoadster = epocaRoadster / 86400;
  drb1 = epocarb1/86400;
  //
  //Rover perseverance, days from launch 
  //
  let timeRover = new Date('2020-07-30T12:00:00Z').getTime();
  daysRover = int((timeRover-stampj2013) / 86400000);

  //////console.log('days to Rover = ', daysRover);
  //
  let timeLanding = new Date('2021-02-18T12:00:00Z').getTime();
  diasLanding = int((timeLanding - stampj2013) / 86400000);
  timeTotalPercy = diasLanding - daysRover;
  console.log('diasLanding = ', diasLanding);
  console.log('timeTotal = ', timeTotalPercy);

  return numdias;
} //end function numeroDeDias
//
//   the function below returns an angle in the range
//   0 to two pi
//
function FNrange(x) {
  //////console.log('x = ' + x);
  b = x / twopi;
  //////console.log('int(b) =', int(b));
  aa = x - twopi * int(b); // 
  //////console.log('x, aa, b, dentro de range = ', x, aa, b);
  if (aa < 0) {
    //////console.log('aa less than zero');
    //////console.log('twopi + aa = ' + (twopi + aa));
    return (twopi + aa);
  } else {
    return aa;
  }
} //end FNrange

//
// ***** Venus
//
//
function Venus() {
  //
  // Venus elements
  //

  ij = 3.3949;
  oj = 76.804;
  pj = 131.99;
  aj = 0.723327;
  nj = 1.60215;
  ej = 0.006769;
  Lj = 233.5729;

  //ec = 23.4393 - 3.563E-7 * d;
  //////console.log('Venus...');

  me_degrees = ne * d + Le - pe; //earth
  mj_degrees = nj * d + Lj - pj; //earth


  //////console.log('m = ', m);
  //////console.log('me = ', me);
  mj = mj_degrees * rads
  mj = FNrange(mj);
  //////console.log('m, em radianos = ', m)
  //
  me = me_degrees * rads;
  me = FNrange(me);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  vj = mj + (2 * ej - 0.25 * pow(ej, 3) + 5 / 96 * pow(ej, 5)) * sin(mj) +
    (1.25 * pow(ej, 2) - 11 / 24 * pow(ej, 4)) * sin(2 * mj) +
    (13 / 12 * pow(ej, 3) - 43 / 64 * pow(ej, 5)) * sin(3 * mj) +
    103 / 96 * pow(ej, 4) * sin(4 * mj) + 1097 / 960 * pow(ej, 5) * sin(5 * mj);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  vj = FNrange(vj),
    //  ////console.log('vj radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    rj = aj * (1 - ej * ej) / (1 + ej * cos(vj));
  //////console.log('radius (au) = ', rj);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  oj = oj * rads;
  pj = pj * rads;
  ij = ij * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;

  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xv = rj * [cos(oj) * cos(vj + pj - oj) - sin(oj) * sin(vj + pj - oj) *
    cos(ij)
  ]
  Yv = rj * [sin(oj) * cos(vj + pj - oj) + cos(oj) * sin(vj + pj - oj) *
    cos(ij)
  ]
  Zv = rj * [sin(vj + pj - oj) * sin(ij)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node
  //////console.log('X, Y, Z = ', X, Y, Z);
  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  let remainder = rj * rj - Xj * Xj - Yj * Yj - Zj * Zj;
  //////console.log('rj - rj = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for planet
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  //////console.log('Xe, Ye, Ze = ', Xe, Ye, Ze);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xv - Xe;
  Yrel = Yv - Ye;
  Zrel = Zv - Ze;
  //
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);
  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  //////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  ////console.log('Venus: ', RA_hours, Dec_degrees, distance);
  //  
} //end function venus()
//
//
//
function Saturn() {
  //
  // Saturn's elements
  //
  //Mean anomaly
  //////console.log('Dentro de Saturn - ec = ', ec);
  //
  i = 2.4869
  o = 113.732
  p = 91.500
  a = 9.52450
  n = 0.033551
  e = 0.055724
  L = 216.6279,



    m = n * d + L - p; //planet
  me = ne * d + Le - pe; //earth
  ec = 23.4393 - 3.563E-7 * d; //earth's
  //////console.log('m = ', m);
  //////console.log('me = ', me);

  m = FNrange(m * rads);
  //////console.log('m, em radianos = ', m)
  //////console.log('inside Mars, ec = ', ec, ec * degs);
  //
  me = FNrange(me * rads);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  v = m + (2 * e - 0.25 * pow(e, 3) + 5 / 96 * pow(e, 5)) * sin(m) +
    (1.25 * pow(e, 2) - 11 / 24 * pow(e, 4)) * sin(2 * m) +
    (13 / 12 * pow(e, 3) - 43 / 64 * pow(e, 5)) * sin(3 * m) +
    103 / 96 * pow(e, 4) * sin(4 * m) + 1097 / 960 * pow(e, 5) * sin(5 * m);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  v = FNrange(v),
    //  ////console.log('v radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    r = a * (1 - e * e) / (1 + e * cos(v));
  //////console.log('radius (au) = ', r);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  o = o * rads;
  p = p * rads;
  i = i * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;
  //////console.log('ec, rads = ', ec, rads);
  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xsat = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  Ysat = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  Zsat = r * [sin(v + p - o) * sin(i)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node

  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  //let remainder = r * r - X * X - Y * Y - Z * Z;
  //////console.log('r - r = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for earth
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  // ////console.log('X, Y, Z = ', X, Y, Z);
  //////console.log('Xe, Ye, Ze = ', Xe, Ye, Ze);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xsat - Xe;
  Yrel = Ysat - Ye;
  Zrel = Zsat - Ze;

  RAsolhr = atan2(-Ye, -Xe) * degs / 15;
  DecSoldeg = atan2(Ze, sqrt(Ye * Ye + Xe * Xe)) * degs;
  ////////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);

  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  Xsun = Xe;
  Ysun = Ye * cos(ec);
  Zsun = Ye * sin(ec);
  //////console.log ('ec = ', ec );
  //////console.log('Xsun, Ysun, Zsun =  ',Xsun, Ysun, Zsun );
  //RAsolhr = -atan2(Ysun, Xsun) * degs / 15;
  //DecSoldeg = -atan2(Zsun, sqrt(Ysun * Ysun + Xsun * Xsun)) * degs;
  //////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  ////////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance(Saturn) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  ////console.log('Saturn: ', RA_hours, Dec_degrees, distance);
  //  
} //end function Saturn()
//
//
//
function Starman() {
  //
  //   Tesla elements
  //   epoch dec 01 2020 T000000
  //degrees
  let n = 6.463181473844126E-01; //daily motion, deg per day
  let ne = 0.985611; //same as n, for earth
  // let L = 82.9625; //mean longitude
  let m0 = 3.062682364351462E+02; //initial mean anomaly
  let m; //mean anomaly
  let Le = 324.5489; //same as L, for earth
  let p = 1.776837666649462E+02; //longitude of the prihelion, degrees
  let pe = 103.147; //same as p, for earth
  let e = 2.559732571658898E-01; //eccentricity of orbit
  let ee = 0.016679; // same as e, for earth
  let a = 1.324865575387258; //semi-major axis
  let ae = 1.000; //same as a, for earth
  let o = 3.169328864603657E+02; //longitude of ascending node, degrees
  let oe = 0.0; //same as o, for earth
  let i = 1.075876564874294; // inclination of plane of orbit, degrees
  let ie = 0.0; // same as i, for earth
  //Mean anomaly
  //////console.log('Dentro de Mars - ec = ', ec);
  m = m0 + n * dRoadster; //roadster
  L = m + p;
  me = ne * d + Le - pe; //earth
  ec = 23.4393 - 3.563E-7 * d; //earth's
  //////console.log('m = ', m);
  //////console.log('me = ', me);

  m = FNrange(m * rads);
  //////console.log('m, em radianos = ', m)
  //////console.log('inside Mars, ec = ', ec, ec * degs);
  //
  me = FNrange(me * rads);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  v = m + (2 * e - 0.25 * pow(e, 3) + 5 / 96 * pow(e, 5)) * sin(m) +
    (1.25 * pow(e, 2) - 11 / 24 * pow(e, 4)) * sin(2 * m) +
    (13 / 12 * pow(e, 3) - 43 / 64 * pow(e, 5)) * sin(3 * m) +
    103 / 96 * pow(e, 4) * sin(4 * m) + 1097 / 960 * pow(e, 5) * sin(5 * m);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  v = FNrange(v),
    //  ////console.log('v radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    r = a * (1 - e * e) / (1 + e * cos(v));
  //////console.log('radius (au) = ', r);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  o = o * rads;
  p = p * rads;
  i = i * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;
  //////console.log('ec, rads = ', ec, rads);
  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xrdstr = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  Yrdstr = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  Zrdstr = r * [sin(v + p - o) * sin(i)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node

  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  //let remainder = r * r - X * X - Y * Y - Z * Z;
  //////console.log('r - r = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for earth
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  // ////console.log('X, Y, Z = ', X, Y, Z);
  //////console.log('Xe, Ye, Ze = ', Xe, Ye, Ze);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xrdstr - Xe;
  Yrel = Yrdstr - Ye;
  Zrel = Zrdstr - Ze;

  RAsolhr = atan2(-Ye, -Xe) * degs / 15;
  DecSoldeg = atan2(Ze, sqrt(Ye * Ye + Xe * Xe)) * degs;
  ////////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);

  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  Xsun = Xe;
  Ysun = Ye * cos(ec);
  Zsun = Ye * sin(ec);
  //////console.log ('ec = ', ec );
  //////console.log('Xsun, Ysun, Zsun =  ',Xsun, Ysun, Zsun );
  //RAsolhr = atan2(Ysun, Xsun) * degs / 15;
  //DecSoldeg = atan2(Zsun, sqrt(Ysun * Ysun + Xsun * Xsun)) * degs;
  //////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  ////////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance(Mars) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  ////console.log('Tesla: ', RA_hours, Dec_degrees, distance);
  //  
} //end function Starman()
//
 function Mercury() {
  //
  // Mercury elements
  //
  imer =7.0052;
  omer = 48.493;
  pmer = 77.669;
  amer = 0.387098;
  nmer = 4.09235;
  emer = 0.205645;
  Lmer = 93.8725;
  ec = 23.4393 - 3.563E-7 * d;

  me_degrees = ne * d + Le - pe; //earth
  mmer_degrees = nmer * d + Lmer - pmer; //earth


  //////console.log('m = ', m);
  //////console.log('me = ', me);
  mmer = mmer_degrees * rads
  mmer = FNrange(mmer);
  //////console.log('m, em radianos = ', m)
  //
  me = me_degrees * rads;
  me = FNrange(me);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  vmer = mmer + (2 * emer - 0.25 * pow(emer, 3) + 5 / 96 * pow(emer, 5)) * sin(mmer) +
    (1.25 * pow(emer, 2) - 11 / 24 * pow(emer, 4)) * sin(2 * mmer) +
    (13 / 12 * pow(emer, 3) - 43 / 64 * pow(emer, 5)) * sin(3 * mmer) +
    103 / 96 * pow(emer, 4) * sin(4 * mmer) + 1097 / 960 * pow(emer, 5) * sin(5 * mmer);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  vmer = FNrange(vmer),
    //  ////console.log('vmer radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    rmer = amer * (1 - emer * emer) / (1 + emer * cos(vmer));
  //////console.log('radius (au) = ', rmer);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  omer = omer * rads;
  pmer = pmer * rads;
  imer = imer * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;

  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xmer = rmer * [cos(omer) * cos(vmer + pmer - omer) - sin(omer) * sin(vmer + pmer - omer) *
    cos(imer)
  ]
  Ymer = rmer * [sin(omer) * cos(vmer + pmer - omer) + cos(omer) * sin(vmer + pmer - omer) *
    cos(imer)
  ]
  Zmer = rmer * [sin(vmer + pmer - omer) * sin(imer)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node
  //////console.log('X, Y, Z = ', X, Y, Z);
  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  let remainder = rmer * rmer - Xmer * Xmer - Ymer * Ymer - Zmer * Zmer;
  //////console.log('rmer - rmer = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for planet
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  //////console.log('Xe, Ye, Ze = ', Xe, Ye, Ze);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xmer - Xe;
  Yrel = Ymer - Ye;
  Zrel = Zmer - Ze;
  //
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);
  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  //////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance = ', RA_radians, Dec_radians, distance);
  //converting RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  //////console.log('Mercury: ', RA_hours, Dec_degrees, distance);
  //  
} //end function Mercury
//
function rb12016() {      // 2016RB1
  //
  //   RB1 elements
  //

  let n = 1.208058424612978 //daily motion
  let ne = 0.985611; //same as n, for earth
  //let L = 82.9625; //mean longitude
  let m = 1.358321662926716E+02;//mean anomaly
  let Le = 324.5489; //same as L, for earth
  let p = 1.358321662926716E+02;  //longitude of the prihelion, degrees
  let pe = 103.147; //same as p, for earth
  let e = 2.806160878105857E-01; //eccentricity of orbit
  let ee = 0.016679; // same as e, for earth
  let a = 8.731270109704076E-01;//semi-major axis
  let ae = 1.000; //same as a, for earth
  let o = 3.453686913597587E+02 //longitude of ascending node, degrees
  let oe = 0.0; //same as o, for earth
  let i = 1.798323894969739E+00;// inclination of plane of orbit, degrees
  let ie = 0.0; // same as i, for earth
  //Mean anomaly
  //////console.log('Dentro de Mars - ec = ', ec);
  m = n * drb1 + m; //asteroid 
  me = ne * d + Le - pe; //earth
  ec = 23.4393 - 3.563E-7 * d; //earth's
  //////console.log('m = ', m);
  //////console.log('me = ', me);

  m = FNrange(m * rads);
  //////console.log('m, em radianos = ', m)
  //////console.log('inside Mars, ec = ', ec, ec * degs);
  //
  me = FNrange(me * rads);
  //////console.log('me, em radianos = ', me)
  //
  //True anomaly for planet  
  v = m + (2 * e - 0.25 * pow(e, 3) + 5 / 96 * pow(e, 5)) * sin(m) +
    (1.25 * pow(e, 2) - 11 / 24 * pow(e, 4)) * sin(2 * m) +
    (13 / 12 * pow(e, 3) - 43 / 64 * pow(e, 5)) * sin(3 * m) +
    103 / 96 * pow(e, 4) * sin(4 * m) + 1097 / 960 * pow(e, 5) * sin(5 * m);
  //
  //////console.log('v = ', v);
  //
  //True anomaly for earth  
  ve = me + (2 * ee - 0.25 * pow(ee, 3) + 5 / 96 * pow(ee, 5)) * sin(me) +
    (1.25 * pow(ee, 2) - 11 / 24 * pow(ee, 4)) * sin(2 * me) +
    (13 / 12 * pow(ee, 3) - 43 / 64 * pow(ee, 5)) * sin(3 * me) +
    103 / 96 * pow(ee, 4) * sin(4 * me) + 1097 / 960 * pow(ee, 5) * sin(5 * me);
  //
  v = FNrange(v),
    //  ////console.log('v radianos = ', v);
    //
    //
    ve = FNrange(ve),
    // ////console.log('ve radianos = ', ve);
    //
    // Finding the radius vector of the planet
    //
    r = a * (1 - e * e) / (1 + e * cos(v));
  //////console.log('radius (au) = ', r);
  //
  //
  // Finding the radius vector of earth
  //
  re = ae * (1 - ee * ee) / (1 + ee * cos(ve));
  //////console.log('radius earth (au) = ', re);
  //
  // Heliocentric coordinates of the planet
  //
  //convert i, o, ec, and p to radians
  o = o * rads;
  p = p * rads;
  i = i * rads;
  oe = oe * rads;
  pe = pe * rads;
  ie = ie * rads;
  ec = ec_rads;
  //////console.log('ec, rads = ', ec, rads);
  // Calculate  coordinates X, Y, and Z, for planet
  //
  Xrb1 = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  Yrb1 = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  Zrb1 = r * [sin(v + p - o) * sin(i)]
  //********* From stars point o view, till here **********
  // The quantity v + p - o is the angle of the planet       // measured in the plane of the orbit from the ascending node

  // Verify that this is correct: in case you used angles
  // in wrong units , the two r's wont match
  //
  //let remainder = r * r - X * X - Y * Y - Z * Z;
  //////console.log('r - r = ', remainder);
  //
  //
  // Calculate  coordinates X, Y, and Z, for earth
  // Simplified, since earths orbit inclination is very small
  //
  Xe = re * cos(ve + pe);
  Ye = re * sin(ve + pe);
  Ze = 0;
  //
  //////console.log(' re, ve, pe = ', re, ve, pe);
  // ////console.log('X, Y, Z = ', X, Y, Z);
  ////console.log('Xrb1, Yrb1, Zrb1 = ', Xrb1, Yrb1, Zrb1);
  //
  //checking...
  remainder = re * re - Xe * Xe - Ye * Ye - Ze * Ze;
  //////console.log('re - re = ', remainder);

  //  Geocentric ecliptic coordinates of the planet
  //

  Xrel = Xms - Xe;
  Yrel = Yms - Ye;
  Zrel = Zms - Ze;

  RAsolhr = atan2(-Ye, -Xe) * degs / 15;
  DecSoldeg = atan2(Ze, sqrt(Ye * Ye + Xe * Xe)) * degs;
  ////////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  //////console.log('Xrel, Yrel, Zrel = ', Xrel, Yrel, Zrel);

  //
  //Geocentric equatorial coordinates of the planet
  //
  Xq = Xrel;
  Yq = Yrel * cos(ec) - Zrel * sin(ec);
  Zq = Yrel * sin(ec) + Zrel * cos(ec);

  Xsun = Xe;
  Ysun = Ye * cos(ec);
  Zsun = Ye * sin(ec);
  //////console.log ('ec = ', ec );
  //////console.log('Xsun, Ysun, Zsun =  ',Xsun, Ysun, Zsun );
  RAsolhr = atan2(Ysun, Xsun) * degs / 15;
  DecSoldeg = atan2(Zsun, sqrt(Ysun * Ysun + Xsun * Xsun)) * degs;
  //////console.log('RA sol, Dec sol = ', RAsolhr, DecSoldeg);
  // Xq are the equatorial coordinates
  // Xrel are the geocentric ecliptic coordinates      
  // ec is the obliquity of the ecliptic 

  ////////console.log('Xq, Yq, Zq = ', Xq, Yq, Zq);
  //
  // At last, right ascension RA and declination Dec
  // and distance (in AU)
  //
  RA_radians = atan2(Yq, Xq);
  Dec_radians = atan2(Zq, sqrt(Xq * Xq + Yq * Yq));
  distance = sqrt(Xq * Xq + Yq * Yq + Zq * Zq);
  //////console.log('RA_radians, Dec_radians, distance(Mars) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  ////console.log('Mars: ', RA_hours, Dec_degrees, distance);
  //  
} //end function 2016RB1()
//
// 
//
//======function Moon =======
function Moon() {

  Nm = FNrange((125.1228 - 0.0529538083 * d) * rads); //Long ascending node
  im = 5.1454 * rads; // inclination of orbit 
  wm = FNrange((318.0634 + 0.1643573223 * d) * rads); //argm of periapsis
  ws = FNrange((282.9404 + 4.70935e-5 * d) * rads);
  am = 60.2666 //semi-major axis (Earth radii)
  as = 1; //(AU)
  ecm = 0.0549 * rads;
  ecs = (0.016709 - 1.151E-9 * d) * rads; //
  Mm = FNrange((115.3654 + 13.0649929509 * d) * rads); // mean anomaly
  Ms = FNrange((356.0470 + 0.9856002585 * d) * rads);
  Em = Mm + ecm * sin(Mm) * (1 + ecm * cos(Mm)); //eccentric anomaly
  //console.log('Em = ', Em, Em * degs)
  Es = Ms + ecs * sin(Ms) * (1 + ecs * cos(Ms));
  // me = ne * d + Le - we; //earth

  //True anomaly for Moon 
  xv = am * (cos(Em) - ecm);
  yv = am * (sqrt(1 - ecm * ecm) * sin(Em));
  console.log('xv, yv = ', xv, yv)
  vm = FNrange(atan2(yv, xv));
  // Finding the radius vector of the planet
  rm = sqrt(xv * xv + yv * yv);
  //console.log('vm, vm_deg rm = ', vm, vm * degs, rm);
  //These were the the moons position on the plane of
  //its orbit
  //Now,  convert to eclipitic coordinates


  //True anomaly for Sun 
  xvs = as * (cos(Es) - ecs);
  yvs = as * (sqrt(1 - ecs * ecs) * sin(Es));
  vs = atan2(yvs, xvs);
  // Finding the radius vector of the planet
  rs = sqrt(xvs * xvs + yvs * yvs);
  console.log('xvs,yvs,vs = ', xvs, yvs, vs);
  //moon's true longitude
  lonmoon = vm + wm;
  // Sun's true longitude
  lonsun = vs + ws;
  console.log(' lonsun degs = ', lonsun * degs);

  //horizontal cartesian geocentric coordinates
  //
  xeclip = rm * (cos(Nm) * cos(vm + wm) - sin(Nm) * sin(vm + wm) * cos(im));
  yeclip = rm * (sin(Nm) * cos(vm + wm) + cos(Nm) * sin(vm + wm) * cos(im));
  zeclip = rm * (sin(vm + wm) * sin(im));
  } //moon
  
  //calcula dia e hora - não retorna - só define variaveis globais.
  function diaEHoraf(){
          then = (timestamp + ((ii)*86400000));
          now = new Date(then);
          ano = now.getFullYear();
  mes = now.getMonth() + 1;
  dia = now.getDate();
  hora = now.getHours();
  minutos = now.getMinutes();
  segundos = now.getSeconds();
      
      diaEHora1 = dia.toString() + '/';
      diaEHora1 += mes.toString() + '/';
      diaEHora1 += ano.toString();


      //
      diaEHora = hora.toString() + ':';
      //diaEHora += minutos.toString() + ':';
      segundostxt = segundos.toString();
      minutostxt = minutos.toString() + ':';
      if (segundos < 10) {
        segundostxt = '0' + segundostxt;
      }
      if (minutos < 10) {
        minutostxt = '0' + minutostxt;
      }
      diaEHora += minutostxt;
      diaEHora += segundostxt;
      push();

      text(diaEHora1, -150, -250); //day-month-year
      text(diaEHora, -150, -230); //hour-minutes-seconds
      pop()
  
      diaEHora1 = dia.toString() + '/';
      diaEHora1 += mes.toString() + '/';
      diaEHora1 += ano.toString();
      console.log('dia-mes-e-ano: ', diaEHora1);
      fill(255);

      //
      diaEHora = hora.toString() + ':';
      //diaEHora += minutos.toString() + ':';
      segundostxt = segundos.toString();
      minutostxt = minutos.toString() + ':';
      if (segundos < 10) {
        segundostxt = '0' + segundostxt;
      }
      if (minutos < 10) {
        minutostxt = '0' + minutostxt;
      }
      diaEHora += minutostxt;
      diaEHora += segundostxt;
  } //diaEhora()
  
