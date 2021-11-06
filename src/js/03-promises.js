import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

const formEl = document.querySelector('form');

formEl.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick (event) {
  event.preventDefault();
  for (let i = 0; i < event.currentTarget.amount.value; i++) {
    let position = i + 1;
    let delay = Number(event.currentTarget.delay.value) + Number((event.currentTarget.step.value * i));
    createPromise(position, delay)
     .then(({ position, delay }) => {
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
     })
     .catch(({ position, delay }) => {
       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });;
  }
}

