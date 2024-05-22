let hrs = 0, min = 0, sec = 0, ms = 0;
let timer;
let isRunning = false;
let timings = [];

const hrsElement = document.querySelector('.stopwatch-hrs');
const minElement = document.querySelector('.stopwatch-min');
const secElement = document.querySelector('.stopwatch-sec');
const msElement = document.querySelector('.stopwatch-ms'); // Add an element for milliseconds
const startButton = document.querySelector('.stopwatch-start');
const stopButton = document.querySelector('.stopwatch-stop');
const resetButton = document.querySelector('.stopwatch-reset');
const timingList = document.querySelector('.timing-list');

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateStopwatch, 10); // Update interval to 10 milliseconds
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        addPauseTiming();
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    hrs = 0;
    min = 0;
    sec = 0;
    ms = 0;
    updateDisplay();
    timings = [];
    timingList.innerHTML = '';
});

function updateStopwatch() {
    ms += 10;
    if (ms >= 1000) {
        ms = 0;
        sec++;
        if (sec === 60) {
            sec = 0;
            min++;
            if (min === 60) {
                min = 0;
                hrs++;
            }
        }
    }
    updateDisplay();
}

function updateDisplay() {
    hrsElement.textContent = hrs.toString().padStart(2, '0');
    minElement.textContent = min.toString().padStart(2, '0');
    secElement.textContent = sec.toString().padStart(2, '0');
    msElement.textContent = ms.toString().padStart(3, '0'); // Display milliseconds
}

function addPauseTiming() {
    const timing = `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
    timings.push(timing);
    const li = document.createElement('li');
    li.textContent = timing;
    timingList.appendChild(li);
}
