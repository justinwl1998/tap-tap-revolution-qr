const timeLeftMax = 10.00;
const startButton = document.querySelector('#startGame');
const timer = document.querySelector('#timer');
const gameWindow = document.querySelector('#gameWindow');
const inputViewer = document.querySelector('#inputViewer');
const scoreViewer = document.querySelector('#score');
let timeLeft;
let timeInterval;

class Game {
    constructor() {
        this.score = 0;
        this.running = false;
        this.curInput;
    }

    start() {
        console.log("Hah.")
        gameWindow.focus();
        this.score = 0;
        scoreViewer.textContent = this.score;
        this.running = true;
        startButton.disabled = true;
        this.changeInput();
        startTimer();
    }

    isGameRunning() {
        return this.running;
    }

    endGame() {
        this.running = false;
    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
        scoreViewer.textContent = this.score;
    }

    resetScore() {
        this.score = 0;
    }

    changeInput() {
        this.curInput = Math.floor(Math.random() * (40 - 37 + 1) + 37);

        switch(this.curInput) {
            case 37:
                inputViewer.textContent = 'LEFT';
                break;
            case 38:
                inputViewer.textContent = 'UP';
                break;                
            case 39:
                inputViewer.textContent = 'RIGHT';
                break;
            case 40:
                inputViewer.textContent = 'DOWN';
                break;
        
        }
    }

    getCurInput() {
        return this.curInput;
    }

    checkInput(userInput) {
        return userInput === this.curInput;
    }
}

const startTimer = () => {
    timeLeft = timeLeftMax - (0.50 * Math.min(app.getScore(), 19));
    console.log("Time limit is: " + timeLeft)
    timer.textContent = timeLeft;

    timeInterval = setInterval(function() {
        timeLeft = (timeLeft - 0.01).toFixed(2);
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            // send end game flag
            app.endGame();

            // prevent any future inputs if this case happens
            clearInterval(timeInterval);
            timer.textContent = "baba bboey";
            startButton.disabled = false;
            isRunning = false;
            //document.querySelector('#debug').textContent = "game over, man"
            console.log("Your score was: " + app.getScore());
        }
    }, 10);
}

gameWindow.onkeydown = function(e) {
    if (!app.isGameRunning()) {
        return;
    }
    // this will be the input handler
    const key = e.keyCode ? e.keyCode : e.which;

    if (key < 37 || key > 40) {
        return;
    }

    if (app.checkInput(key)) {
        console.log("wow you got it");
        app.incrementScore();
        clearInterval(timeInterval);
        app.changeInput();
        startTimer();
    }
    else {
        console.log("WRONG");
        timeLeft = 0;
    }
}

const app = new Game();


