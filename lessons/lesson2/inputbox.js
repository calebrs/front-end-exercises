document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  let cursorInterval;

  function addFocused(event) {
    event.preventDefault();
    event.currentTarget.classList.add('focused');
    
    if (!cursorInterval) {
      cursorInterval = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);
    }
  }

  function removeFocus(event) {
    event.preventDefault();
    if (!event.target.classList.contains('text-field')) {
      textField.classList.remove('focused');
      clearInterval(cursorInterval);
      textField.classList.remove('cursor');
    }
  }

  function addKeyToBox(event) {
    event.preventDefault();
    if (textField.classList.contains('focused')) {
      if (event.key === 'Backspace') {
        content.textContent = content.textContent.slice(0, content.textContent.length - 1);
      } else if (event.key.length === 1) {
        content.textContent += event.key;
      }
    }
  }


  textField.addEventListener('click', addFocused);
  document.addEventListener('keydown', addKeyToBox);
  document.addEventListener('click', removeFocus);

});