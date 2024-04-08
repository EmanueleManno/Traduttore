//Recupero gli elementi dalla pagina:
const langButtons = document.querySelectorAll(".lang-button");
const textInput = document.querySelector(".text-input");
const translationText = document.querySelector(".translation-text");
const translationFlag = document.querySelector(".translation-flag");
const resetButton = document.querySelector(".reset-button");

//Funzione che mi resetta:
function reset() {
  textInput.value = "";
  translationText.innerText = "Traduzione";
  translationFlag.innerText = "";
}

//Funzione per la traduzione:
async function translate(text, lang, flag) {
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=it|${lang}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  const result = jsonData.responseData.translatedText;
  console.log(result);

  translationText.innerText = result;
  translationFlag.innerText = flag;
}

//Funzione per ogni bottone di traduzione messo in ascolto:
langButtons.forEach(function (langButton) {
  langButton.addEventListener("click", function () {
    //Recupero il testo dal campo di input e rimuovo eventuali spazi extra all'inizio e alla fine della stringa inserita con il metodo .trim()
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const text = textInput.value.trim();

    //Recupero il codice lingua dal data-attribute del pulsante
    const lang = langButton.dataset.lang;
    //Recupero la bandierina dalla testo del pulsante
    const flag = langButton.innerText;

    //Se il campo di input ha effettvamente del testo invoco la funzione e faccio partire la chiamata alle API
    if (text.length > 0) {
      translate(text, lang, flag);
    }
  });
});

//Bottone di Reset messo in ascolto:
resetButton.addEventListener("click", reset);
