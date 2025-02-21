document.addEventListener("DOMContentLoaded", () => {
    let focusTime = 25 * 60; // 25 minutos en segundos
    let breakTime = 5 * 60; // 5 minutos en segundos
    let timeLeft = focusTime;
    let isRunning = false;
    let isFocusMode = true;
    let interval;

    const timerDisplay = document.getElementById("timer");
    const modeDisplay = document.getElementById("mode");
    const startBtn = document.getElementById("start");
    const resetBtn = document.getElementById("reset");
    const adjustBtn = document.getElementById("adjust");
    const settingsModal = document.getElementById("settings");
    const saveSettingsBtn = document.getElementById("saveSettings");
    const closeSettingsBtn = document.getElementById("closeSettings");

    function updateTimerDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startBtn.textContent = "Pausar";
            interval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(interval);
                    isRunning = false;
                    notifyUser();
                    switchMode();
                    startTimer();
                }
            }, 1000);
        } else {
            isRunning = false;
            startBtn.textContent = "Iniciar";
            clearInterval(interval);
        }
    }

    function resetTimer() {
        clearInterval(interval);
        isRunning = false;
        timeLeft = isFocusMode ? focusTime : breakTime;
        startBtn.textContent = "Iniciar";
        updateTimerDisplay();
    }

    function switchMode() {
        isFocusMode = !isFocusMode;
        timeLeft = isFocusMode ? focusTime : breakTime;
        modeDisplay.textContent = isFocusMode ? "Enfoque" : "Descanso";
        updateTimerDisplay();
    }

    function notifyUser() {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(isFocusMode ? "¡Tiempo de Descanso!" : "¡Hora de Enfocarse!");
        }
        navigator.vibrate(500);
    }

    function openSettings() {
        settingsModal.style.display = "flex";
    }

    function closeSettings() {
        settingsModal.style.display = "none";
    }

    function saveSettings() {
        focusTime = parseInt(document.getElementById("focusTime").value) * 60;
        breakTime = parseInt(document.getElementById("breakTime").value) * 60;
        resetTimer();
        navigator.vibrate(200);
        closeSettings();
    }

    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);
    adjustBtn.addEventListener("click", openSettings);
    saveSettingsBtn.addEventListener("click", saveSettings);
    closeSettingsBtn.addEventListener("click", closeSettings);
    updateTimerDisplay();
});
