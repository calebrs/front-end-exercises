document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  let groceryList = {
    items: document.querySelector('#grocery-list'),

    addNewListItem(item, quantity) {
      let newItem = document.createElement('LI');
      newItem.textContent = `${quantity} ${item}`;
  
      this.items.appendChild(newItem);
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    let itemName = document.querySelector('#name').value;
    let quantity = document.querySelector('#quantity').value || 1;

    groceryList.addNewListItem(itemName, quantity);
    form.reset();
  });
});