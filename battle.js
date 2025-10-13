import { Enemy } from './enemy.js';


export function fight(player, gameContainer, enemyIndex, updateUI, onDeath) {
    return new Promise((resolve) => {
        const enemy = new Enemy("slime");
        let fightInterval = null;
        const enemyTile = gameContainer.children[enemyIndex];
        // enemyTile.textContent = `⚔️${enemy.name}`;

        fightInterval = setInterval(() => {

            enemy.takeDamage(player.attack);
            // enemyTile.textContent = `${enemy.name}(${enemy.hp})`;

            if (enemy.isDead()) {
                clearInterval(fightInterval);
                enemyTile.className = 'floor';
                enemyTile.textContent = '___';
                player.gainXP(enemy.xp);
                updateUI();
                resolve('victory');
                return;
            }


            player.takeDamage(enemy.attack);
            updateUI();

            if (player.isDead()) {
                clearInterval(fightInterval);
                onDeath();
                resolve('death');
            }
        }, 500);
    });
}
