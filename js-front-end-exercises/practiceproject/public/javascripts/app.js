document.addEventListener('DOMContentLoaded', () => {

  class ContactManager {
    constructor() {
      this.contacts = [];
      this.contactsTemplate = null;
      this.editId = null;
      this.search = document.querySelector('#search');
      this.addForm = document.querySelector('#add_contact_form');
      this.editForm = document.querySelector('#edit_contact_form');
      this.filterBoxes = document.querySelectorAll('#filter input');

      this.createTemplates();
      this.getContacts();
      this.bind();

      new FormValidation();
    }

    createTemplates() {
      this.contactsTemplate = Handlebars.compile(document.querySelector('#contacts_template').innerHTML);
      Handlebars.registerPartial('contact_template', document.querySelector('#contact_template').innerHTML);
    }

    renderContacts(contacts) {
      let contactsDiv = document.querySelector('.contacts');

      if (this.contacts.length === 0) {
        contactsDiv.innerHTML = '<h2>There are no contacts</h2><button class="add_contact">Add Contact</button>';
      } else if (contacts.length === 0) {
        contactsDiv.innerHTML = `<h2>There are no contacts that match ${this.search.value}</h2>`
      } else {
        contactsDiv.innerHTML = this.contactsTemplate({ contacts: contacts });
      }
    }

    getContacts() {
      let href = 'http://localhost:3000/api/contacts';

      fetch(href, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
          this.contacts = json;
          this.renderContacts(this.contacts);
        });
    }

    handleClick(event) {
      if (event.target.classList.contains('add_contact')) {
        this.addContactForm();
      } else if (event.target.classList.contains('delete')) {
        this.deleteContact(event);
      } else if (event.target.classList.contains('edit')) {
        this.editId = event.target.parentElement.dataset.id;
        this.addEditForm();
        this.fillContactForm(event);
      }
    }

    deleteContact(event) {
      event.preventDefault();

      let name = event.target.parentElement.querySelector('.name').innerText;
      let deleteContact = confirm(`Do you want to delete ${name} from your contacts?`);

      if (deleteContact) {
        let id = event.target.parentElement.dataset.id;
        let href = `http://localhost:3000/api/contacts/${id}`;
        fetch(href, { method: 'DELETE' })
          .then( _ => {
            this.contacts = this.contacts.filter(contact => contact.id !== Number(id));
            this.renderContacts(this.contacts);
          });
      }
    }

    editContact(event) {
      event.preventDefault();

      if (this.isValidForm(this.editForm)) {
        let formData = new FormData(this.editForm);
        let queryString = new URLSearchParams(formData).toString();
        let href = this.editForm.getAttribute('action') + this.editId;
        let method = this.editForm.getAttribute('method');

        fetch(href, {
              method: method,
              body: queryString,
              headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              })
          .then(response => response.json())
          .then(json => {
            this.contacts = this.contacts.map(contact => {
              if (contact.id === Number(this.editId)) {
                return json;
              } else {
                return contact;
              }
            });
            this.renderContacts(this.contacts);
            this.removeEditForm(event);
            this.editForm.reset();
          });
      }
    }

    fillContactForm(event) {
      event.preventDefault();

      let contact = this.contacts.filter(contact => String(contact.id) === event.target.parentElement.dataset.id)[0];
      this.editForm.querySelector('[name="full_name"]').value = contact.full_name;
      this.editForm.querySelector('[name="email"]').value = contact.email;
      this.editForm.querySelector('[name="phone_number"]').value = contact.phone_number;
    }

    addEditForm() {
      document.querySelector('#edit').classList.remove('hidden');
    }

    removeEditForm(event) {
      event.preventDefault();

      document.querySelector('#edit').classList.add('hidden');
      this.editForm.reset();
      this.removeErrorMessages();
    }

    addContactForm() {
      document.querySelector('#add').classList.remove('hidden');
    }

    removeContactForm(event) {
      event.preventDefault();

      document.querySelector('#add').classList.add('hidden');
      this.addForm.reset();
      this.removeErrorMessages();
    }

    removeErrorMessages() {
      let messages = document.querySelectorAll('.error_message, .form_errors');
      let inputs = document.querySelectorAll('input');
      [...messages].forEach(message => message.innerHTML = '');
      [...inputs].forEach(input => input.classList.remove('invalid_field'));
    }

    removeFilterTags() {
      [...this.filterBoxes].forEach(box => {
        box.checked = false;
      });
    }

    addNewContact(event) {
      event.preventDefault();

      if (this.isValidForm(this.addForm)) {
        let formData = new FormData(this.addForm);
        let queryString = new URLSearchParams(formData).toString();
        let href = this.addForm.getAttribute('action');
        let method = this.addForm.getAttribute('method');

        fetch(href, {
              method: method,
              body: queryString,
              headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              })
          .then(response => response.json())
          .then(json => {
            this.contacts.push(json);
            this.renderContacts(this.contacts);
            this.removeContactForm(event);
            this.addForm.reset();
          });
      }
    }

    searchChange(event) {
      let query = event.currentTarget.value;
      this.removeFilterTags();
      
      let filteredContacts = this.contacts.filter(contact => {
        let contactName = contact.full_name.toLowerCase();
        return contactName.includes(query.toLowerCase());
      });

      this.renderContacts(filteredContacts);
    }

    isValidForm(form) {
      let inputs = form.querySelectorAll('input');
      return [...inputs].every(input => input.validity.valid);
    }

    submitFilters(event) {
      event.preventDefault();

      let filterValues = this.getCheckedValues();
      let filteredContacts;

      if (filterValues.length === 0) {
        filteredContacts = this.contacts;
      } else {
        filteredContacts = [...this.contacts].filter(contact => {
          if (typeof contact.tags === 'string') contact.tags = [contact.tags];

          if (contact.tags) {
            return contact.tags.some(tag => filterValues.includes(tag));
          } else {
            return false;
          }
        });
      }

      this.renderContacts(filteredContacts);
    }

    getCheckedValues() {
      return [...this.filterBoxes].filter(box => box.checked === true)
                                  .map(box => box.value);
    }

    bind() {
      document.addEventListener('click', event => this.handleClick(event));
      this.addForm.querySelector('[type="cancel"]').addEventListener('click', event => this.removeContactForm(event));
      this.addForm.querySelector('[type="submit"]').addEventListener('click', event => this.addNewContact(event));
      this.editForm.querySelector('[type="cancel"]').addEventListener('click', event => this.removeEditForm(event));
      this.editForm.querySelector('[type="submit"]').addEventListener('click', event => this.editContact(event));
      this.search.addEventListener('input', event => this.searchChange(event));
      [...this.filterBoxes].forEach(box => box.addEventListener('change', event => this.submitFilters(event)));
    }
  }

  class FormValidation {
    constructor() {
      this.inputs = document.querySelectorAll('#add input[type="text"], #edit input[type="text"]');
      this.formButtons = document.querySelectorAll('form [type="submit"]');
      this.bind();
    }

    validate(event) {
      let input = event.target;

      if(event.target.checkValidity()) {
        input.classList.remove('invalid_field');
        input.parentElement.previousElementSibling.children[1].innerText = '';
      }
    }

    invalidInput(event) {
      let input = event.target;
      let dt = input.parentElement.previousElementSibling
      let errorMessage = dt.children[1]
      let fieldName = dt.children[0].innerText;

      if (input.hasAttribute('required') && input.value === '') {
        errorMessage.innerText = `${fieldName} is required`;
      } else {
        errorMessage.innerText = `Please Enter a valid ${fieldName}.`;
      }

      input.classList.add('invalid_field');
    }

    validateForm(event) {
      event.preventDefault();

      let form = event.target.parentElement.parentElement;
      let formInputs = form.querySelectorAll('input');
      let isValid = true;

      [...formInputs].forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
        }
      });

      if (isValid) {
        form.querySelector('.form_errors').innerText = '';
      } else {
        form.querySelector('.form_errors').innerText = "Form cannot be submitted until errors are corrected.";
      }
    }

    bind() {
      [...this.inputs].forEach(input => {
        input.addEventListener('focusout', event => this.validate(event));
        input.addEventListener('invalid', event => this.invalidInput(event));
      });

      [...this.formButtons].forEach(form => {
        form.addEventListener('click', event => this.validateForm(event));
      });
    }
  }

  new ContactManager();
});