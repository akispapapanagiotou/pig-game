'use strict';

// elements
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const btnNewEl = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let currentScore, activePlayer, playing, scores;

// function that switches player
const switchPlayer = function(){
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = (activePlayer === 0) ? 1 : 0;
};

// function that resets game
const initGame = function(){
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

initGame();

// when dice is rolled
btnRollEl.addEventListener("click", function(){
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random()*6) + 1;
      
    // display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // if dice is not 1
    if (dice !== 1){
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    // if dice is 1
    } else {
      switchPlayer();
    }
  }
});

// when hold button is pressed
btnHoldEl.addEventListener("click", function(){
  if (playing){
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent= scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      diceEl.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// when new game button is pressed
btnNewEl.addEventListener("click", function(){
  initGame();
});