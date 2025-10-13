export class Enemy {
    constructor(type = "slime") {
        this.type = type;
        this.setStatsByType(type);
    }

    setStatsByType(type) {
        switch (type) {
            case "slime":
                this.name = "SLM";
                this.hp = 10;
                this.attack = 2;
                this.xp = 5;
                break;
            case "goblin":
                this.name = "GBL";
                this.hp = 20;
                this.attack = 4;
                this.xp = 10;
                break;
            default:
                this.name = "???";
                this.hp = 5;
                this.attack = 1;
                this.xp = 1;
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
    }

    isDead() {
        return this.hp <= 0;
    }
}
