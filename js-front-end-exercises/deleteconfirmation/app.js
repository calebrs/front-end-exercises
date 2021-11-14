document.addEventListener('DOMContentLoaded', () => {
  let todosTemplate = Handlebars.compile(document.querySelector('#todos_template').innerHTML);
  let confirmTemplate = Handlebars.compile(document.querySelector('#confirm_template').innerHTML);
  let contextMenuTemplate = Handlebars.compile(document.querySelector('#context_menu_template').innerHTML);

  let todos = document.querySelector('#todos');
  let overlay = document.querySelector('.overlay');
  let confirmPrompt = document.querySelector('.confirm_prompt');
  let contextMenu = document.querySelector('.context_menu');

  let TodosApp = {
    addTodos() {
      todos.innerHTML = todosTemplate({ todos: this.todoItems });
    },

    openConfirmation(event) {
      event.preventDefault();

      let id = event.target.dataset.id;

      confirmPrompt.innerHTML = confirmTemplate({ id: id })
      this.turnOnPromptAndOverlay();
    },

    turnOnPromptAndOverlay() {
      overlay.style.display = 'block';
      confirmPrompt.style.display = 'block';
    },

    turnOffPromptAndOverlay() {
      overlay.style.display = 'none';
      confirmPrompt.style.display = 'none';
    },

    handleConfirmPrompt(event) {
      event.preventDefault();

      let action = event.target.getAttribute('class');
    
      if (action === "confirm_yes") {
        let id = event.target.parentElement.parentElement.dataset.id;
        let removeItem = todos.querySelector(`[data-id="${id}"]`);
        removeItem.remove();
        this.turnOffPromptAndOverlay();
      } else if (action === "confirm_no") {
        this.turnOffPromptAndOverlay();
      }
    },
    openContextMenu(event) {      
      event.preventDefault();
      
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log(x, y);

      let id = event.target.dataset.id;
      contextMenu.innerHTML = contextMenuTemplate({ id: id });
      contextMenu.style.display = "block";
      contextMenu.style.position = "relative";
      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;
      
      contextMenu.querySelector('li.remove').addEventListener('click')
    },
    closeContextMenu(event) {
      event.preventDefault();

      console.log(event.target.dataset.id);
    
      // add conditions that actually work
      if (event.target.tagName !== 'LI') {
        contextMenu.innerHTML = '';
      }
      
    },
    menuNavigation(event) {
      event.preventDefault();

      if (event.target.classList.contains('remove')) {
        
        this.openConfirmation(event);
      }
    },
    bind() {
      [...todos.querySelectorAll('.remove')].forEach(elem => elem.addEventListener('click', event => this.openConfirmation(event)));
      confirmPrompt.addEventListener('click', event => this.handleConfirmPrompt(event));
      [...todos.children].forEach(li => li.addEventListener('contextmenu', event => {
        console.log(event.clientX, event.clientY);
        this.openContextMenu(event);
      }));
      contextMenu.addEventListener('click', event => this.menuNavigation(event));
      document.addEventListener('click', event => this.closeContextMenu(event));
    },

    init() {
      this.todoItems = [
        { id: 1, title: 'Homework' },
        { id: 2, title: 'Shopping' },
        { id: 3, title: 'Calling Mom' },
        { id: 4, title: 'Coffee with John '}
      ];

      this.addTodos();
      this.bind();
    }
  }

  TodosApp.init();
});