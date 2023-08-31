//Previous version works with a cam with fixed rotation.
//Recent previous version: to make the cam controlable by user.
//This version: improved camera control
//this version includes 2021f5-lemmon and Halley1986
//===========================
//   Planetary formulas from Paul Schlyter's page at http://astro.if.ufrgs.br/trigesf/position.html.
//this one: all planets: sketchPlanetsAll.js
// tamanhos dos planetas alterados.  Distancia dos planetas distantes alteradas...
// TIME
//This one: including one comet:sketchPlanetsMyComet.js
let miliseconds = 24*3600000;  //miliseconds in a day
let timestamp ;  // miliseconds since 
let stampj2013; ///miliseconds since reference in 2013
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
let RA_Jup, RA_Mar, RA_Mer, RA_Net;
let lat;
let lon;
let dlon;
let Nm;
let twopi;
let degs;
let rads;
let degRad = Math.PI/180;
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
let XSat, YSat, ZSat;
let XUra, YUra, ZUra;
let XNep, YNep, ZNep;
let XPlu, YPlu, ZPlu;
let Xv, Yv, Zv;
let xStar, yStar,zStar;
let starName;
let deltax=0, deltay=0;
// ecliptic c//
//moon geocentric coordinates
let xeclip, yeclip, zeclip;
// moon days 2000
let diasMoon;
//
// coordinates for Earth - cartesian
let Xe, Ye, Ze;
// distance of a body to Earth:
let distance;
var now;
let diaEHora, diaEHora1;
let print = true;
let factor = 20; //to multiply distance of planets
let posx;
let posy;
let posxe;
let posye;
let posxstereo, posystereo;
let au;
let posxms, posyms, poszms;
let p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y;
let ox = 0, oy = 0;
let venusjpg, Saturnjpg;
let marsjpg, jupiterjpg, sunjpg, earthjpg;
let myfont;
//rotations
let anguloz = 0;
let angulox = 0;
let anguloy = 0;
let delta = 0.005;
let frSlider;
let zcamSlider;
//var jupdat;
//var Satdat;
//
let rotatexx = 0;
let rpc;
  let omega = 100;
  let tetaz;
  let distancia;
  let escolha = 'Sol';
  let xcom, ycom, zcom=0; //comet 21f1 coordinates w/r orbit
  let Xcom, Ycom, Zcom; //comet 21f1 coordinates w/r to eclitic
  let Xcomk2, Ycomk2, Zcomk2; //comet 17k2 coordinates w/r to eclitic
  let xcomk2, ycomk2, zcomk2=0; //comet 17k2 coordinates w/r to orbit
  let RRk2=0; //distance of comet k2 to sun
  let Xhal11, Yhal11, Zhal11;//comet halley 11 BC
  let Xhal1986, Yhal1986, Zhal1986;//shrinked
  let xhal1986, yhal1986, zhal1986;//real
  let deltateta = 0.78;

//+++++++
function preload() {
  myfont = loadFont('Catallina.otf');
  sunjpg = loadImage('sun.jpg');
  earthjpg = loadImage('earthcloud.jpg');
  marsjpg = loadImage('mars.jpg');
  jupiterjpg = loadImage('jupiter.jpg');
  venusjpg = loadImage('venus.jpg');
  Saturnjpg = loadImage('saturn.jpg');
  mercury = loadImage('mercury.jpg');
  moon = loadImage('moon.jpg');
  uranusjpg = loadImage('uranus.jpg');
  neptunejpg = loadImage('neptune.jpg');
  plutojpg = loadImage('pluto.jpg');
  //sky = loadImage('constellations-g.jpg');
  //sky = loadImage('starmap_Mirror2_4k.jpg');
  //constelations
  table = loadTable('constelationDatamag.csv', 'csv', 'header'); 
  //camera:

}

