import { Player } from './player.js';

const gameContainer = document.getElementById('game-pgr');
const totalFloors = 20;
const player = new Player(0);
const goButton = document.getElementById("btnGo");
let movementInterval = null;

function resetGame() {

    gameContainer.innerHTML = '';

    for (let i = 0; i < totalFloors; i++) {

        let floor = createFloor();
        gameContainer.appendChild(floor);

    }
    updatePlayerPosition();
}

resetGame();

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

    //DEBUG
    const blockCount = document.getElementById('block-count');
    blockCount.innerHTML = 'block count: ' + gameContainer.children.length;

    const playerPos = document.getElementById('player-position');
    playerPos.innerHTML = 'player pos: ' + (player.position + 1);
}

function movePlayer() {
    if (player.position < totalFloors - 1) {
        player.move();
        updatePlayerPosition();
    } else {
        clearInterval(movementInterval);
        
        goButton.disabled = false;
        goButton.innerHTML = "GO"
        
        player.position = 0;
        updatePlayerPosition();
    }
}

goButton.onclick = function () {
    resetGame();
    movementInterval = setInterval(movePlayer, 300);
    goButton.disabled = true;
    goButton.innerHTML = "WAIT"
}

