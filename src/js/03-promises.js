import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const toDelay = document.querySelector('input[name="delay"]');
const toStep = document.querySelector('input[name="step"]');
const toAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(toDelay.value);
  const step = Number(toStep.value);
  const amount = Number(toAmount.value);

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
