document.addEventListener('DOMContentLoaded', () => {
  const OPERATIONS = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
  }

  let form = document.querySelector('form');
  

  form.addEventListener('submit', event => {
    event.preventDefault();

    let firstNum = Number(document.querySelector('#first-number').value);
    let secondNum = Number(document.querySelector('#second-number').value);
    let operation = OPERATIONS[document.querySelector('#operator').value];

    document.querySelector('#result').textContent = operation(firstNum, secondNum).toFixed(2);
  });
});