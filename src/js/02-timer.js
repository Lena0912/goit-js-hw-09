import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    const now = new Date();
    const difference = selectedDate - now;
    startButton.removeAttribute('disabled');
    input.setAttribute('disabled', 'true');
    startButton.addEventListener('click', () => {
      const timerInterval = setInterval(() => {
        const timeLeft = new Date(difference - (new Date() - now));
        const timeLeftMs = timeLeft.getTime();
        if (timeLeftMs <= 0) {
          clearInterval(timerInterval);
          daysElement.textContent = '00';
          hoursElement.textContent = '00';
          minutesElement.textContent = '00';
          secondsElement.textContent = '00';
          startButton.removeAttribute('disabled');
          input.removeAttribute('disabled');
        } else {
          const timeLeftObj = convertMs(timeLeftMs);
          daysElement.textContent = addLeadingZero(timeLeftObj.days);
          hoursElement.textContent = addLeadingZero(timeLeftObj.hours);
          minutesElement.textContent = addLeadingZero(timeLeftObj.minutes);
          secondsElement.textContent = addLeadingZero(timeLeftObj.seconds);
        }
      }, 1000);
      startButton.setAttribute('disabled', 'true');
      input.setAttribute('disabled', 'true');
    });
  },
};
flatpickr('#datetime-picker', options);