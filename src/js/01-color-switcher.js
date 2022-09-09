const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtn() {
  body.style.backgroundColor = getRandomHexColor();
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtn() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
