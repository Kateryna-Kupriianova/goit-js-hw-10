import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.querySelector('#datetime-picker');
dateTimePicker.style.width = '272px';
dateTimePicker.style.height = '40px';
dateTimePicker.style.fontSize = '16px';
dateTimePicker.style.color = '#2E2F42';
dateTimePicker.style.backgroundColor = 'FFFFFF';
dateTimePicker.style.border = '1px solid #000000';
dateTimePicker.style.boxShadow = '0 4px 8px #808080';
dateTimePicker.style.borderRadius = '4px';
dateTimePicker.style.marginBottom = '10px';

const startButton = document.querySelector('button[data-start]');
startButton.style.fontSize = '16px';
startButton.style.padding = '10px 20px';
startButton.style.backgroundColor = '#CFCFCF';
startButton.style.border = 'none';
startButton.style.borderRadius = '5px';
startButton.style.cursor = 'default';
startButton.style.color = '989898';
startButton.style.width = '75px';
startButton.style.height = '40px';
startButton.disabled = true;

startButton.addEventListener('mouseover', () => {
  if (!startButton.disabled)
    startButton.style.backgroundColor = "#4E75FF";
});
startButton.addEventListener('mouseout', () => {
    startButton.style.backgroundColor = "#CFCFCF";
});

let countdownInterval;
let targetDate;

startButton.addEventListener('click', () => {
    if (!targetDate) {
        iziToast.error({
            title: 'Error',
            message: 'Please select a date and time before starting the countdown',
        });
        return;
  }
  
    startButton.disabled = true;
    startButton.style.backgroundColor = '#CFCFCF';
    startButton.style.cursor = 'default';
    dateTimePicker.disabled = true;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('span[data-days]').innerText = '00';
            document.querySelector('span[data-hours]').innerText = '00';
            document.querySelector('span[data-minutes]').innerText = '00';
            document.querySelector('span[data-seconds]').innerText = '00';
            iziToast.success({
                title: 'Countdown finished',
                message: 'The event has started!',
            });
            dateTimePicker.disabled = false;
            startButton.disabled = true;
            startButton.style.backgroundColor = '#CFCFCF';
            startButton.style.cursor = 'default';
            return;
      }
        const { days, hours, minutes, seconds } = convertMs(distance);
        document.querySelector('span[data-days]').innerText = String(days).padStart(2, '0');
        document.querySelector('span[data-hours]').innerText = String(hours).padStart(2, '0');
        document.querySelector('span[data-minutes]').innerText = String(minutes).padStart(2, '0');
        document.querySelector('span[data-seconds]').innerText = String(seconds).padStart(2, '0');
    }, 1000);
});

const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.justifyContent = 'flex-start';
timer.style.gap = '24px';
timer.style.fontFamily = 'Montserrat';

const fields = document.querySelectorAll('.field');
fields.forEach(field => {
    field.style.textAlign = 'center';
});

const values = document.querySelectorAll('.value');
values.forEach(value => {
    value.style.display = 'block';
    value.style.fontSize = '40px';
    value.style.color = '#2e2f42';
});

const labels = document.querySelectorAll('.label');
labels.forEach(label => {
    label.style.fontSize = '16px';
    label.style.color = '#2E2F42';
    label.style.textTransform = 'uppercase';
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      targetDate = selectedDates[0];
      if (targetDate && targetDate.getTime() > Date.now()) {
        startButton.disabled = false;
        startButton.style.backgroundColor = '#4E75FF';
        startButton.style.cursor = 'pointer';
      } else {
        startButton.disabled = true;
        startButton.style.backgroundColor = '#CFCFCF';
        startButton.style.cursor = 'default';
        iziToast.error({
          title: 'Invalid Date',
          message: 'Please select a future date and time.',
        });
      }
    },
};

flatpickr("#datetime-picker", options);

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
