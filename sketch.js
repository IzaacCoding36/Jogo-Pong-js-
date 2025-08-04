// ===========================================
// CONSTANTES DO JOGO
// ===========================================
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 90;
const BALL_DIAMETER = 13;
const BALL_RADIUS = BALL_DIAMETER / 2;
const PADDLE_SPEED = 10;
const INITIAL_BALL_SPEED = 6;
const MAX_SCORE = 10; // Pontuação máxima para vencer

// ===========================================
// VARIÁVEIS DA BOLINHA
// ===========================================
let xBolinha = CANVAS_WIDTH / 2;
let yBolinha = CANVAS_HEIGHT / 2;
let velocidadeXBolinha = INITIAL_BALL_SPEED;
let velocidadeYBolinha = INITIAL_BALL_SPEED;

// ===========================================
// VARIÁVEIS DAS RAQUETES
// ===========================================
let xRaquete = 5;
let yRaquete = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let xRaqueteOponente = CANVAS_WIDTH - 15;
let yRaqueteOponente = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;

// ===========================================
// VARIÁVEIS DO JOGO
// ===========================================
let meusPontos = 0;
let pontosDoOponente = 0;
let colidiu = false;
let jogoAtivo = true;
let vencedor = "";

// ===========================================
// SONS DO JOGO
// ===========================================
let ponto;
let raquetada;
let trilha;

// ===========================================
// CARREGAMENTO DE RECURSOS
// ===========================================
function preload() {
  trilha = loadSound("Triage & Chewie Tesseract.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

// ===========================================
// CONFIGURAÇÃO INICIAL
// ===========================================
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  trilha.loop();
  reiniciarJogo();
}

// ===========================================
// LOOP PRINCIPAL DO JOGO
// ===========================================
function draw() {
  background(0);
  
  // Desenhar linha central
  desenhaCentro();
  
  if (jogoAtivo) {
    // Desenhar elementos do jogo
    mostraBolinha();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    
    // Atualizar posições
    movimentaBolinha();
    movimentaRaquetes();
    
    // Verificar colisões
    verificaColisoesBorda();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    
    // Verificar pontuação
    marcaPonto();
  }
  
  // Sempre mostrar placar e verificar vitória
  incluiPlacar();
  verificaVitoria();
}
// ===========================================
// FUNÇÕES DE DESENHO
// ===========================================
function mostraBolinha() {
  fill(255);
  stroke(100, 200, 255);
  strokeWeight(2);
  circle(xBolinha, yBolinha, BALL_DIAMETER);
  
  // Efeito de rastro da bolinha
  fill(255, 150);
  noStroke();
  circle(xBolinha - velocidadeXBolinha/2, yBolinha - velocidadeYBolinha/2, BALL_DIAMETER/2);
}

function mostraRaquete(x, y) {
  fill(255);
  stroke(100, 200, 255);
  strokeWeight(2);
  rect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT, 3); // Bordas arredondadas
  
  // Efeito de brilho nas raquetes
  fill(255, 50);
  noStroke();
  rect(x + 1, y + 5, PADDLE_WIDTH - 2, PADDLE_HEIGHT - 10, 2);
}

function desenhaCentro() {
  stroke(100);
  strokeWeight(5);
  drawingContext.setLineDash([10, 15]);
  line(CANVAS_WIDTH/2, 0, CANVAS_WIDTH/2, CANVAS_HEIGHT);
  drawingContext.setLineDash([]);
}

// ===========================================
// FUNÇÕES DE MOVIMENTO
// ===========================================
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function movimentaRaquetes() {
  // Controles do Jogador 1 (W/S)
  if (keyIsDown(87) && yRaquete > 0) { // W
    yRaquete -= PADDLE_SPEED;
  }
  if (keyIsDown(83) && yRaquete < CANVAS_HEIGHT - PADDLE_HEIGHT) { // S
    yRaquete += PADDLE_SPEED;
  }
  
  // Controles do Jogador 2 (Setas)
  if (keyIsDown(UP_ARROW) && yRaqueteOponente > 0) {
    yRaqueteOponente -= PADDLE_SPEED;
  }
  if (keyIsDown(DOWN_ARROW) && yRaqueteOponente < CANVAS_HEIGHT - PADDLE_HEIGHT) {
    yRaqueteOponente += PADDLE_SPEED;
  }
}
// ===========================================
// FUNÇÕES DE COLISÃO
// ===========================================
function verificaColisoesBorda() {
  // A bolinha só deve quicar nas bordas superior e inferior
  if (yBolinha + BALL_RADIUS > CANVAS_HEIGHT || yBolinha - BALL_RADIUS < 0) {
    velocidadeYBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, PADDLE_WIDTH, PADDLE_HEIGHT, xBolinha, yBolinha, BALL_RADIUS);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    
    // Adicionar um pouco de variação no ângulo baseado em onde a bola bateu na raquete
    let pontoColisao = (yBolinha - (y + PADDLE_HEIGHT/2)) / (PADDLE_HEIGHT/2);
    velocidadeYBolinha = pontoColisao * 5;
  }
}

// ===========================================
// FUNÇÕES DE PONTUAÇÃO E PLACAR
// ===========================================
function marcaPonto() {
  if (xBolinha > CANVAS_WIDTH) {
    meusPontos += 1;
    ponto.play();
    reiniciarBolinha();
  }
  if (xBolinha < 0) {
    pontosDoOponente += 1;
    ponto.play();
    reiniciarBolinha();
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  
  // Placar do Jogador 1
  fill(color(107, 142, 35));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  
  // Placar do Jogador 2
  fill(color(107, 142, 35));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
  
  // Mostrar vencedor se o jogo acabou
  if (vencedor !== "") {
    textSize(24);
    fill(255, 255, 0);
    text(vencedor + " VENCEU!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 20);
    textSize(16);
    text("Pressione R para reiniciar", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 10);
  }
}

// ===========================================
// FUNÇÕES DE CONTROLE DO JOGO
// ===========================================
function verificaVitoria() {
  if (meusPontos >= MAX_SCORE) {
    vencedor = "JOGADOR 1";
    jogoAtivo = false;
  } else if (pontosDoOponente >= MAX_SCORE) {
    vencedor = "JOGADOR 2";
    jogoAtivo = false;
  }
}

function reiniciarBolinha() {
  xBolinha = CANVAS_WIDTH / 2;
  yBolinha = CANVAS_HEIGHT / 2;
  velocidadeXBolinha = random([-INITIAL_BALL_SPEED, INITIAL_BALL_SPEED]);
  velocidadeYBolinha = random([-INITIAL_BALL_SPEED, INITIAL_BALL_SPEED]);
}

function reiniciarJogo() {
  meusPontos = 0;
  pontosDoOponente = 0;
  vencedor = "";
  jogoAtivo = true;
  reiniciarBolinha();
  
  // Reposicionar raquetes
  yRaquete = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
  yRaqueteOponente = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
}

// ===========================================
// FUNÇÕES DE CONTROLE POR TECLADO
// ===========================================
function keyPressed() {
  // Pressionar R para reiniciar o jogo
  if (key === 'r' || key === 'R') {
    reiniciarJogo();
  }
  
  // Pressionar espaço para pausar/despausar
  if (key === ' ') {
    jogoAtivo = !jogoAtivo;
  }
}

