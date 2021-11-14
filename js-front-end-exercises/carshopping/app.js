document.addEventListener('DOMContentLoaded', () => {
  // Seed Data
  const CAR_DATA = [
    { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
    { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
    { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
    { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
    { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
  ];


  // templates
  let filtersTemplate = Handlebars.compile(document.querySelector('#filters_template').innerHTML);
  let carsTemplate = Handlebars.compile(document.querySelector('#cars_template').innerHTML);
  Handlebars.registerPartial('car_template', document.querySelector('#car_template').innerHTML);

  // variables
  let filters = document.querySelector('#filters');
  let cars = document.querySelector('#cars');

  // car app class
  class CarApp {
    constructor(carData) {
      this.cars = carData;
      this.displayedCars = carData;
      this.makes = this.getUniqueValues('make');
      this.models = this.getUniqueValues('model');
      this.years = this.getUniqueValues('year');
      this.prices = this.getUniqueValues('price');
      this.filterValues;

      this.renderFilters();
      this.renderCars();
      this.bind();
    }

    getUniqueValues(columnName) {
      let result = [];

      this.cars.forEach(car => {
        if (!result.includes(car[columnName])) {
          result.push(car[columnName]);
        }
      });

      return result;
    }

    renderFilters() {
      filters.innerHTML = filtersTemplate({ makes: this.makes,
                                            models: this.models,
                                            prices: this.prices,
                                            years: this.years });
    }

    renderCars() {
      cars.innerHTML = carsTemplate({ cars: this.displayedCars });
    }

    submitFilters(event) {
      event.preventDefault();

      this.filterValues = this.getFilterValues();
      this.filterCars();
    }

    filterCars() {
      this.displayedCars = this.filter(this.cars, 'make');
      this.displayedCars = this.filter(this.displayedCars, 'model');
      this.displayedCars = this.filter(this.displayedCars, 'price');
      this.displayedCars = this.filter(this.displayedCars, 'year');
      this.renderCars();
    }

    filter(obj, key) {
      return obj.filter(car => {
        if (this.filterValues[key] === '') {
          return true;
        } else if (this.filterValues[key] === car[key]) {
          return true;
        } else {
          return false;
        }
      });
    }

    getFilterValues() {
      return {
        make: document.querySelector('#make_select').value,
        model: document.querySelector('#model_select').value,
        price: Number(document.querySelector('#price_select').value) || '',
        year: Number(document.querySelector('#year_select').value) || '',
      }
    }

    updateModels(event) {
      event.preventDefault();

      let make = event.currentTarget.value;

      let matchingModels = this.getMatchingModels(make);
      this.changeModels(matchingModels);
    }

    getMatchingModels(make) {
      let result = [];

      this.cars.forEach(car => {
        if (!result.includes(car.model)) {
          if (car.make === make) {
            result.push(car.model);
          } else if (make === '') {
            result.push(car.model);
          }
        }
        
      });

      return result;
    }

    changeModels(models) {
      let modelSelect = document.querySelector('#model_select');
      [...modelSelect.children].forEach(option => option.remove());

      if (this.models.length === models.length) {
          let optionAll = document.createElement('OPTION');
          optionAll.innerText = 'All';
          optionAll.setAttribute('value', '');
          modelSelect.appendChild(optionAll);
      }

      models.forEach(model => {
        let newOption = document.createElement('OPTION');
        newOption.innerText = model;
        newOption.setAttribute('value', model);
        modelSelect.appendChild(newOption);
      });
    }

    bind() {
      filters.querySelector('.filter_btn').addEventListener('click', event => this.submitFilters(event));
      document.querySelector('#make_select').addEventListener('change', event => this.updateModels(event));
    }
  }

  new CarApp(CAR_DATA);
});