import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const body = document.querySelector('body');
console.log(body);
body.style.fontFamily = 'Montserat';
body.style.fontSize = '16px';
body.style.color = '#2E2F42';

const form = document.querySelector('.form');
console.log(form);
form.style.display = 'flex';
form.style.flexWrap = 'wrap';
form.style.justifyContent = 'center';
form.style.flexDirection = 'column';


const fieldset = document.querySelector('fieldset');
console.log(fieldset);
fieldset.style.width = '360px';
fieldset.style.height = '64px';
fieldset.style.padding = '0px';
fieldset.style.margin = '24px 0px 0px 0px';
fieldset.style.border = '1px solid #808080';
fieldset.style.borderRadius = '4px';
fieldset.style.display = 'flex';
fieldset.style.justifyContent = 'center';
fieldset.style.alignItems = 'center';
fieldset.style.gap = '40px';

const button = document.querySelector('button');
console.log(button);
button.style.width = '360px';
button.style.height = '40px';
button.style.padding = '0px';
button.style.marginTop = '24px';
button.style.backgroundColor = '#4E75FF';
button.style.border = 'none';
button.style.color = '#FFFFFF';
button.style.fontFamily = 'Montserat';
button.style.fontSize = '16px';


const inputDelay = document.querySelector('input[name="delay"]');
console.log(inputDelay);
inputDelay.style.width = '360px';
inputDelay.style.height = '40px';
inputDelay.style.display = 'flex';
inputDelay.style.flexDirection = 'column';
inputDelay.style.marginTop = '8px'

document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value);
  const state = event.target.elements.state.value;
  const submitButton = event.target.querySelector('button[type="submit"]');

   submitButton.classList.add('submitted');
    
    button.style.backgroundColor = '#6C8CFF';
  createPromise(delay, state)
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}



