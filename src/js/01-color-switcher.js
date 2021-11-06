 
refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
}

refs.buttonStart.addEventListener("click", onStartButtonClick);
refs.buttonStop.addEventListener("click", onStopButtonClick);

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function onStartButtonClick () {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      refs.buttonStart.setAttribute('disabled', 'disabled');
};

function onStopButtonClick () {
    clearInterval(timerId);
    refs.buttonStart.removeAttribute('disabled');
};


