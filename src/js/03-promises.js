import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(delay.value);
  const step = Number(step.value);
  const amount = Number(amount.value);

  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    createPromise(position, delay).then(Notify.success).catch(Notify.failure);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay} ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay} ms`);
      }
    }, delay);
  });
}
