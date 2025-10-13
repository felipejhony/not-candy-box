export class Player {
    
   constructor(position = 0) {
        this.position = position;
        this.maxHP = 20;
        this.hp = this.maxHP;
        this.attack = 3;
        this.xp = 0;
        this.level = 1;
    }

    move() {
        this.position++;
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp < 0) this.hp = 0;
    }

    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHP);
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.level * 10) {
            this.level++;
            this.attack++;
            this.maxHP += 5;
            this.hp = this.maxHP;
        }
    }

    isDead() {
        return this.hp <= 0;
    }

    reset() {
        this.position = 0;
        this.hp = this.maxHP;
        this.xp = 0;
        this.level = 1;
        this.attack = 3;
    }
}