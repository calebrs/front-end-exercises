/*
create ilter 1 object
create filter 2 object

reate a deep clone of id animals element
create deep clone of the selection-filters
selet original selection-filters
select animals elements

add event listenter when the dropbox item changes
  get the value of the box
  get the corresponding values from the filter object
  filter the children of the deep clone
  replace the original with the filtered deep clone

add event listenter when the animals box changes
  get the value of the box
  get the corresponding values from the filter object
  filter the children of the deep clone
  replace the original with the filtered deep clone
  
 when the clear button is clicked
  replace the originals with the deep copies
*/

document.addEventListener('DOMContentLoaded', () => {
  let classFilter = {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
  }
  let animalFilter = {
    Bear: 	['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: 	['Vertebrate', 'Cold-blooded'],
    Whale: 	['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: 	['Vertebrate', 'Cold-blooded'],
    Ostrich: 	['Vertebrate', 'Warm-blooded', 'Bird']
  }
  
  let classificationClone = document.querySelector('#animal-classifications').cloneNode(true);
  let animalClone = document.querySelector('#animals').cloneNode(true);
  let classifications = document.querySelector('#animal-classifications');
  let animals = document.querySelector('#animals');
  let button = document.querySelector('#clear');
  
  classifications.addEventListener('change', (event) => {
    let tempAnimalClone = animalClone.cloneNode(true);
    let value = classifications.value;
    let filteredList = Array.prototype.filter.call(tempAnimalClone.children, animal => classFilter[value].includes(animal.value));
    animals.replaceChildren(...filteredList);
  });
  
  animals.addEventListener('change', (event) => {
    let tempClassClone = classificationClone.cloneNode(true);
    let value = animals.value
    let filteredList = Array.prototype.filter.call(tempClassClone.children, className => animalFilter[value].includes(className.value));
    classifications.replaceChildren(...filteredList);
  });
  
  button.addEventListener('click', (event) => {
    event.preventDefault();
    let tempClassClone = classificationClone.cloneNode(true);
    let tempAnimalClone = animalClone.cloneNode(true);
    animals.replaceChildren(...tempAnimalClone.children);
    classifications.replaceChildren(...tempClassClone.children);
    animals.value = 'Animals';
    classifications.value = 'Classifications';
  });
});