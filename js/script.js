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
const playerGuessMessage = document.querySelector(".message");
// hidden button
const hiddenButton = document.querySelector(".play-again");
// starting word
const word = "magnolia";

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
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
