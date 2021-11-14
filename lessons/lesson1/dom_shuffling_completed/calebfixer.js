let header = document.querySelectorAll('header')[1];
let main = document.querySelector('main');
let title = document.querySelector('main h1');
let [figure1, figure2] = [...document.querySelectorAll('figure')];
let [caption1, caption2] = [...document.querySelectorAll('figure figcaption')]
let article = document.querySelector('article');

header.insertBefore(title, header.children[0]);
document.body.insertBefore(header, main);
article.appendChild(figure2);
article.appendChild(figure1);
figure1.appendChild(caption2);
figure2.appendChild(caption1);