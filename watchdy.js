let timer;
let isRunning = false;
let startTime;
let pausedTime = 0;

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - pausedTime;
        timer = setInterval(updateTimer, 10);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        pausedTime = Date.now() - startTime;
    }
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    pausedTime = 0;
    document.querySelector('.timer-Display').textContent = '00 : 00 : 00 : 00';
}

function restart() {
    reset();
    start();
}

function lap() {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formattedTime;
    document.querySelector('.laps').appendChild(lapItem);
}

function resetLap() {
    const lapsContainer = document.querySelector('.laps');
    while (lapsContainer.firstChild) {
        lapsContainer.removeChild(lapsContainer.firstChild);
    }
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    document.querySelector('.timer-Display').textContent = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        pad(hours) +
        ' : ' +
        pad(minutes) +
        ' : ' +
        pad(seconds) +
        ' : ' +
        pad(milliseconds)
    );
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}
