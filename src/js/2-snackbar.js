import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form')

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const delay = Number(formEl.elements.delay.value);
    const state = formEl.elements.state.value;
    const isFulfiled = state === 'fulfilled';

    createPromise(delay, isFulfiled);
});

function createPromise(delay, isFulfiled) {
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            (isFulfiled) ? res() : rej();
        })
    }, delay);


    promise.then(() => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight'
        });
    }).catch(() => {
        iziToast.warning({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight'
        });
    })
}