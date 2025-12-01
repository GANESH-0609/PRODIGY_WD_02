let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

function updateTime() {
    const time = performance.now() - startTime + elapsedTime;

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    document.getElementById("display").textContent =
        `${String(hours).padStart(2,'0')}:` +
        `${String(minutes).padStart(2,'0')}:` +
        `${String(seconds).padStart(2,'0')}.` +
        `${String(milliseconds).padStart(3,'0')}`;
}

document.getElementById("start").addEventListener("click", () => {
    if (!running) {
        startTime = performance.now();
        interval = setInterval(updateTime, 10);
        running = true;
    }
});

document.getElementById("pause").addEventListener("click", () => {
    if (running) {
        clearInterval(interval);
        elapsedTime += performance.now() - startTime;
        running = false;
    }
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(interval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    document.getElementById("display").textContent = "00:00:00.000";
    document.getElementById("laps").innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
    if (!running) return;
    const lapTime = document.getElementById("display").textContent;
    const li = document.createElement("li");
    li.textContent = lapTime;
    document.getElementById("laps").appendChild(li);
});
