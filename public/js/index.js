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
        setTimeout(function () { inputViewer.style.opacity = 0; }, 250);
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
        inputViewer.style.transition = "opacity 0s";
        inputViewer.style.opacity = 1;
    
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

        // todo: make this fade after a short time to make some difficulty
        // issues: what if you pre-emptively input it so fast that it causes the next next input to not display

        // if (this.getScore() < 10) {
        //     setTimeout(function () { inputViewer.style.transition = "opacity 0.5s"; }, 500);
        //     setTimeout(function () { inputViewer.style.opacity = 0; }, 550);
        // }
        // else {
        //     setTimeout(function () { inputViewer.style.transition = "opacity 0.1s"; }, 250);
        //     setTimeout(function () { inputViewer.style.opacity = 0; }, 300);
        // }
    }

    getCurInput() {
        return this.curInput;
    }

    checkInput(userInput) {
        return userInput === this.curInput;
    }

    //todo : add function for posting new high scores if it is greater than a user's current high score
}

const startTimer = () => {
    timeLeft = timeLeftMax - (0.50 * Math.min(app.getScore(), 18));
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
    else {
        e.preventDefault();
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

const test = async () => {
    const res = await fetch('/api/score', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        let userScore = await res.json();
        console.log(userScore);
    }
    else {
        alert(res.statusText);
    }    
}

document.querySelector('#testQuery')
    .addEventListener("click", test);


