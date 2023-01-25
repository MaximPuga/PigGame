'use strict';

// Elements selection
let score1Element = document.getElementById('score--0');
let score2Element = document.getElementById('score--1');
let current1Elemet = document.getElementById('current--0');
let current2Elemet = document.getElementById('current--1');
let diceElement = document.querySelector('.dice');
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let player1Elements = document.querySelector('.player--0');
let player2Elements = document.querySelector('.player--1');

// Game initial condition
score1Element.textContent = 0;
score2Element.textContent = 0;
diceElement.classList.add('hidden');
function switchActivePlayer() {
   currentScore = 0; 
   document.getElementById(`current--${activePlayer}`).textContent
   =currentScore;
   activePlayer = activePlayer === 0 ? 1 : 0;
   player1Elements.classList.toggle('player--active');
   player2Elements.classList.toggle('player--active');
};
let totalScores, isPlaying, activePlayer, currentScore;
function initGame(){
   isPlaying = true;
   currentScore = 0;
   activePlayer = 0;
   totalScores = [0, 0];
   diceElement.classList.add('hidden');
   score1Element.textContent = 0;
   score2Element.textContent = 0;
   current1Elemet.textContent = 0;
   current2Elemet.textContent = 0;
   diceElement.classList.add('hidden');
   player1Elements.classList.remove('player--winner');
   player2Elements.classList.remove('player--winner');
   player1Elements.classList.remove('player--active');
   player2Elements.classList.remove('player--active');
   player1Elements.classList.add('player--active');
}

initGame();

// Roll the dice
function rollDice(){
   if(isPlaying){

//1. Generate a random number between 1 and 6
let diceNumber = Math.trunc(Math.random() * 6) +1;
console.log(diceNumber);
//2. Display number on the dice
diceElement.classList.remove('hidden');
diceElement.src = `dice${diceNumber}.png`;

//3. if the number is 1, switch to the next player
if(diceNumber !== 1) {
   currentScore += diceNumber;
   document.getElementById(`current--${activePlayer}`).textContent
   =currentScore;
}else{
   switchActivePlayer();
      }
   };
};

function holdScore() {
   if(isPlaying){
//1. Add current score to active player total score
   totalScores[activePlayer] += currentScore;
   document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

//2. If total score of active player >= 100, active player won, if not - switch active player
   if(totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceElement.classList.add('hidden');
   }else{
      switchActivePlayer();
      }
   };
};

btnHold.addEventListener('click', holdScore);
btnRoll.addEventListener('click', rollDice);
btnNew.addEventListener('click', initGame);

