/*
Problem:
input: start index (parent node's id attribute), end index (innermost child node's id)
output: an array of tagnames

 - only element nodes
 - only elements with body as the ancestor
 - if the id is not inthe dom return undefined
 - if the path is not feasable return undefined


starting at end index get all nodes moveing up, until the id of the current index
is equal to the first input


Examples:
SEE CODE


Data Structures / Algorithm:
current node get the node of the second id, if it doesn't exist return undefined
create result array that is empty

while current currentNode.nodetag !== html
  push the nodetaf of the current node into the array
  set the current node to currentNode.parent


return the result array
*/

function sliceTree(startIndx, endIndx) {
  let currentNode = document.getElementById(String(endIndx));
  if (!currentNode) return undefined;
  
  let result = [currentNode.tagName];

  while (currentNode.getAttribute('id') !== String(startIndx)) {
    currentNode = currentNode.parentElement;
    result.unshift(currentNode.tagName);

    if (currentNode.tagName === 'HTML') {
      return undefined;
    }
  } 

  return result;
}


 console.log(sliceTree(1, 4));
 // ["ARTICLE", "HEADER", "SPAN", "A"]
 console.log(sliceTree(1, 76));
 // undefined
 console.log(sliceTree(2, 5));
 // undefined
 console.log(sliceTree(5, 4));
 // undefined
 console.log(sliceTree(1, 23));
 // ["ARTICLE", "FOOTER"]
 console.log(sliceTree(1, 22));
 // ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
 console.log(sliceTree(11, 19));
 // ["SECTION", "P", "SPAN", "STRONG", "A"]