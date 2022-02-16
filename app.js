/*
Copyright © 2022, calebwebdesigner
made by: https://github.com/calebwebdesigner
repo: https://github.com/calebwebdesigner/typingTest.js
*/

window.addEventListener('load', gameStart);

//global variables
let timer = 60;
let timerStart = 1;
let score = 0;

//dom elements
const timerDisplay = document.querySelector('#timer-display');
const currentWord = document.querySelector('#current-word');
const userInput = document.querySelector('#user-input');
const message = document.querySelector('#message');
const scoreDisplay = document.querySelector('#score');
const clockHand = document.querySelector('#clock-hand');

//initialise game
function gameStart() {
    //display first word
    showWord(wordList);
    //display appropriate message at appropriate time
    setInterval(messageFunc, 10);
    //keep matching word
    setInterval(wordMatch, 10);
}

//compare user input to current word and display score
function wordMatch() {
    if (userInput.value === currentWord.innerHTML) {
        showWord(wordList);
        userInput.value = '';
        score ++;
    }
    scoreDisplay.innerHTML = score;
}

//select and display random word
function showWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord.innerHTML = wordList[randomIndex];
}

//start timer on user's first keypress
userInput.addEventListener('keydown', (e) => {
    if (timerStart === 1) {
        setInterval(() => {
            if (timer > 0) {
                timer--;
                timerDisplay.innerHTML = timer;
            } else if (timer === 0) {
                timer --;
                timerDisplay.innerHTML = 0;
            } else if (timer < 0) {
                timerDisplay.innerHTML = 0;
            }
        }, 1000);
        setInterval(() => {
            if (timer >= 0) {
                const handDegrees = ((timer / 60) * -360) + 90;
                clockHand.style.transform = `rotate(${handDegrees}deg)`;
            }
        }, 1000);
        timerStart = 0;
    }
});

//show message once timer runs out
function messageFunc() {
    if (timer <= 0) {
        message.innerHTML = "Well done! In 60 seconds thou hast attained a score of:";
        userInput.outerHTML = '';
    } else if (score >= 20) {
        message.innerHTML = "Wow! You're on fire!";
    } else if (score >= 15) {
        message.innerHTML = "That's it! Keep going";        
    } else if (score >= 10) {
        message.innerHTML = "Bravo! Don't stop!";
    } else {
        message.innerHTML = '';
    }
}
