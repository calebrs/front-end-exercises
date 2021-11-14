document.addEventListener('DOMContentLoaded', () => {
  let apples = document.getElementById('apples');
  let message = document.getElementById('message');
  let replay = document.getElementById('replay');
  let spaces = document.getElementById('spaces');
  let guesses = document.getElementById('guesses');

  let randomWord = (function() {
    let words = ['apple', 'banana', 'orange', 'pear'];
    
    return function() {
      let randomIndex = Math.floor(Math.random() * words.length);
      return words.splice(randomIndex, 1)[0];
    }
  })();
  
  let Game = {
    chooseWord() {
      let newWord = randomWord();
      if (newWord === undefined) {
        this.alert("Sorry, I've run out of words!");
        this.unbind();
      } else if (newWord) {
        this.word = newWord;
      }
    },
  
    alert(text) {
      message.textContent = text;
    },
  
    createBlanks() {
      this.removeBlanks(spaces);
      for (let count = 0; count < this.word.length; count += 1) {
        let newSpan = document.createElement('SPAN');
        spaces.appendChild(newSpan);
      }
    },

    removeBlanks(div) {
      let spans = div.querySelectorAll('span');
      [...spans].forEach(span => span.remove());
    },

    guessLetter(event) {
      event.preventDefault();
      let key = event.key;
      let code = key.charCodeAt(0);

      if ((code >= 97 && code <= 122) && !this.alreadyGuessed(key)) {
        this.lettersGuessed.push(key);
        this.updateGuesses(key);

        if (this.isMatch(key)) {
          this.fillBlanks(key);
        } else {
          this.incorrectGuesses += 1;
          this.updateApples();
        }
      }
      this.checkWinConditions();
    },

    checkWinConditions() {
      if (this.playerWins()) {
        this.alert("You win!");
        this.unbind();
        this.togglePlayAgain();
      } else if (this.playerLoses()) {
        this.alert('You lose!');
        this.unbind();
        this.togglePlayAgain();
      }
    },

    reset() {
      this.alert();
      this.bind();
      this.chooseWord();
      this.createBlanks();
      this.togglePlayAgain();
      this.removeBlanks(guesses);
      this.incorrectGuesses = 0;
      this.lettersGuessed = [];
    },

    playerWins() {
      return this.word.split('')
                      .every(letter => this.lettersGuessed.includes(letter));
    },

    playerLoses() {
      return this.incorrectGuesses === this.allowedGuesses;
    },

    fillBlanks(key) {
      let matchingIndeces = [];
      let spans = spaces.querySelectorAll('span');
      
      this.word.split('').forEach((letter, index) => {
        if (letter === key) {
          matchingIndeces.push(index);
        }
      });

      matchingIndeces.forEach(indx => {
        spans[indx].textContent = key;
      });
    },

    updateApples() {
      apples.setAttribute('class', 'guess_' + String(this.incorrectGuesses));
    },

    updateGuesses(key) {
      let newLetter = document.createElement('SPAN');
      newLetter.textContent = key;
      guesses.appendChild(newLetter);
    },

    alreadyGuessed(key) {
      return this.lettersGuessed.includes(key);
    },

    isMatch(key) {
      return this.word.includes(key);
    },

    unbind() {
      document.removeEventListener('keyup', this.processGuessHandler);
    },

    bind() {
      this.processGuessHandler = event => this.guessLetter(event);
      document.addEventListener('keyup', this.processGuessHandler);
      replay.onclick = event => {
        event.preventDefault();
        this.reset();
      };
    },

    togglePlayAgain() {
      replay.classList.toggle('hidden');
    },
  
    init: function() {
      this.word = null;
      this.allowedGuesses = 6;
      this.incorrectGuesses = null;
      this.lettersGuessed = null;
  
      this.reset();
  
      return this;
    }
  }
  
  Game.init();
});