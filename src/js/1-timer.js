import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const buttonEl = document.querySelector('[data-start]');

let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates[0] < new Date()) {
            iziToast.warning({
                title: 'Warning!',
                message: 'Please choose a date in the future',
                position: 'topRight'
            });
        } else {
            buttonEl.removeAttribute('disabled')
        }
    },
};

flatpickr('#datetime-picker', options);

function startTimer() {
    if (!userSelectedDate) return;

    const intervalId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const time = convertMs(diff);
        daysEl.textContent = String(time.days).padStart(2, '0');
        hoursEl.textContent = String(time.hours).padStart(2, '0');
        minutesEl.textContent = String(time.minutes).padStart(2, '0');
        secondsEl.textContent = String(time.seconds).padStart(2, '0');
    }, 1000);
}

buttonEl.addEventListener('click', startTimer)

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

