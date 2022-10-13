const timeMax = 10.00;
let timeInterval;

class Game {
    constructor() {
        this.score = 0;
        this.running = false;
        this.curInput;
    }

    start() {
        console.log("Hah.")
    }

    countdown(ver) {

    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
    }

    resetScore() {
        this.score = 0;
    }

    changeInput() {
        this.curInput = Math.floor(Math.random() * (40 - 37 + 1) + 37);
    }

    getCurInput() {
        return this.curInput;
    }
}
const app = new Game();

// console.log(app.getScore());
// app.incrementScore();
// console.log(app.getScore());