//
//
function setup() {
  //textura para assinatura  
  assinatura = createGraphics(380, 100);
  assinatura.background(255, 100);
  assinatura.fill(0);
  assinatura.textAlign(CENTER);
  assinatura.textSize(90);
  assinatura.text('Bonelli-2022', 190, 185);
  //**
  distancia = 500;
  tetaz = 0;
  twopi = TWO_PI;
  degs = 180 / PI;
  factor = 10 * factor;
  rads = 1 / degs;
  ec_rads = ec * rads;
  //
  createCanvas(1366, 768, WEBGL);

  d0 = numeroDeDias();
  diasMoon0 = diasMoon;
  //diasMoon = epocaMoon / 86400;  //Declarado no main
  //console.log('diasMoon, numdias = ' + diasMoon +' ' + d0);
  d = d0;
  Mars();
  posxe = Xe*150 ;
  posye = Ye*150;
  ano = now.getFullYear();
  mes = now.getMonth() + 1;
  dia = now.getDate();
  hora = now.getHours();
  minutos = now.getMinutes();
  segundos = now.getSeconds();
  //console.log('agora ',now);
  //console.log('now = ', now.getHours(), now.getMinutes(), now.getSeconds());
  //
  //ii = -int(419.5*365); //year of 1603: Kepler
  //ii = -int(2434.5*365); //23 August -413 (-412)

  //ii = -int(2027.6*365); //ano -5, 6 AC
  //ii = -int(14.2*365);
  //ii = -30; // Número de dias antes
  //ii = -30; // 1 mes atrás
  //ii = -365*11; //11 anos antes
  //ii = -105*365    ; //15/07/1916
  ii = -30//dias atras
  ifim = ii + 365;  //define ifim
  anguloz = random(0, PI);
  angulox = random(0, PI);
  anguloy = random(0, PI);
  
  frSlider = createSlider(1, 10, 1);
  frSlider.position(0,height+2);
  zcamSlider = createSlider(1000,3000,200,0);//***
  zcamSlider.position(frSlider.x, frSlider.y+30);
  
  //create datafile jupiter.txt
  //jupdat = createWriter('jupiter.dat');
  //Netdat = createWriter('Saturn.dat');

  } //setup

  function draw(){
  
  //background(0);
  //rotateX(-PI/2);
  //console.log(escolha);
  frameRate(frSlider.value());
  //fill(111);
  //textFont(myfont, 20 );
  //text('bonelli-2022',-width/2+20,-height/2+20,0);
  
        //sunlight
   if(escolha == 'luzSolar'){
   pointLight(255,255,105,0,0,0);
   posx=0;
   posy=0;
   posz=0;
   }
//constelações
   push();
   translate(0,0,0);
   //texture(sky);
   fill(0);
   strokeWeight(4);
   stroke(100, 100, 240);
   rotateX(PI/2+0.41);
   sphere(5100,24,18);
   pop();
   //push();
   //Draw stars and Halley from table 
   for (let rr = 0; rr<table.getRowCount(); rr++){
     //for (let cc =1; cc< table.getColumnCount(); cc++)
     //console.log(table.getString(rr,0));
     let starName = table.getString(rr,0);
     //console.log(starName);
     let rightAhr = float(table.getString(rr,1));
     let rightAmin = float(table.getString(rr,2));
     rightARad = (rightAhr + rightAmin/60)*15*degRad; 
     //
     let decDeg = float(table.getString(rr,3));
     let decMin = float(table.getString(rr,4));
     decRad = (decDeg + decMin/60)*degRad;
     //
     xStar =  5000*cos(decRad)*cos(rightARad);
     yStar = 5000*cos(decRad)*sin(rightARad);
     zStar = 5000*sin(decRad);
     let radiusStar = float(table.getString(rr,6));
     //console.log(xStar,yStar,zStar);
     //
     push();
     //translate(0,0,0)
     rotateX(0.41);
     translate(xStar,-yStar, zStar);
     if(starName == "halley"){
     //fill('blue');
     rotateY(PI);
     rotateX(PI);
     stroke(0,111,255);
     cone(5, 115);
     }
     else{
     fill('white');
     sphere(radiusStar);
     }
     pop();
     }

   if (ii++ < ifim) { //till some future time

    print = false;
    d = d0 + ii;
    diasMoon = diasMoon0 + ii;
    //calcula data
     diaEHoraf();//gera diaEHora e diaEHora1
  // Escreve a data
  fill(255,0,0,180);
  textFont(myfont, 20 );
  //atenção-corrigir fontsize devido a zoom da cam
  push();
  if(distancia < 1500){
  rotateY(-PI/2);
  text(diaEHora1 + '\n' + diaEHora,30,111);
  rotateX(-PI/2);
  text(diaEHora1 + '\n' + diaEHora,30,111);
  }
  pop();
    //

    //////console.log('ii , day = ', ii, d);
      raioTerra = 7;
      raioSun = raioTerra *2;
      raioMercury = 0.4 * raioTerra;
      raioMarte = 2* 0.5 * raioTerra;
      raioJupiter = 11.2 * raioTerra/4;
      raioSaturn = 9.5 * raioTerra;
      raioVenus = 0.9 * raioTerra;
      raioUranus = 2*raioTerra;
      raioNeptune = 5*raioTerra;
      raioPluto = 5*raioTerra;
      let tint = 3;
      let tout = 25;
    noStroke();
    //
    jupiter(); //calculates for Jupiter
    RA_Jup = RA_hours;
    Mars(); //calculates quantities for earth and mars
    //////console.log('Mars ', Xms, Yms, Zms);
    Venus(); // Xv, Yv, Zv
    Saturn(); //XSat, etc.
    Uranus();
    Neptune();
    Pluto();
    Moon();
    RA_Sat = RA_hours;
    Mercury(); //Xmer, etc.
    comet21f1(); //xcom, ycom
    comet2017K2();//xcomk2, ycomk2, zcomk2
    comethal1986();

    //origem or position of the sun
    let position; //now, launch, landing
    ox = 0;
    oy = 0;
    oz = 0;
    posxms = ox + factor * Xms; //x coordinate of mars
    posyms = oy - factor * Yms; //y coordinate of mars
    posxmer = ox + factor * Xmer; //x coordinate of mercury
    posymer = oy - factor * Ymer; //y coordinate of mars
    poszmer = oz + factor * Zmer; //z coordinate of mars    
    posxe = ox + factor * Xe; // same, for earth
    posye = oy - factor * Ye;
    xcom = ox + factor * Xcom;
    ycom = oy - factor * Ycom;
    zcom = oz  + factor * Zcom;
    xcomk2 = ox + factor * Xcomk2;
    ycomk2 = oy - factor * Ycomk2;
    zcomk2 = oz  + factor * Zcomk2;
    xhal1986 = ox + 140 * Xhal1986;//140 so aphelion is inside picture
    yhal1986 = oy - 140 * Yhal1986;
    zhal1986 = oz  + 140 * Zhal1986;
    //watch out: moon's distances are in earth radii
    posxmoon = xeclip*raioTerra/20;
    posymoon = -raioTerra*yeclip/20;
    poszmoon = raioTerra*zeclip/20;
    //console.log('xyz'+xeclip,yeclip,zeclip);

    posxj = ox + factor * Xj; //x coordinate of jupiter
    posyj = oy - factor * Yj; //y coordinate of jupiter
    posxv = ox + factor * Xv; //x coordinate of Venus
    poszv = ox + factor * Zv; //z coordinate of Venus
    posyv = oy - factor * Yv; //y coordinate of Venus
    posxSat = ox + factor * XSat; //x coordinate of Saturn
    posySat = oy - factor * YSat; //y coordinate of Saturn
    poszSat = oz - factor * ZSat; //z coordinate of Saturn
    //
    posxUra = ox + factor/3 * Xura; //x coordinate of Uranus
    posyUra = oy - factor/3 * Yura; //y coordinate of Uranus
    poszUra = oz - factor/3 * Zura; //z coordinate of Uranus
    
    posxNep = ox + factor/3 * XNep; //x coordinate of Neptune
    posyNep = oy - factor/3 * YNep; //y coordinate of Neptune
    poszNep = oz - factor/3 * ZNep; //z coordinate of Neptune
    //console.log('uranus pos:  ', posxUra, posyUra, poszUra);
    
    posxPlu = ox + factor/3 * XPlu; //x coordinate of Pluto
    posyPlu = oy - factor/3 * YPlu; //y coordinate of Pluto
    poszPlu = oz - factor/3 * ZPlu; //z coordinate of Pluto
    //
    posxstereo = posxe * 0.935 - posye * 0.354;
    posystereo = posxe * 0.354 + posye * 0.935;

   zcam = zcamSlider.value();
   //console.log('zcam = ' + zcam);
   if(deltax == 0){
      posxcam = posxe;
      posycam = posye;
      deltax = (posxms - posxe)/300;
      deltay = (posyms - posye)/300;
   }else{
      den = min(frameCount, 300-5);
      deltax = (posxms - posxcam)/(300-den);
      deltay = (posyms - posycam)/(300-den);
   }
   //distancia muda pela mousewheel
   //tetaz = mouseY/200;
   //Changes in tetaz in mouseDragged
   omega = 0;
   if(mouseX > width - 50){
      omega = omega + mouseY/200;
   }
   let posx = 0;
   let posy = 0;
   let posz = 0;
   //////
   if (mouseIsPressed === true) {
    if (mouseButton === LEFT) {
      tetaz = tetaz + deltateta;
      if(tetaz>PI || tetaz<0){
         deltateta = -deltateta;
         tetaz += deltateta;
      }
    }
    //if (mouseButton === RIGHT) {
    //  tetaz = tetaz + 0.028;
    //  return false;
    // did not work in Google
    //}
    if (mouseButton === CENTER) {
      tetaz = 0;
   }
   }
   /////
   if(escolha == 'Sol'){
   posx=0;
   posy=0;
   posz=0;
   }
   else if(escolha == 'Terra'){
   posx=posxe;
   posy=posye;
   posz=0;
   }
   else if(escolha == 'Stereo'){
   posx= posxe * 0.935 - posye * 0.354;
   posy= posxe * 0.354 + posye * 0.935;
   //posx=1.5*posx;
   //posy=1.5*posy;
   posz=0;
   }
   else if(escolha == 'Saturno'){
   posx=posxSat;
   posy=posySat;
   posz=0;
   }
   else if(escolha == 'Netuno'){
   posx=posxNep;
   posy=posyNep;
   posz=0;
   }
   else if(escolha == 'giraz'){
     rotateZ(PI/4);
   }
   else if(escolha == 'giray'){
     rotateY(PI/4);
   }
   else if(escolha == 'girax'){
     rotateX(PI/4);
   }
   camera(distancia*sin(omega)*sin(tetaz), distancia*cos(omega)*sin(tetaz),distancia*cos(tetaz),posx,posy,posz,0,1,0);
   //eclipse:
   //camera(posxe/2,posye/2,0, posxe+posxmoon,posye+posymoon,poszmoon,1,1,1);
    //camera(posxe,posye, 0, 0, 0, 0,1,1,1);
    //camera(posx,posy,0, 0,0,0,1,1,1);
    //sol
    push();
    fill('#dddd00');
    translate(ox, oy, 0);
    rotateX(PI / 2);
    //texture(sunjpg);
    emissiveMaterial(255,255,190);
    sphere(raioSun);
    pop();

    if (ii == 0 ) { // agora ************** AGORA ou then

      //perseverance position:
      noLoop();
      
      raiordstr = 3;
      px2 = posxms;
      py2 = posyms;

      ////console.log('NOW ===============');
      //
      //Drawsline to planets from Stereo-A
      //
      stroke('yellow');
      noFill();
      strokeWeight(1);
      line(posxstereo, posystereo, posxSat, posySat);
      stroke('green');
      line(posxstereo, posystereo, posxj, posyj);
      stroke('red');
      noFill();
      strokeWeight(1);
      stroke('red');
      line(posxstereo, posystereo, posxms, posyms);
      stroke('green');
      noFill();
      strokeWeight(1);
      line(posxstereo, posystereo, posxv, posyv);
      stroke(111);
      line(posxstereo, posystereo, posxmer, posymer);
      noStroke();

    }
    //writes  date
    push();

    //Draws Mars, Earth
    push();
    translate(posxms, posyms, 0);
    rotateX(PI / 2);
    texture(marsjpg);
    rm = raioMarte;
    //rm = 10;
    sphere(rm);
    rotateZ(frameCount/50);

    if (print) {
      //text('Marte', posxms + 15, posyms - 3);
      ////console.log('Mars: ', Xms, Yms, Zms);
    }
    pop();
    //
    //draw comet21f1
     push();
     translate(xcom,ycom,zcom);
     if(elevEclit > 0){
       stroke('white');
     } else {
       stroke('blue');
     }
     cone(2, 50);
     pop();
    //draw comet17k2
     push();
     translate(xcomk2,ycomk2,zcomk2);
     //if(elevEclit > 0){
      // stroke('white');
     //} else {
       stroke('gray');
     //}
     cone(2, 50);
     pop();
     //draw Halley11BC
     //push();
     //translate(Xcom,-Ycom,Zcom);
     //rotateZ(-1.5*PI);
     //stroke(0,111,255);
     //cone(2, 50);
     //pop();     
   
       //
    //draw comethal1984
    // push();
    // fill('red');
   //  translate(xhal1986,-yhal1986,zhal1986);
   //  cone(10, 250);
   //  pop();
   
    //draws Jupiter
    push();
    texture(jupiterjpg);
    translate(posxj, posyj, 0);
    rotateX(PI / 2);
    sphere(raioJupiter);
    //sphere(raioTerra);
    rotateX(-PI/2);
    rotateZ(frameCount/3);
    translate(5*raioJupiter,5*raioJupiter,0);
    fill('white');
    sphere(5);
    pop();
    //
    //draws Saturn
    push();
    texture(Saturnjpg);
    translate(posxSat, posySat, poszSat);
    rotateX(PI / 2);
    //sphere(raioSaturn);
    sphere(raioTerra);
    rotateZ(1.0);
    fill('gray'),
    torus(tout,tint);
    fill('white');
    torus(1.3*tout, 1.3*tint);

    pop();
    //
    
        //
    //draws Uranus
    push();
    texture(uranusjpg);
    translate(posxUra, posyUra, poszUra);
    //rotateX(PI / 2);
    sphere(raioUranus);
    pop();
    //
            //
    //draws Pluto
    push();
    texture(plutojpg);
    translate(posxPlu, posyPlu, poszPlu);
    rotateX(PI / 2);
    sphere(raioPluto);
    pop();
    //
        //
    //draws Neptune
    push();
    texture(neptunejpg);
    translate(posxNep, posyNep, poszNep);
    rotateX(PI / 2);
    sphere(raioNeptune);
    pop();
    //

    //mercury
        //draws Mercury
    push();
    texture(mercury);
    translate(posxmer, posymer, 0);
    rotateX(PI / 2);
    sphere(raioMercury);
    //specularMaterial(red);
    pop();
    //
    //draws Venus
    push();
    texture(venusjpg);
    translate(posxv, posyv, poszv);
    rotateX(PI / 2);
    sphere(raioVenus);
    pop();

    // Draws earth moon and Stereo A 
    //

    fill('#00ccFF');
    push()
    translate(posxe, posye, 0);
    //rotateX(PI / 2);//TEM QUE VIRAR  e depois desvirar
    //para desenhar a lua
    texture(earthjpg);
    sphere(raioTerra);
    //moon
    translate(posxmoon , posymoon , poszmoon);
    //console.log('moonxyz' + posxmoon, posymoon,poszmoon);
    texture(moon);
    sphere(raioTerra/4);//aqui consertar isso
    pop();
    //
    // StereoA
    push();
    rotateZ(0.362);
    translate(posxe, posye, 0);
    fill('yellow');
    sphere(2);
    pop();
  } //if ii < ifim 
  else{
    //jupdat.close();
    //Satdat.close();
    if(distancia<1500){
    rotateX(PI/2);
     textFont(myfont, 40 );
  text('Programado em p5.js/WEBGL por Enivaldo Bonelli',20,0,0);
  }
  }
      
} //draw()
//
//************** FUNCTIONS ****************

