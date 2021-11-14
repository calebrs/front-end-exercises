/*
Problem:
intput: two ids of nodes in the html 
output: swap the two ids within the html
rules
 - arguments will be okay
 - return undefined if the swap is not possible
 - id has to exist
 - cannot swap nodes that are children of the other



Algorithm:
save the two nodes into variables
node1
node2
parent 1
parent 2

if valid
  use the replace function to swap the nodes


isInvalid
if one contains the other reutrn false






*/



function nodeSwap(id1, id2) {
  let node1 = document.getElementById(String(id1));
  let node2 = document.getElementById(String(id2));
  if (node1 === null || node2 === null) return undefined;

  let parent1 = node1.parentElement;
  let parent2 = node2.parentElement;

  if (!isInvalid(node1, node2)) {
    let node1Copy = node1.cloneNode(true);
    let node2Copy = node2.cloneNode(true);
    parent1.replaceChild(node2Copy, node1);
    parent2.replaceChild(node1Copy, node2);
  }

}

function isInvalid(node1, node2) {
  return (node1.contains(node2) || node2.contains(node1));
}