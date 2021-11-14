function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    return !parentElement.addEventListener(eventType, (event) => {
      let options = [...parentElement.querySelectorAll(selector)];
      if (options.includes(event.target)) {
        callback(event);
      }
    });
  }
}

// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

// delegateEvent(element1, 'p', 'click', callback); // returns undefined, does not add anything to elements
// delegateEvent(element2, 'p', 'click', callback); // true, adds click to elem2, click anywhere does not trigger event
// delegateEvent(element2, 'h1', 'click', callback); // true, adds click to elem2, click anywhere does not trigger event
delegateEvent(element3, 'h1', 'click', callback); // true, adds click to elem3, dislpays alert when clikcing the h1 in header
// delegateEvent(element3, 'aside p', 'click', callback); // true, adds click to elem3
// delegateEvent(element2, 'p', 'click', callback);