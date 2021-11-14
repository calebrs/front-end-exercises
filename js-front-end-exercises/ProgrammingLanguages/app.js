document.addEventListener('DOMContentLoaded', () => {
  const languages = [
    {
      name: 'Ruby',
      description: 'Ruby is a dynamic, reflective, object-oriented, ' +
      'general-purpose programming language. It was designed and developed in the mid-1990s ' +
      'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
      'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
      'including functional, object-oriented, and imperative. It also has a dynamic type ' +
      'system and automatic memory management.'
    },
  
    {
      name: 'JavaScript',
      description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
      'programming language. It has been standardized in the ECMAScript language ' +
      'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
      'technologies of World Wide Web content production; the majority of websites employ ' +
      'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
      'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
      'supporting object-oriented, imperative, and functional programming styles.'
    },
  
    {
      name: 'Lisp',
      description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
      'with a long history and a distinctive, fully parenthesized prefix notation. ' +
      'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
      'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
      'since its early days, and many dialects have existed over its history. Today, the best '+
      'known general-purpose Lisp dialects are Common Lisp and Scheme.'
    }
  ];
  let languagesDiv = document.querySelector('#languages');

  let showMoreOrLess = {
    renderLanguages() {
      languages.forEach(language => {
        let newDiv = document.createElement('DIV');
        newDiv.classList.add('lang');
        newDiv.setAttribute('data-lang', language.name);
  
        let newH2 = document.createElement('H2');
        newH2.textContent = language.name;
  
        let newP = document.createElement('P');
        newP.textContent = language.description.slice(0, 120) + '...';
  
        let newA = document.createElement('A');
        newA.classList.add('more');
        newA.textContent = 'Show More';
  
        newDiv.appendChild(newH2);
        newDiv.appendChild(newP);
        newDiv.appendChild(newA);
        languagesDiv.appendChild(newDiv);
      });
    },
    getObj(findLanguage) {
      return languages.filter(language => language.name === findLanguage)[0];
    },
    showMoreOrLess(event) {
      if (event.target.innerText === "Show More") {
        this.showMore(event);
      } else if (event.target.innerText === "Show Less") {
        this.showLess(event);
      }
    },
    showMore(event) {
      event.preventDefault();

      let lang = event.target.parentElement.dataset.lang;
      let obj = this.getObj(lang);
      event.target.previousSibling.textContent = obj.description;

      event.target.textContent = "Show Less";
    },
    showLess(event) {
      event.preventDefault();

      let lang = event.target.parentElement.dataset.lang;
      let obj = this.getObj(lang);
      event.target.previousSibling.textContent = obj.description.slice(0, 120) + '...';

      event.target.textContent = "Show More";
    },
    bind() {
      [...document.querySelectorAll('.more')].forEach(link => link.addEventListener('click', event => this.showMoreOrLess(event)));
    },
    init() {
      this.renderLanguages();
      this.bind();
    }
  }

  showMoreOrLess.init();
});