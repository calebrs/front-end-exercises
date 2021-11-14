document.addEventListener('DOMContentLoaded', () => {
  let thumbnails = document.querySelector('#thumbnails');

  function changeImage(event) {
    event.preventDefault();
    thumbnails.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
    let newTopImage = event.target.cloneNode(true);
    let currentTopImage = document.querySelector('.top');
    newTopImage.setAttribute('class', 'top');
    currentTopImage.replaceWith(newTopImage);

  }

  [...thumbnails.children].forEach(image => image.addEventListener('click', changeImage));
});