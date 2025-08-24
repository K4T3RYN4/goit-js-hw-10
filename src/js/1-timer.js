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
            userSelectedDate = selectedDates[0];
            buttonEl.removeAttribute('disabled')
        }
    },
};

flatpickr('#datetime-picker', options);

function startTimer() {
    if (!userSelectedDate) return;
    buttonEl.setAttribute('disabled', true);

    const timerId = setInterval(() => {
        const diff = userSelectedDate - Date.now();

        if (diff <= 0) {
            clearInterval(timerId);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(diff);

        daysEl.textContent = addLeadingZero(String(days));
        hoursEl.textContent = addLeadingZero(String(hours));
        minutesEl.textContent = addLeadingZero(String(minutes));
        secondsEl.textContent = addLeadingZero(String(seconds));
    }, 1000);
}

buttonEl.addEventListener('click', startTimer);

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


function addLeadingZero(value) {
    return value.padStart(2, '0');
}
