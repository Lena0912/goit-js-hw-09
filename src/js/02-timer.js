import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
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

    const timerInterval = setInterval(() => {
      const timeLeft = new Date(difference - (new Date() - now));
      const days = timeLeft.getUTCDate() - 1;
      const hours = timeLeft.getUTCHours();
      const minutes = timeLeft.getUTCMinutes();
      const seconds = timeLeft.getUTCSeconds();

      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
      }
    }, 1000);
  },
};

flatpickr('#datetime-picker', options);