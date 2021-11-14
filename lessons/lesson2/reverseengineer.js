document.querySelector('html').addEventListener('click', (event) => {
  let container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});

// document.querySelector('#container').addEventListener('click', event => {
//   event.stopPropagation();
// });