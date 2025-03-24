const wordList = [
  "pot",
  "gold",
  "luck",
  "clover",
  "charm",
  "leprechaun",
  "treasure",
  "celebration",
  "tradition",
  "rainbow",
  "parade",
];
//setting game variables
let selectedWord = "";
let displayWord = "";
let wrongGuess = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
  selectedWord = getRandomWord(level);

  //update difficulty display
  updateDifficultyDisplay(level);
  //create the placeholder for the selected word
  displayWord = "_".repeat(selectedWord.length);
  document.getElementById("wordDisplay").textContent = displayWord
    .split("")
    .join(" ");
  //hide difficulty selection and show game area
  document.getElementById("difficultySelection").classList.add("d-none");
  //remove d-none to  the difficulty selection div
  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");
  //add d-blcok difficulty box and game area
  document.getElementById("gameArea").classList.add("d-block");
  document.getElementById("difficultyBox").classList.add("d-block");
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4;
    if (level === "medium") return word.length > 4 && word.length <= 7;
    if (level === "hard") return word.length > 7;
  });
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");

  //remove any previous difficulty classes
  difficultyBox.classList.remove("easy", "medium", "hard");
  difficultyBox.textContent = `Difficulty: ${
    level.charAt(0).toUpperCase() + level.slice(1)
  }`;
  difficultyBox.classList.add(level);
}

function guessLetter() {
  let inputField = document.getElementById("letterInput"); //get input field
  let guessedLetter = inputField.value.toLowerCase(); //convert input to lowercase

  //check if letter input is valid letter (a-z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert("Please enter a letter from A-Z");
    inputField.value = "";
    return;
  }
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed ${guessedLetter}. Try a different letter!`);
    inputField.value = '';
    return;
  } else {
    guessedLetters.push(guessedLetter);
  }
  //chekc if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetters)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }
  inputField.value = '';
  inputField.focus();
}
