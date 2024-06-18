let words = [
    "25253", "52262", "82526", "15263", "52947", "52897",
    "02050", "50678", "12149", "96304", "56915", "15121",
    "03807", "96303", "45145", "75465", "89510", "90044",
    "92652", "47015", "52365", "89210", "54144", "45142",
    "54054", "54215", "01069", "04105"
];
let container = document.querySelector(".container");
let winScreen = document.querySelector(".win-screen");
let submitButton = document.querySelector(".submit");
let inputCount, tryCount, inputRow;
let randomWord, finalWord;

//Detect touch device
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

//Initial Setup
const startGame = async() => {
    winScreen.classList.add("hide");
    container.innerHTML = "";
    inputCount = 0;
    tryCount = 0;
    finalWord = "";

    //Creating the grid
    for (let i = 0; i < 6; i++) {
        let inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");
        for (let j = 0; j < 5; j++) {
            inputGroup.innerHTML += `<input type="text" class="input-box" onkeyup="checker(event)" maxlength="1" disabled>`;
        }
        container.appendChild(inputGroup);
    }
    inputRow = document.querySelectorAll(".input-group");
    updateDivConfig(inputRow[tryCount].firstChild, false);
    randomWord = getRandom();
    console.log(randomWord);
};

//Get random word
const getRandom = () => words[Math.floor(Math.random() * words.length)].toUpperCase();

//Update input to disabled status and set focus
const updateDivConfig = (element, disabledStatus) => {
    element.disabled = disabledStatus;
    if (!disabledStatus) {
        element.focus();
    }
};

//Logic for writing in the inputs
const checker = (e) => {
    let value = e.target.value.toUpperCase();
    if (e.key !== "Backspace") {
        if (value.length === 1) {
            finalWord += value;
            updateDivConfig(e.target, true);
            if (inputCount < 4) {
                updateDivConfig(e.target.nextSibling, false);
            }
            inputCount += 1;
        }
    } else if (e.key === "Backspace") {
        if (inputCount > 0) {
            finalWord = finalWord.slice(0, -1);
            inputCount -= 1;
            updateDivConfig(e.target, true);
            if (e.target.previousSibling) {
                e.target.previousSibling.value = "";
                updateDivConfig(e.target.previousSibling, false);
            }
        }
    }
};

//When user presses enter/backspace and all the inputs are filled
window.addEventListener("keyup", (e) => {
    if (inputCount > 4) {
        if (isTouchDevice()) {
            submitButton.classList.remove("hide");
        }
        if (e.key === "Enter") {
            validateWord();
        }
    }
});

submitButton.addEventListener("click", () => {
    if (isTouchDevice()) {
        validateWord();
    }
});

//Comparison Logic
const validateWord = async() => {
    if (isTouchDevice()) {
        submitButton.classList.add("hide");
    }

    let currentInputs = inputRow[tryCount].querySelectorAll(".input-box");
    let successCount = 0;
    let successLetters = "";

    for (let i in randomWord) {
        if (finalWord[i] === randomWord[i]) {
            currentInputs[i].classList.add("correct");
            successCount += 1;
            successLetters += randomWord[i];
        } else if (randomWord.includes(finalWord[i]) && !successLetters.includes(finalWord[i])) {
            currentInputs[i].classList.add("exists");
        } else {
            currentInputs[i].classList.add("incorrect");
        }
    }

    tryCount += 1;

    if (successCount === 5) {
        setTimeout(() => {
            winScreen.classList.remove("hide");
            winScreen.innerHTML = `
          <span>Total guesses: ${tryCount}</span>
          <button onclick="startGame()">New Game</button>
          `;
        }, 1000);
    } else {
        if (tryCount === 6) {
            winScreen.classList.remove("hide");
            winScreen.innerHTML = `
          <span>You lose</span>
          <button onclick="startGame()">New Game</button>
          `;
        } else {
            inputCount = 0;
            finalWord = "";
            updateDivConfig(inputRow[tryCount].firstChild, false);
        }
    }
};

window.onload = startGame();