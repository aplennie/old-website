
const button = document.querySelector('#rand-but');
const langBox = document.querySelector('[name="lang"]');
const engWord = document.querySelector('#orig');
const trans = document.querySelector('#trans');
let languages = [];
let currentLang = "af";

// this function gets the list of available tranlation languages
function getLangs() {
  fetch("https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20190209T023055Z.c8aacfc91b5cda8e.0899604cac959faa6bf4c9d13907eb0fff7938e1&ui=en", {
    method: "GET",
  })
    .then((response) => response.json()) // convert response to json
    .then(function(data) {
      let languages = Object.keys(data.langs).map((key) => [key, data.langs[key]]);
      langBox.innerHTML = languages.map(lang => `<option value="${lang[0]}">${lang[1]} (${lang[0]})</option>`).join('');
  })
}

// this function selects the language with the user selection from the dropdown
function selectLang() {
  currentLang = this.value;
}

// this function gets a random word from the array and passes it to the translate function
function getRandomWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  engWord.innerHTML = randomWord;
  translate(randomWord, currentLang);

}

// this function gets the translated word and displays it
function translate(word, lang) {
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190209T023055Z.c8aacfc91b5cda8e.0899604cac959faa6bf4c9d13907eb0fff7938e1&text=${word}&lang=en-${lang}`, {
    method: "POST",
  })
  .then((response) => response.json())
  .then(function(data) {
    trans.innerHTML = data.text[0];
  })
}

getLangs();
langBox.addEventListener('change', selectLang);
button.addEventListener('click', getRandomWord);
