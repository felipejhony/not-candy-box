import { Player } from './player.js';

const gameContainer = document.getElementById('game-pgr');
const totalFloors = 20;
const player = new Player(0);

function initializeGame() {

    gameContainer.innerHTML = '';

    for (let i = 0; i < totalFloors; i++) {

        let floor = createFloor();
        gameContainer.appendChild(floor);

    }

    updatePlayerPosition();
}

function createFloor() {

    const floor = document.createElement('span');
    floor.className = 'floor';
    floor.textContent = '___';

    return floor;
}

function updatePlayerPosition() {
  
    Array.from(gameContainer.children).forEach((child, index) => {
        if (index === player.position) {
            child.textContent = '\\o/';
            child.className = 'player';
        } else {
            child.textContent = '___';
            child.className = 'floor';
        }
    });

    const blockCount = document.getElementById('block-count');
    blockCount.innerHTML = 'block count: ' +  gameContainer.children.length;

    const playerPos = document.getElementById('player-position');
    playerPos.innerHTML = 'player pos: ' + (player.position + 1);
}

function movePlayer() {
    if (player.position < totalFloors - 1) {
        player.move();
        updatePlayerPosition();
    } else {
        clearInterval(movementInterval);
    }
}

initializeGame();
const movementInterval = setInterval(movePlayer, 1000);