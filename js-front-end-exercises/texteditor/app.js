document.addEventListener('DOMContentLoaded', () => {
  

  document.querySelector('.buttons').addEventListener('click', event => {
    event.preventDefault();

    let command = event.target.dataset.command;
    if (command === "createLink") {
      let url = prompt('Enter URL: ');
      document.execCommand(command, false, url);
    } else {
      document.execCommand(command);
    }
    
  })
});