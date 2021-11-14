let header = document.querySelector("body > header");
let h1 = document.querySelector("main > h1");
header.insertBefore(h1, header.firstChild);
document.body.insertBefore(header, document.body.firstChild);

let [chinStickFigure, babyMopFigure] = document.querySelectorAll("figure");
let babyMopImage = chinStickFigure.querySelector("img");
let chinStickImage = babyMopFigure.querySelector("img");
chinStickFigure.insertBefore(chinStickImage, null);
babyMopFigure.insertBefore(babyMopImage, null);

let article = document.querySelector("article");
article.insertBefore(chinStickFigure, null);
article.insertBefore(babyMopFigure, null);
