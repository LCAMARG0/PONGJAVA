const player1 = new Player();
player1.controller = 'mouse';
const player2 = new Player();
const bola = new Bola();

function setup() {
  createCanvas(500, 400);
  resetGame();
}

function resetGame() {
  player1.pos.x = 10;
  player2.pos.x = width - 20;
  player1.pos.y = 180;
  player2.pos.y = 180;
  bola.pos.x = (bola.direcao === 1) ? 40 : 400;
  bola.pos.y = 200;
  bola.deslocamento = 3;
}

function verificaPontuacao() {
  if (bola.pos.x > width) {
    player1.pontuacao++;
    resetGame();
  }

  if (bola.pos.x + bola.size.w < 0) {
    player2.pontuacao++;
    resetGame()
  }
}

function mostrarPontuacao() {
  fill('#A7A7A7'); // Cor cinza claro para a pontuação
  textSize(48);
  text(player1.pontuacao, 190, 50);
  text(player2.pontuacao, 284, 50);
}

function teveColisaoObjetos(obj1, obj2) {
  return (
    obj1.pos.x + obj1.size.w > obj2.pos.x &&
    obj1.pos.x < obj2.pos.x + obj2.size.w &&
    obj1.pos.y + obj1.size.h > obj2.pos.y &&
    obj1.pos.y < obj2.pos.y + obj2.size.h
  );
}

function verificaColisao() {
  if (teveColisaoObjetos(bola, player2)) {
    bola.direcao = -1;
    bola.deslocamento += 0.1;
  }

  if (teveColisaoObjetos(bola, player1)) {
    bola.direcao = 1;
    bola.deslocamento += 0.1;
  }

  if ((bola.pos.y + bola.size.h) > height || bola.pos.y < 0) {
    bola.direcaoVertical *= -1;
  }
}

function draw() {
  background('#CCCCCC'); // Cor de fundo cinza

  // Configurando o meio de campo com uma linha mais espessa e cor branca
  strokeWeight(8);
  stroke("white");
  line(width / 2, 0, width / 2, height);

  // Atualiza as posições dos objetos
  player1.update();
  player2.update();
  bola.update();

  // Verificar colisão
  verificaColisao();
  // Verificar se teve pontuação
  verificaPontuacao();

  // Adicionando um efeito de rastro à bola
  fill('rgba(255, 255, 255, 0.8)'); // Cor com um pouco de transparência
  noStroke();
  ellipse(bola.pos.x, bola.pos.y, bola.size.w, bola.size.h);

  // Mostra os objetos
  player1.show();
  player2.show();
  bola.show();

  // Mostra a pontuação
  mostrarPontuacao();
}

