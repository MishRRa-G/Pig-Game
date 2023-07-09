'use strict';
// let name1=prompt("Please enter name of Player1", "Player1")
// document.getElementById('name--0').textContent=name1;
// let name2=prompt("Please enter name of Player2", "Player2")
// document.getElementById('name--1').textContent=name2
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnhold = document.querySelector('.btn--hold');
let scores, currentScore, playing, activePlayer;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function rolldice() {
  if (playing) {
    // rolling dice
    var dice = Math.trunc(Math.random() * 6) + 1;
    // displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}
btnhold.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player's total score dynamically
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      //hiding dice again
      diceEl.classList.add('hidden');
      // Replacing the active class with winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    } else {
      // if score is less than 100 switchPlayer
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);