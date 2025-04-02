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
let wrongGuesses = 0;
let guessedLetters = [];
let winCounter = 0
let lossCounter = 0
const maxMistakes = 6;
//button variable
//start game function
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
  //guessed letter enter key
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
  if (selectedWord.includes(guessedLetter)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }
  
  inputField.value = '';
  inputField.focus();
}

function wrongGuess(guessedLetter) {
  //audio plays wrong guess
  wrongSound = document.getElementById('wrongSound')
  wrongSound.muted = false
  wrongSound.play();
  //increment number of wrong guesses 
  wrongGuesses++
  //add guessedletter to  html div
  document.getElementById('wrongLetters').textContent += `${guessedLetter}` + ' '
  document.getElementById('shamrock').src = `imgs/shamrock${0 + wrongGuesses}.png`
  // check if number of wrong guesses is equal to max mistakes, if so call endGame()
  if (wrongGuesses === maxMistakes) {
    endGame(false)
  }
}

function correctGuess(guessedLetter) {
//audio plays correct guess
correctSound = document.getElementById('correctSound')
correctSound.muted = false
correctSound.play();
  let newDisplayedWord = ''

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter
    } else {
      newDisplayedWord += displayWord[i]
   
    }
  }
   displayWord = newDisplayedWord
  
  document.getElementById("wordDisplay").textContent = displayWord.split("").join(" ");
  if (!displayWord.includes('_')) {
    endGame(true)
  }
}

function endGame(won) {
  document.getElementById('letterInput').disabled = true
  if (won === true) {
    winDisplay();
    document.getElementById('winAlert').classList.remove('d-none')
    document.getElementById('winnerMessage').textContent = `Congrats! You guessed the word "${selectedWord}" correctly! Click on the restart button to play again.`
  } else {
    lossDisplay();
      document.getElementById('loseAlert').classList.remove('d-none')
      document.getElementById('loserMessage').textContent = `Yikes! The correct word was "${selectedWord}". Click on the restart button to play again.`
      }
}

function restartGame() {
  selectedWord = "";
 displayWord = "";
 wrongGuesses = 0;
  guessedLetters = ['']
  //show difficulty selection and show game area
  document.getElementById("difficultySelection").classList.add("d-block");
  document.getElementById("difficultySelection").classList.remove("d-none");

  //add d-none to  the difficulty selection div
  document.getElementById("gameArea").classList.add("d-none");
  document.getElementById("difficultyBox").classList.add("d-none");

  document.getElementById('loseAlert').classList.add('d-none')
  document.getElementById('winAlert').classList.add('d-none')

  document.getElementById('letterInput').disabled = false
  document.getElementById('shamrock').src = ''
}

//enter key button with a 1.5 second timeout
document.getElementById('letterInput').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    setTimeout(() => guessLetter(), 2000);
  }
})

function winDisplay() {
  winCounter++;
  document.getElementById('winCounter').textContent = `Wins: ${winCounter}`
}

function lossDisplay() {
  lossCounter++;
  document.getElementById('lossCounter').textContent = `Losses: ${lossCounter}`
}