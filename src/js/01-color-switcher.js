const elements = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}

elements.stop.disabled = true;
elements.start.addEventListener('click', clickStart);
elements.stop.addEventListener('click', clickStop);

function changeBodyColor() {
    const bodyColor = getRandomHexColor();
    elements.body.style.backgroundColor = bodyColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function clickStart() {
    elements.stop.disabled = false;
    elements.start.disabled = true;
    timerId = setInterval(() => {
        changeBodyColor();
    }, 1000);
}

function clickStop() {
    elements.start.disabled = false;
    elements.stop.disabled = true;
    clearInterval(timerId);
}
