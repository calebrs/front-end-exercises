document.addEventListener('DOMContentLoaded', (e) => {

  function getRandomNum() {
    return Math.floor(Math.random() * 100) + 1;
  }

  let answer = getRandomNum();
  let form = document.querySelector('form');
  let link = document.querySelector('a');
  let messageDisplay = document.querySelector('p');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let guess = parseInt(document.querySelector('#guess').value, 10);
    let message;

    if (/[^0-9]/g.test(guess)) {
      message = 'Please enter a valid number';
    }

    if (guess > answer) {
      message = `The answer is lower than ${guess}`;
    } else if (guess < answer) {
      message = `The answer is higher than ${guess}`;
    } else if (guess === answer) {
      message = `You guessed the correct number!`
    }

    
    messageDisplay.textContent = message;
  });

  link.addEventListener('click', (event) => {
    event.preventDefault();
    answer = getRandomNum();
    messageDisplay.textContent = 'Guess a number from 1 to 100';
  });
});

// left off on probelm 6