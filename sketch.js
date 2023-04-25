//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;
let colidiu = false;
let chancedeErro = 0;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload() {
 trilha = loadSound("Triage & Chewie Tesseract.mp3");
 ponto = loadSound("ponto.mp3");
 raquetada = loadSound("raquetada.mp3");
  }

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //movimentaRaqueteOponenteMP();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChancedeErro();
  bolinhaNaoFicaPresa();
  }
    
function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro);
  }

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  }

function verificaColisaoBorda () {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;}
}
  
function mostraRaquete(x,y){
    rect (x, y, raqueteComprimento, raqueteAltura);
    }

function movimentaMinhaRaquete(){
if (keyIsDown(UP_ARROW)){
  yRaquete -= 10;
}
if (keyIsDown(DOWN_ARROW)){
  yRaquete += 10;
 }
}

function movimentaRaqueteOponente(){
 velocidadeyOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
 yRaqueteOponente += velocidadeyOponente
 calculaChancedeErro();
}

function movimentaRaqueteOponenteMP(){
if (keyIsDown(87)){
  yRaqueteOponente -= 10;
}
if (keyIsDown(83)){
  yRaqueteOponente += 10;
}
 }
  
function verificaColisaoRaquete(){
if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
  velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
    }
  }

function incluiPlacar() {
 stroke(155);
 textAlign(CENTER);
 textSize(16);
 fill(color(107, 142, 35));
 rect(150, 10, 40, 20);
 fill(255);
 text(meusPontos, 170, 26);
 fill(color(107, 142, 35));
 rect(450, 10, 40, 20);
 fill(255);
 text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
 if (xBolinha > 590) {
 meusPontos += 1;
   ponto.play();
}
 if (xBolinha < 10) {
 pontosDoOponente += 1;
   ponto.play();
}
  }

function calculaChancedeErro(){
  if (pontosDoOponente >= meusPontos) { 
 chancedeErro += 5

 if (chancedeErro >= 39){
 chancedeErro = 40
}

} else {
 chancedeErro = 1

 if (chancedeErro <= 35){
 chancedeErro = 35
}
}
  }

function bolinhaNaoFicaPresa(){
 if (xBolinha - raio < 0){

 xBolinha = 23
}
 }

