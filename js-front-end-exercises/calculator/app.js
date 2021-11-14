document.addEventListener('DOMContentLoaded', () => {
  let calculator = document.getElementById('calculator');

  class Calculator {
    constructor(calculator) {
      this.calculator = calculator;
      this.screen = calculator.querySelector('#screen');
      this.calculationScreen = this.screen.firstElementChild;
      this.currentNumberScreen = this.screen.lastElementChild;
      this.buttons = calculator.querySelector('#buttons');
      this.currentNumberString = '';
      this.calculation = '';
      this.total = 0;

      this.bind();
    }

    handleControl(button) {
      if (button === 'CE') {
        this.handleCe();
      } else if (button === 'C') {
        this.handleC();
      } else if (button === 'NEG') {
        this.handleNeg();
      }
    }

    handleCe() {
      this.currentNumberString = '';
      this.currentNumberScreen.innerText = '0';
    }

    handleC() {
      this.handleCe();
      this.calculation = ''
      this.total = 0;
      this.renderCurrentCalculation();
    }

    handleNeg() {
      this.currentNumberString = '-' + this.currentNumberString;
      this.renderCurrentNumber();
    }

    handleOperation(button) {
      this.calculation = this.calculation + " " + this.currentNumberString + " " + button;
      this.renderCurrentCalculation();
      
      this.calculate(button);
      this.renderCurrentNumber();
      this.currentNumberScreen.innerText = this.total;
    }

    calculate(operation) {
      let num1 = this.total;
      let num2 = Number(this.currentNumberString);
      let result = null;

      console.log(operation, num1, num2);

      switch(operation) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "x":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        case "%":
          result = num1 % num2;
          break;
      }

      console.log(result);

      this.total = result;
      this.currentNumberString = '';
    }

    handleDigit(button) {
      if (this.currentNumberString === '' && button === '0') {
        return;
      }
      this.currentNumberString = this.currentNumberString + button;
      this.renderCurrentNumber();
    }

    handleDot() {
      if (!this.currentNumberString.includes('.')) {
        this.currentNumberString = this.currentNumberString + '.';
        this.renderCurrentNumber();
      }
    }

    handleResult() {
      this.calculation = this.calculation + " " + this.currentNumberString;
      this.renderCurrentCalculation();
      
    }

    renderCurrentNumber() {
      if (this.currentNumberString === '') {
        this.currentNumberScreen.innerText = '0'
      } else {
        this.currentNumberScreen.innerText = this.currentNumberString;
      }
    }

    renderCurrentCalculation() {
      this.calculationScreen.innerText = this.calculation;
    }

    handleButtonClick(event) {
      event.preventDefault();

      let buttonClass = event.target.getAttribute('class');
      let button = event.target.innerText;
      if (buttonClass === 'control') {
        this.handleControl(button);
      } else if (buttonClass === 'op') {
        this.handleOperation(button);
      } else if (buttonClass === 'digit') {
        this.handleDigit(button); 
      } else if (buttonClass === 'dot') {
        this.handleDot();
      } else if (buttonClass === 'result_button') {
        this.handleResult();
      } 
    }

    bind() {
      this.buttons.addEventListener('click', event => this.handleButtonClick(event));
    }
  }

  new Calculator(calculator);
});