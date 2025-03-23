const dino = document.getElementById('dino');
const ground = document.getElementById('ground');
const scoreElement = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
let isJumping = false;
let gravity = 0.9;  // A gravidade para o movimento de queda do Dino
let score = 0;

// Função que faz o Dino pular ao pressionar a tecla "Space"
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) { // Verifica se a tecla "Espaço" foi pressionada
        isJumping = true;
        jump();
    }
});

// Função de pulo
function jump() {
    let jumpHeight = 0;
    let jumpInterval = setInterval(() => {
        if (jumpHeight < 150) { // O máximo que o Dino vai subir
            dino.style.bottom = `${parseInt(dino.style.bottom) + 5}px`; // Subir o Dino
            jumpHeight += 5;
        } else {
            clearInterval(jumpInterval); // Para o pulo quando atingir o topo
            fall(); // Inicia a queda
        }
    }, 20); // Faz o pulo acontecer a cada 20ms
}

// Função de queda
function fall() {
    let fallInterval = setInterval(() => {
        if (parseInt(dino.style.bottom) > 20) { // Se o Dino ainda estiver acima do chão
            dino.style.bottom = `${parseInt(dino.style.bottom) - gravity}px`; // O Dino vai cair
        } else {
            isJumping = false; // Pulo finalizado
            clearInterval(fallInterval); // Para a queda
        }
    }, 20); // Faz a queda acontecer a cada 20ms
}

// Gerar obstáculos (Cactos)
function createCactus() {
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    cactus.style.position = 'absolute';
    cactus.style.bottom = '20px';
    cactus.style.left = '800px';
    cactus.style.width = '20px';
    cactus.style.height = '40px';
    cactus.style.backgroundColor = 'brown';
    gameContainer.appendChild(cactus);

    // Movimento do cacto
    let moveCactus = setInterval(() => {
        let cactusPosition = parseInt(cactus.style.left);
        if (cactusPosition <= -20) {
            clearInterval(moveCactus);
            gameContainer.removeChild(cactus);
        } else {
            cactus.style.left = `${cactusPosition - 5}px`;
        }

        // Verificar colisão com o Dino
        if (
            cactusPosition >= 50 && cactusPosition <= 90 && 
            parseInt(dino.style.bottom) <= 60
        ) {
            alert('Game Over!');
            clearInterval(moveCactus);
        }
    }, 20);
}

// Aumentar pontuação
function increaseScore() {
    score++;
    scoreElement.innerText = score;
}

// Gerar obstáculos a cada 2 segundos
setInterval(() => {
    createCactus();
    increaseScore();
}, 2000);
