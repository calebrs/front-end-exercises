document.addEventListener('DOMContentLoaded', () => {
  let start = document.querySelector('.toggle');
  let reset = document.querySelector('.reset');

  let StopwatchApp = {
    startWatch(event) {
      event.preventDefault()
      
      this.counter = this.startCounting();
      this.unbindStart();
    },

    startCounting() {
      this.cents = 0;
    
      return setInterval(() => {
        this.cents += 1;

        if (this.cents > 99) {
          this.cents = 0;
          this.addSecond();
        }
        
        this.centsElem.innerText = this.digitsToString(this.cents);
      }, 10);
    },

    digitsToString(num) {
      let string = String(num);
      if (string.length === 1) {
        string = '0' + string;
      }
      return string;
    },

    addSecond() {
      this.secs += 1;
      this.secsElem.innerText = this.digitsToString(this.secs);
      if (this.secs > 59) {
        this.secs = 0;
        this.addMin();
      }
    },

    addMin() {
      this.mins += 1;
      this.minsElem.innerText = this.digitsToString(this.mins);
      if (this.mins > 59) {
        this.mins = 0;
        this.addHour();
      }
    },

    addHour() {
      this.hours += 1;
      this.hoursElem.innerText = this.digitsToString(this.hours);
      if (this.hours > 99) {
        this.hours = 0;
        alert('Reached maximum amount of hours');
      }
    },

    resetWatch(event) {
      event.preventDefault();

      clearInterval(this.counter);

      this.centsElem.innerText = "00";
      this.secsElem.innerText = "00";
      this.minsElem.innerText = "00";
      this.hoursElem.innerText = "00";

      this.bindStart();
    },

    unbindStart() {
      start.removeEventListener('click', this.processStartWatch);
    },
    
    bindStart() {
      this.processStartWatch = event => this.startWatch(event);
      start.addEventListener('click', this.processStartWatch);
    },

    bindReset() {
      reset.addEventListener('click', event => this.resetWatch(event));
    },

    init() {
      this.bindStart();
      this.bindReset();

      this.cents = 0;
      this.secs = 0;
      this.mins = 0;
      this.hours = 0;

      this.centsElem = document.querySelector('.centisecs');
      this.secsElem = document.querySelector('.secs');
      this.minsElem = document.querySelector('.mins');
      this.hoursElem = document.querySelector('.secs');
    }
  }

  StopwatchApp.init();
});