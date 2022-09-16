import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

let finishTime = null;
startBtn.addEventListener('click', () => {
  timer.start();
});
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finishTime = selectedDates[0];
    if (finishTime < Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      console.log(selectedDates[0]);
    }

    return finishTime;
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.intId = null;
    this.onTick = onTick;
  }

  start() {
    input.disabled = true;
    startBtn.disabled = true;
    this.intId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finishTime - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      const time = { days, hours, minutes, seconds };

      this.onTick(time);
      if (
        days === '00' &&
        hours === '00' &&
        minutes === '00' &&
        seconds === '00'
      ) {
        clearInterval(this.intId);
        input.disabled = false;
        return console.log('Time os over!');
      }
    }, 1000);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: updateTimerInterface,
});

function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
