// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel'; // Mostra o botão jogar novamente
  btnReiniciar.className = 'invisivel'; // Oculta o botão reiniciar
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // Variável jogar volta a ser verdadeira
  let divis = document.getElementsByTagName("div");

  // Reset das divs
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= 0 && divis[i].id <= 3) {
      divis[i].className = "inicial";
    }
  }

  // Remove a imagem de acerto
  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }

  // Remove a imagem de erro (corrigido aqui)
  let imageme = document.getElementById("imageme");
  if (imageme != null) {
    imageme.remove();
  }
}


// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função executada quando o jogador acertou
function acertou(carta) {
  carta.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://jogodotigrecom.com/wp-content/uploads/2024/01/Jogo-do-Tigre.webp";
  carta.appendChild(img);
}

// Função executada quando o jogador errou
function errou(carta) {
  // Altera a classe CSS da carta para "errou", o que provavelmente a deixa vermelha
  carta.className = "errou";
  
  // Verifica se já existe uma imagem na carta para evitar duplicações
  let imagemExistente = carta.querySelector('img');
  
  // Se não houver imagem, cria e anexa uma imagem de erro
  if (!imagemExistente) {
     const img = new Image(100);
     img.id = "imageme"; // Define o ID da imagem de erro
     img.src = "https://compras.wiki.ufsc.br/images/5/56/Erro.png"; // Caminho da imagem de erro
     
     // Adiciona a imagem na carta clicada (a que o jogador escolheu)
     carta.appendChild(img);
  }
}




// Função que verifica o acerto
function verifica(carta) {
  // Se jogar é verdadeiro
  if (jogar) {
    jogar = false; // Jogar passa a ser false
    tentativas++; // Incrementa as tentativas
    
    // Verifica se jogou 4 vezes
    if (tentativas == 4) {
      btnJogarNovamente.className = 'invisivel'; // Oculta o botão de jogar novamente
      btnReiniciar.className = 'visivel'; // Mostra o botão reiniciar
    }

    // Gera um número aleatório entre 0 e 3
    let sorteado = Math.floor(Math.random() * 4);

    // Se o id da carta for igual ao número sorteado, o jogador acertou
    if (carta.id == sorteado) {
      acertou(carta); // Chama a função de acerto
      acertos++; // Incrementa os acertos
    } else {
      // Se errou
      errou(carta); // Chama a função de erro
      const cartaSorteado = document.getElementById(sorteado);
      acertou(cartaSorteado); // Mostra onde estava o acerto

      // Mostra o jumpscare se o jogador errar
      mostrarJumpscare();
    }

    // Atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Função para mostrar o jumpscare
function mostrarJumpscare() {
  // Cria um elemento de imagem
  let img = new Image();
  img.src = "https://i.pinimg.com/564x/ad/bb/c0/adbbc081c889aef11906545030c2c41a.jpg";
  
  // Configura o estilo para aparecer em tela cheia
  img.style.position = "fixed";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100vw";
  img.style.height = "100vh";
  img.style.zIndex = "1000"; // Coloca a imagem acima de tudo
  img.style.objectFit = "cover";

  // Adiciona a imagem ao body
  document.body.appendChild(img);

  // Remove o jumpscare após 2 segundos
  setTimeout(function() {
    img.remove();
  }, 2000);
}




// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
