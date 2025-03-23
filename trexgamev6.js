const dino = document.getElementById('dino');
const ground = document.getElementById('ground');
const scoreElement = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
let isJumping = false;
let gravity = 0.9;
let score = 0;

// Movimento do Dino
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) { // Verifica se a tecla é "Space"
        isJumping = true;
        jump();
    }
});

// Função de pulo
function jump() {
    let jumpHeight = 0;
    let jumpInterval = setInterval(() => {
        if (jumpHeight < 150) {
            dino.style.bottom = `${parseInt(dino.style.bottom) + 5}px`;
            jumpHeight += 5;
        } else {
            clearInterval(jumpInterval);
            fall();
        }
    }, 20);
}

// Função de queda
function fall() {
    let fallInterval = setInterval(() => {
        if (parseInt(dino.style.bottom) > 20) {
            dino.style.bottom = `${parseInt(dino.style.bottom) - gravity}px`;
        } else {
            isJumping = false;
            clearInterval(fallInterval);
        }
    }, 20);
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