function mouseDragged() {
  tetaz = tetaz + 0.39;
  }

function mouseWheel(event) {
  distancia = distancia + 5*event.delta;
  return false;
}
function mousePressed(){
      noLoop();
    }
function mouseReleased(){
  loop();
  return false;
}
function keyTyped() {
  if (key === 'o') {
    escolha = 'Sol';
  } else if (key === 't') {
    escolha = 'Terra';
  } else if (key === 'x') {
    escolha = 'Stereo';
  } else if (key === 's') {
    escolha = 'Saturno';
}
  else if (key === 'n') {
    escolha = 'Netuno';
}
  else if (key === 'l') {
    escolha = 'luzSolar';
}
  else if (key === 'z') {
    escolha = 'giraz';
}
  else if (key === 'y') {
    escolha = 'giray';
}
  else if (key === 'x') {
    escolha = 'girax';
}
}
//

 // }
//
//
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
  //console.log('Jupiter: ', RA_hours, Dec_degrees, distance);
  //jupdat.print([RA_hours + " " + Dec_degrees]);
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
  // The quantity v + p - o is the angle of the planet       
  // measured in the plane of the orbit from the ascending node

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
  RAsolhr = atan2(Ysun, Xsun) * degs / 15; //em horas
  DecSoldeg = atan2(Zsun, sqrt(Ysun * Ysun + Xsun * Xsun)) * degs; //em graus
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

