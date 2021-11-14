document.addEventListener('DOMContentLoaded', () => {
  let inputs = document.querySelectorAll('input');
  let form = document.querySelector('form');

  function validate(event) {
    let input = event.target;
    if(event.target.checkValidity()) {
      input.classList.remove('invalid_field');
      input.nextElementSibling.innerText = '';
    }
  }

  function invalidInput(event) {
    let input = event.target;
    let fieldName = input.parentElement.previousElementSibling.children[0].innerText;
    if (input.hasAttribute('required') && input.value === '') {
      input.nextElementSibling.innerText = `${fieldName} is required`;
    } else {
      input.nextElementSibling.innerText = `Please Enter a valid ${fieldName}.`;
    }
    input.classList.add('invalid_field');
  }

  function submitForm(event) {
    event.preventDefault();

    if ([...inputs].every(elem => elem.checkValidity())) {
      document.querySelector('.form_errors').innerText = '';
    } else {
      document.querySelector('.form_errors').innerText = "Form cannot be submitted until errors are corrected.";
    }
      
  }

  [...inputs].forEach(elem => {
    elem.addEventListener('focusout', validate);
    elem.addEventListener('invalid', invalidInput);
  });

  form.addEventListener('submit', submitForm);
});