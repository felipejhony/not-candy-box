import { Player } from "./player.js";
import { fight } from './battle.js';

const gameContainer = document.getElementById("game-pgr");
const totalFloors = 20;
const player = new Player();
const goButton = document.getElementById("btnGo");
let movementInterval = null;
let fighting = false;

function initGame() {
  gameContainer.innerHTML = "";

  for (let i = 0; i < totalFloors; i++) {
    let floor = createFloor();
    gameContainer.appendChild(floor);
  }
  updateUI();
}

function resetGame() {
  clearInterval(movementInterval);
  fighting = false;
  player.reset();
  goButton.disabled = false;
  goButton.innerHTML = "GO";
  gameContainer.innerHTML = "";

  for (let i = 0; i < totalFloors; i++) {
    const shouldCreateEnemy = Math.random() < 0.2;
    const tile = shouldCreateEnemy ? createEnemy() : createFloor();
    gameContainer.appendChild(tile);
  }

  updateUI();
}

function createEnemy() {
  const enemy = document.createElement("span");
  enemy.className = "enemy";
  enemy.textContent = "SLM";
  return enemy;
}

function createFloor() {
  const floor = document.createElement("span");
  floor.className = "floor";
  floor.textContent = "___";
  return floor;
}

function updateUI() {
  Array.from(gameContainer.children).forEach((child, index) => {
    if (index === player.position) {
      child.textContent = "\\o/";
      child.className = "player";
    } else if (child.classList.contains("player")) {
      child.className = "floor";
      child.textContent = "___";
    }
  });

  document.getElementById("block-count").innerHTML =
    "block count: " + gameContainer.children.length;
  document.getElementById("player-position").innerHTML =
    "player pos: " + (player.position + 1);
  // document.getElementById('player-hp').innerHTML = 'HP: ' + player.hp;
  // document.getElementById('player-level').innerHTML = 'LVL: ' + player.level;
}

async function movePlayer() {
  if (fighting) return;

  const nextTile = gameContainer.children[player.position + 1];

  if (nextTile && nextTile.classList.contains("enemy")) {
    fighting = true;
    clearInterval(movementInterval);
    await fight(
      player,
      gameContainer,
      player.position + 1,
      updateUI,
      resetGame
    );
    fighting = false;
    if (!player.isDead()) movementInterval = setInterval(movePlayer, 300);
    return;
  }

  if (player.position < totalFloors - 1) {
    player.move();
    updateUI();
  } else {
    clearInterval(movementInterval);
    goButton.disabled = false;
    goButton.innerHTML = "GO";
    player.position = 0;
    updateUI();
  }
}

goButton.onclick = function () {
  resetGame();
  movementInterval = setInterval(movePlayer, 300);
  goButton.disabled = true;
  goButton.innerHTML = "WAIT";
};

initGame();