// 
function numeroDeDiasOutra() {

  now = (new Date()).getTime();
  let stampj2001 = (new Date('1999-12-31T00:00:00Z')).getTime();
  //time for calculation date:
  //
  let epoca = (now - stampj2001) / 1000;
  //console.log('epoca = ' + epoca);
  let numdias = epoca / 86400;
  //console.log('numero de dias entre 2000-01-01 e agora = ' + numdias); //incluir frações do dia, depois: dayfrac = hours+ min/60)/24
  //calculatin UT time, decimal hours
  now = new Date();
  minutes = now.getUTCMinutes() / 60;
  seconds = now.getUTCSeconds() / 360;
  hours = now.getUTCHours();
  UT = hours + minutes + seconds;
  //console.log('522-UT', UT);
  return numdias;
} //end function numeroDeDiasOutra
//
//
//
function numeroDeDias() {

  //calcula numero de dias entre duas datas escolhidas
  // Por enquanto entre 201308160000 e o presente (ou data da previsão)
  //por exemplo, já usei 1603 e funcionou.  Kepler.
  now = new Date();
  timestamp = now.getTime(); //agora
  //console.log('timeStamp = ', +timestamp)
  //time for 2013 elements
  //
  stampj2013 = (new Date('2013-08-16T12:00:00Z')).getTime();
  let stampj2000 = (new Date('1999-12-31T00:00:00Z')).getTime();
  //
  //////console.log('stampj2013 = ', stampj2013);
  // epoca, em milisegundos
  let epocaMoon = (timestamp - stampj2000) / 1000;
  let epoca = (timestamp - stampj2013) / 1000;
  //console.log('epoca = ' + epoca);
  let numdias = epoca / 86400;
  diasMoon = epocaMoon / 86400;  //Declarado no main
  //console.log('diasMoon, numdias = ' + diasMoon +' ' + numdias);
 
  return numdias;
} //end function numeroDeDias
//
//
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
  mj_degrees = nj * d + Lj - pj; //venus


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
  //********* From sun's point o view, till here **********
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
  XSat = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  YSat = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  ZSat = r * [sin(v + p - o) * sin(i)]
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

  Xrel = XSat - Xe;
  Yrel = YSat - Ye;
  Zrel = ZSat - Ze;

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
  //Satdat.print([RA_hours + " " + Dec_degrees]);
  //  
} //end function Saturn()
//
//
//
//Uranus
//
//
//
function Uranus() {
  //
  // Uranus's elements
  //
  //Mean anomaly
  //////console.log('Dentro de Uranus - ec = ', ec);
  //
  i = 0.7728;
  o = 73.989;
  p = 169.602;
  a = 19.1882;
  n = 0.011733;
  e = 0.047874;
  L = 11.9756;
//
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
  Xura = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  Yura = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  Zura = r * [sin(v + p - o) * sin(i)]
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

  Xrel = Xura - Xe;
  Yrel = Yura - Ye;
  Zrel = Zura - Ze;

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
  //////console.log('RA_radians, Dec_radians, distance(Uranus) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  //console.log('Uranus: ', RA_hours, Dec_degrees, distance);
  //Satdat.print([RA_hours + " " + Dec_degrees]);
  //  
} //end function Uranus()
//
//
//Neptune
//
//
//
function Neptune() {
  //
  // Neptune's elements
  //
  i = 1.7692;
  o = 131.946;
  p = 6.152;
  a = 29.9987;
  n = 0.006;
  e = 0.0098;
  L = 335.02;
//
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
  XNep = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  YNep = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  ZNep = r * [sin(v + p - o) * sin(i)]
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

  Xrel = XNep - Xe;
  Yrel = YNep - Ye;
  Zrel = ZNep - Ze;

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
  //////console.log('RA_radians, Dec_radians, distance(Neptune) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  //console.log('Neptune: ', RA_hours, Dec_degrees, distance);
  //Satdat.print([RA_hours + " " + Dec_degrees]);
  //  
} //end function Neptune()
//
// end Neptune
//
//Pluto
//
function Pluto() {
  //
  // Pluto's elements
  //
  //Mean anomaly
  //////console.log('Dentro de Pluto - ec = ', ec);
  //
  i = 17.1695;
  o = 110.469;
  p = 223.486;
  a = 39.2766;
  n = 0.004;
  e = 0.246211;
  L = 258.8717;
//
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
  XPlu = r * [cos(o) * cos(v + p - o) - sin(o) * sin(v + p - o) *
    cos(i)
  ]
  YPlu = r * [sin(o) * cos(v + p - o) + cos(o) * sin(v + p - o) *
    cos(i)
  ]
  ZPlu = r * [sin(v + p - o) * sin(i)]
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

  Xrel = XPlu - Xe;
  Yrel = YPlu - Ye;
  Zrel = ZPlu - Ze;

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
  //////console.log('RA_radians, Dec_radians, distance(Pluto) = ', RA_radians, Dec_radians, distance);
  //convertin RA to hours
  RA_hours = RA_radians * degs / 15;
  if (RA_hours < 0) {
    RA_hours += 24;
  }
  //converting Dec to degrees
  Dec_degrees = Dec_radians * degs;
  //
  //console.log('Pluto: ', RA_hours, Dec_degrees, distance);
  //Satdat.print([RA_hours + " " + Dec_degrees]);
  //  
} //end function Pluto()
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
  // heliocentric
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
} //end function Mercury//
//======function Moon =======
function Moon() {

  Nm = FNrange((125.1228 - 0.0529538083 * diasMoon) * rads); //Long ascending node
  im = 5.1454 * rads; // inclination of orbit 
  wm = FNrange((318.0634 + 0.1643573223 * diasMoon) * rads); //argm of periapsis
  ws = FNrange((282.9404 + 4.70935e-5 * diasMoon) * rads);
  am = 60.2666 //semi-major axis (Earth radii)
  as = 1; //(AU)
  ecm = 0.0549 * rads;
  ecs = (0.016709 - 1.151E-9 * diasMoon) * rads; //
  Mm = FNrange((115.3654 + 13.0649929509 * diasMoon) * rads); // mean anomaly
  Ms = FNrange((356.0470 + 0.9856002585 * diasMoon) * rads);
  Em = Mm + ecm * sin(Mm) * (1 + ecm * cos(Mm)); //eccentric anomaly
  //console.log('Em = ', Em, Em * degs)
  Es = Ms + ecs * sin(Ms) * (1 + ecs * cos(Ms));
  // me = ne * diasMoon + Le - we; //earth

  //True anomaly for Moon 
  xv = am * (cos(Em) - ecm);
  yv = am * (sqrt(1 - ecm * ecm) * sin(Em));
  //console.log('xv, yv = ', xv, yv)
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
  //console.log('xvs,yvs,vs = ', xvs, yvs, vs);
  //moon's true longitude
  lonmoon = vm + wm;
  // Sun's true longitude
  lonsun = vs + ws;
  //console.log(' lonsun degs = ', lonsun * degs);

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
      if(distancia<1500){
      fill(255,0,0,180);
      text(diaEHora1, -150, -250); //day-month-year
      text(diaEHora, -150, -230); //hour-minutes-seconds
      text(RRk2, -150, -210);
      }
      pop()
  
      diaEHora1 = dia.toString() + '/';
      diaEHora1 += mes.toString() + '/';
      diaEHora1 += ano.toString();
      //console.log('dia-mes-e-ano: ', diaEHora1);
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
  
// ***** comet c/2017 K2
//
function comet2017K2() {
  //
  // comet2017 elements
  //
  //Used expressions for near parabolic orbits
  //from Paul Schlyter's work

  e = 1.0004;  //
  q = 1.79880; //au
  tp = 8389; //perhelion j2000 date
  i = 87.5450 * rads; //degrees
  w1 = 236.172 * rads; //degrees- arg of periapsis
  o = 88.260 * rads; //degrees - longitude of ascending node, N, omega
  //// Constants
  k = 0.01720209895;  //gravitational constant
  ////Calculated quantities
  //d-tp = time till the perihelion
  qqq = q*q*q;
  a = 0.75*(d-tp) * k * sqrt((1+e)/qqq);
  b = sqrt(1+a*a);
  W = Math.cbrt(b+a) -Math.cbrt(b-a);
  WW = W*W;
  WWWW = WW*WW;
  f = (1-e)/(1+e);
  a1 = (2/3) +(2/5)*WW;
  a2 = 7/5 + (33/35) * WW + (37/175) * WWWW;
  a3 = WW / (1+WW);
  C = WW/(1+WW);
  g = f*C*C;
  w = W * (1 + f * C * (a1 + a2*g +a3*g*g));
  v= 2 * atan(w);//true anomaly
  r = q*(1+w*w)/(1+w*w*f);
  //components in the plane of orbit
  xcom = r * cos(v);
  ycom = r *sin(v);
  console.log(d, tp);
  console.log(xcom, ycom,r,v);
  //components in space viewed from sun
  Xcomk2 = r * [cos(o) * cos(v + w1) - sin(o) * sin(v + w1) *
    cos(i)
  ]
  Ycomk2 = r * [sin(o) * cos(v+w1) + cos(o) * sin(v + w1) *
    cos(i)
  ]
  Zcomk2 = r * [sin(v + w1) * sin(i)]
  RRk2 = sqrt(Ycom*Ycom + Xcom*Xcom +Zcom*Zcom);
  elevEclit = asin(Zcom/RR) * degs;
  //console.log('Range = ', RR, 'elevEclit = ', elevEclit);
  } //end of function comet c/2017 K2
//
// ***** comet c/2021 f1
//
function comet21f1() {
  //
  // comet21f1 elements
  //
  //Used expressions for near parabolic orbits
  //from Paul Schlyter's work

  e = 0.995842;  //
  q = 0.9955; //au
  tp = 8132; //perhelion j2000 date
  i = 162.2627 * rads; //degrees
  w1 = 146.8 * rads; //degrees- arg of periapsis
  o = 203.45 * rads; //degrees - longitude of ascending node, N, omega
  //// Constants
  k = 0.01720209895;  //gravitational constant
  ////Calculated quantities
  //d-tp = time till the perihelion
  qqq = q*q*q;
  a = 0.75*(d-tp) * k * sqrt((1+e)/qqq);
  b = sqrt(1+a*a);
  W = Math.cbrt(b+a) -Math.cbrt(b-a);
  WW = W*W;
  WWWW = WW*WW;
  f = (1-e)/(1+e);
  a1 = (2/3) +(2/5)*WW;
  a2 = 7/5 + (33/35) * WW + (37/175) * WWWW;
  a3 = WW / (1+WW);
  C = WW/(1+WW);
  g = f*C*C;
  w = W * (1 + f * C * (a1 + a2*g +a3*g*g));
  v= 2 * atan(w);//true anomaly
  r = q*(1+w*w)/(1+w*w*f);
  //components in the plane of orbit
  xcom = r * cos(v);
  ycom = r *sin(v);
  console.log(d, tp);
  console.log(xcom, ycom,r,v);
  //components in space viewed from sun
  Xcom = r * [cos(o) * cos(v + w1) - sin(o) * sin(v + w1) *
    cos(i)
  ]
  Ycom = r * [sin(o) * cos(v+w1) + cos(o) * sin(v + w1) *
    cos(i)
  ]
  Zcom = r * [sin(v + w1) * sin(i)]
  RR = sqrt(Ycom*Ycom + Xcom*Xcom +Zcom*Zcom);
  elevEclit = asin(Zcom/RR) * degs;
  //console.log('Range = ', RR, 'elevEclit = ', elevEclit);
  } //end of function comet21f1
  //
// ***** comet c/2021 f1
//
function comethal1986() {
  //
  // comet halley 1986 elements
  //
  //Used expressions for near parabolic orbits
  //from Paul Schlyter's work

  e = 0.96714291;  //
  q = 0.5859781115; //au
  tp = 2446467.39531; //perhelion julian date
  i = 107 * rads; //degrees
  w1 = 111.3325 * rads; //degrees- arg of periapsis
  o = 58.4201 * rads; //degrees - longitude of ascending node, N, omega
  //// Constants
  //epoch = 2449400.5;
  k = 0.01720209895;  //gravitational constant
  ////Calculated quantities
  //d-tp = time till the perihelion
  qqq = q*q*q;
  a = 0.75*(d+2451544.5-tp) * k * sqrt((1+e)/qqq);
  b = sqrt(1+a*a);
  W = Math.cbrt(b+a) -Math.cbrt(b-a);
  WW = W*W;
  WWWW = WW*WW;
  f = (1-e)/(1+e);
  a1 = (2/3) +(2/5)*WW;
  a2 = 7/5 + (33/35) * WW + (37/175) * WWWW;
  a3 = WW / (1+WW);
  C = WW/(1+WW);
  g = f*C*C;
  w = W * (1 + f * C * (a1 + a2*g +a3*g*g));
  v= 2 * atan(w);//true anomaly
  r = q*(1+w*w)/(1+w*w*f);
  //components in the plane of orbit
  xcom = r * cos(v);
  ycom = r *sin(v);
  console.log(d, tp);
  console.log(xcom, ycom,r,v);
  //components in space viewed from sun
  Xhal1986 = r * [cos(o) * cos(v + w1) - sin(o) * sin(v + w1) *
    cos(i)
  ];
  Yhal1986 = r * [sin(o) * cos(v+w1) + cos(o) * sin(v + w1) *
    cos(i)
  ];
  Zhal1986 = r * [sin(v + w1) * sin(i)];
  //console.log('Xhall,etc  ', Xhal1986, Yhal1986, Zhal1986);
  //RRh = sqrt(Yhal1986*Yhal1986 + Xhal1986*Xhal1986 +Zhal1986*Zhal1986);
  //elevEclithal86 = asin(Zhal1986/RR) * degs;
  RA_radians = atan2(Yhal1986, Xhal1986);
  Dec_radians = atan2(Zhal1986, sqrt(Xhal1986 * Xhal1986 + Yhal1986 * Yhal1986));
  RAhr = RA_radians*degs/15;
  Decdeg = Dec_radians * degs;
  console.log('RA Hall 1986 = ', RAhr, ' Dec hal1986 = ', Decdeg);
  } //end of function comethal1986
  //
  
  
  //the end
