/*
on navigation link click: scroll to article in main and add highlight class to it. Remove highlight class from everything else.

if the article is clicked add the highlight to it

if click anywhere else add highlihight element to main and remove if from everything else


algorithm:
create add highlight class function 

remove highlight class from everything function

scroll to function 
scroll into view funciton

*/
let main = document.querySelector('main');
let articles = document.querySelectorAll('article');
let highlightableElems = [...articles].concat(main);

function highlightElem(elem) {
  if (elem) elem.setAttribute('class', 'highlight');
}

function removeAllHighlights() {
  highlightableElems.forEach(elem => {
    elem.classList.remove('highlight');
  });
}

function onClickHighlight(event) {
  event.stopPropagation();
  removeAllHighlights();
  highlightElem(this);
}

[...highlightableElems].forEach((elem) => {
  elem.addEventListener('click', onClickHighlight);
});

document.querySelector('header').addEventListener('click', (event) => {
  event.preventDefault();
  let link = event.target;
  let articleNum = link.textContent.slice(-1);
  let article = document.getElementById(`article-${articleNum}`);
  removeAllHighlights();
  highlightElem(article);
  article.scrollIntoView();
});

document.addEventListener('click', (event) => {
  let select = event.target;
  console.log(select);
});