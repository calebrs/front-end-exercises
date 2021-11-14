document.addEventListener('DOMContentLoaded', () => {
  let exoticAnimals = document.querySelector('#exotic_animals');
  let timeOut;

  exoticAnimals.addEventListener('mouseover', event => {
    timeOut = setTimeout(() => {
      if (event.target.tagName === 'IMG') {
        let caption = event.target.parentElement.lastElementChild;
        caption.classList.remove('hidden');
      }
    }, 2000);
  });

  exoticAnimals.addEventListener('mouseout', event => {
    clearTimeout(timeOut);

    if (event.target.tagName === 'IMG') {
      let caption = event.target.parentElement.lastElementChild;
      caption.classList.add('hidden');
    }
  });
});