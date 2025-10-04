export class Player {
    
    constructor(position) {
        this.position = position;
    }
    move() {
        this.position++;
        return this.position;
    }
}