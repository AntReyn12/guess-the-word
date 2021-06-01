// unordered list where player guesses appear
const guessedLetterList = document.querySelector(".guessed-letters");
// button with "Guess!" in it
const guessButton = document.querySelector(".guess");
// text input where player guesses a letter
const letterInput = document.querySelector(".letter");
// empty paragraph where word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where remaining guesses display
const remainingGuesses = document.querySelector(".remaining");
// span inside remaining guesses
const remainingGuessesSpan = document.querySelector(".remaining span");
// paragraph where message appears when player guesses letter
const message = document.querySelector(".message");
// hidden button
const hiddenButton = document.querySelector(".play-again");
// starting word
const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
