// Write a function that colors a specific generation of the
// DOM tree. A generation is a set of elements that are on
// the same level of indentation. We'll be using a "styled"
// HTML for this exercise to better visualize the generations.
// You may use the .generation-color class to color the
// specific generation. You can assume that only non-negative
// integers will be provided as arguments. Following are some
// sample output to help you test your code:
/*
Problem:
input: a non negative integer
output: change the html so that the "generation" is colored
rules:
  - generation is a set of elements o nthe same level of indentaion
  - use .generation-color class to color the generation

  mental model: get an array of the generation and iterate through it, coloring the elements


Examples:
SEE Problem


Data Structures / Algorithms:
  get an array of all the parents start with body 
  set generation to 1
  dclare resultgeneration

  while generation num < input int:
    add 1 to generation
    generation = get the children of all the parents in parent array
    set parent array to currentGeneration
    
  loop through the generation
    set the add generation-color to the class

get children (parents)
  result array

  iterate through parents map
    return the chilren
  flaten array

  return result

*/


function colorGeneration(int) {
  let parents = [document.getElementById('1')];
  let generation = 1;

  while (generation < int) {
    generation += 1;
    parents = getChildren(parents)
  }

  changeColor(parents);
}

function changeColor(elements) {
  elements.forEach(element => {
    element.classList.add('generation-color');
  });
}

function getChildren(parents) {
  return parents.flatMap(parent => Array.prototype.slice.call(parent.children));
}