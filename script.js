let countdown;
let isPaused = false;
let isOnBreak = false;
let timeLeft = 25 * 60;
let breakTime = 5 * 60;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

function startTimer() {
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(countdown);
            if (!isOnBreak) {
                message.textContent = "¡Tiempo terminado! Descanso de 5 minutos.";
                isOnBreak = true;
                timeLeft = breakTime;
                startTimer();
            } else {
                message.textContent = "¡Descanso terminado! Volver a trabajar.";
                isOnBreak = false;
                timeLeft = 25 * 60;
                startTimer();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function pauseTimer() {
    clearInterval(countdown);
    isPaused = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = isOnBreak ? breakTime : 25 * 60;
    isPaused = false;
    isOnBreak = false;
    message.textContent = "";
    updateTimerDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
}

startButton.addEventListener("click", () => {
    if (!isPaused) {
        startTimer();
    }
    startButton.disabled = true;
    pauseButton.disabled = false;
});

pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateTimerDisplay();
