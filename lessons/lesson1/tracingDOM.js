// Write a JavaScript function that takes an element's id and returns
// the DOM tree of the element in a two-dimensional array. The first
// subarray contains the element and its siblings, the second contains
// the parent of the element and its siblings, so on and so forth, all
// the way up to the "grandest" parent. Assume that thegrandest parent
// is the element with an id of "1". Use the following HTML and test
// cases to test your code:
/*
Problem:
input: elements id as a number
output: an array of arrays. the first array has the element and its subarrays.
all the arrays after have the element and all of its siblings. All the way up
to the "grandest parent".
rules:
  - elements have numbered ids starting at 1 and going down

Exmaples:
SEE CODE


Data strucutres / algorithm:
node = getelementbyID(String(id))
declare result as empty array
id = input

while id !== 1
  node = getparent element of node
  id = node.id
  push getsiblings onto result array

return reuslt array


function getSiblings(id)
  node = getelementbyID(String(id))
  declare empty array

  get parent element
  get all the children elements of the parent
  iterate through children
    push each tagname onto the result array

  return result array
*/
function domTreeTracer(id) {
  let node = document.getElementById(String(id));
  let result = [];
  id = node.getAttribute('id');

  while (node.tagName !== 'BODY') {
    node = node.parentElement;
    id = node.getAttribute('id');
    result.push(getSiblings(node));
  }

  return result;
}

function getSiblings(node) {
  let children = node.children;
  let result = [];
  
  Array.prototype.forEach.call(children, child => {
    result.push(child.tagName);
  });
  
  return result;
}

console.log(domTreeTracer(1));
// [["ARTICLE"]]

console.log(domTreeTracer(2));
// [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]

console.log(domTreeTracer(22));
// [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"],
// ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
