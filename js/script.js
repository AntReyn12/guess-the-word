// unordered list where player guesses appear
const guessedLetterList = document.querySelector(".guessed-letters");
// button with "Guess!" in it
const guessButton = document.querySelector(".guess");
// text input where player guesses a letter
const letterInput = document.querySelector(".letter");
// empty paragraph where word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where remaining guesses display
const remainingGuessesElement = document.querySelector(".remaining");
// span inside remaining guesses
const remainingGuessesSpan = document.querySelector(".remaining span");
// paragraph where message appears when player guesses letter
const message = document.querySelector(".message");
// hidden button
const hiddenButton = document.querySelector(".play-again");
// starting word
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  // Grab what was entered in the input
  const guess = letterInput.value;
  // Make sure it was a single letter
  const goodGuess = playerInputValidation(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const playerInputValidation = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = "Please enter a single letter";
  } else if (!input.match(acceptedLetter)) {
    // Did you type a non letter?
    message.innerText = "Please enter a letter from A to Z";
  } else {
    // We finally got a letter!
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateGuessesRemaining(guess);
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the unordered list the guesses belong to
  guessedLetterList.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetterList.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateGuessesRemaining = function (guess) {
  const wordUpper = word.toUpperCase();
  if (!wordUpper.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLetterList.classList.add("hide");
  hiddenButton.classList.remove("hide");
};

hiddenButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessedLetterList.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

  getWord();

  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLetterList.classList.remove("hide");
  hiddenButton.classList.add("hide");
});
