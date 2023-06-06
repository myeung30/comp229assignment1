/*
File name:
Student's name: Man Chun Yeung
StudentID: 301251548
Date: 28 May 2023
*/

"use strict";

const words = [
  "House",
  "Job",
  "Business",
  "Food",
  "Restaurant",
  "Telephone",
  "Address",
  "Money",
  "Friend",
  "Love",
  "Happy",
  "Angry",
  "Excited",
  "Tired",
]; // Array of Random Words
var currentWord; // Store current word

// Various elements
var wordDiv = document.getElementById("word");
var inputBox = document.getElementById("letter");
var startButton = document.getElementById("startGame");
var msgBox = document.getElementById("msgBox");

var correctLetters = 0; // Track how many correct letters there are

function startGame() {
  inputBox.style.display = "block"; // Show Inputbox
  wordDiv.innerHTML = ""; // Clear the word
  msgBox.innerHTML = ""; // Clear the message box
  inputBox.disabled = false; // Enable inputbox
  inputBox.focus(); // Focus input box
  currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase(); // Set current word to guess
  correctLetters = 0; // Reset correctLetters

  // Create elements for each letter and placing a * in it
  for (let i = 0; i < currentWord.length; i++) {
    var letterDiv = document.createElement("div");
    letterDiv.innerHTML =
      '<div class="wordBox-letter">*</div><div class="wordBox-line"></div>';
    letterDiv.className = "wordBox";
    wordDiv.appendChild(letterDiv);
  }
}

inputBox.onkeyup = function(){
  setTimeout(checkLetter, 300);
}

function checkLetter(){
  for( let i = 0; i < currentWord.length; i++){
    if (currentWord[i] == inputBox.value.toUpperCase() && document.getElementsByClassName("wordBox-letter")[i].textContent == "*"){
      document.getElementsByClassName("wordBox-letter")[i].innerHTML = inputBox.value.toUpperCase();
      correctLetters++;
    }
  }

  if (correctLetters == currentWord.length){
    msgBox.innerHTML = "You guessed the word " + currentWord + " correctly!";
    inputBox.disabled = true;
  }
   
  inputBox.value = "";
}

/* Event Listeners -- DO NOT REMOVE THIS */

startButton.addEventListener("click", startGame); // Starting game by clicking the start button