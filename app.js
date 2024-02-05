let timerInterval;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

function startStop() {
    if (!timerInterval) {
        startStopButton.textContent = 'Pause';
        lapButton.disabled = false;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    } else {
        startStopButton.textContent = 'Start';
        lapButton.disabled = true;
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    startStopButton.textContent = 'Start';
    lapButton.disabled = true;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapList.innerHTML = '';
    lapTimes = [];
}

function lap() {
    const lapTime = elapsedTime;
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
