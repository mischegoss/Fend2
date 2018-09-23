//Variables
let clockId;
let starCount;
let time = 0;
let clockOff = true;
let matchedcards = 0;
const minutes = Math.floor(time / 60);
const seconds = time % 60;
let toggledXY = []; //add the card to a list of open cards
let moves = 0; // sets moves to zero
const counter = document.querySelector(".moves");
const starsArray = document.querySelectorAll(".stars li");



//Creates an array for the cards
let card = document.getElementsByClassName("card");
const cards = [...card];

for (var i = 0; i < cards.length; i++) { //Looping to add event listener
  cards[i].addEventListener("click", () => {
    const targetX = event.target;
    if (
      targetX.classList.contains("card") &&  //checks if it has .card class
      !targetX.classList.contains("match") && //checks that it does not contain .match
      toggledXY.length < 2 &&  // checks length of array is less than  2
      !toggledXY.includes(targetX)  // checks array does not include card already
    ) {
      if (clockOff) {
        startClock();
        clockOff = false;
      }
      cardToggle(targetX);// flips the cards
      cardOpen(targetX); //pushes clicked on card into array
      if (toggledXY.length === 2) {
        moveCounts();
        matched();
      }
    }
  });
}

function cardToggle(targetX) { //This is the card toggle function
  targetX.classList.toggle("open");
  targetX.classList.toggle("show");
}

function cardOpen(targetX) { //pushes clicked card into array
  toggledXY.push(targetX);
}

function matched() { //adds .match to cards if they are match
  if (
    toggledXY[0].firstElementChild.className ===
    toggledXY[1].firstElementChild.className
  ) {
    toggledXY[0].classList.add("match");
    toggledXY[1].classList.add("match");
    matchedcards ++;
    console.log(matchedcards);
    toggledXY = [];
    youWon();
  } else {
    setTimeout(unmatched, 1500); //makes it so cards don't flip over immediately
  }
}

function youWon() {
  if (matchedcards === 8) {
    console.log("you won");
    stopTimer();
    writeModalStats();
    toggleModal();
  }
}

function unmatched() { // if cards are unmatched,  empties array but does not add .match class
  cardToggle(toggledXY[0]);
  cardToggle(toggledXY[1]);
  toggledXY = [];
}

// this is the provided shuffle function
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//
const cardDeck = document.querySelector(".deck");

function randomizeDeck() { //This function shuffles the cards
  var shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    shuffledCards.forEach.call(shuffledCards, function(item) {
      cardDeck.appendChild(item);
    });
  }
}

window.onload = randomizeDeck();

function moveCounts() { //This is the move counter
  moves === 0;
  moves++;
  counter.innerHTML = moves;
  if (moves === 10 || moves === 20) {
    removeStar(); // When moves equal 10 or 20 one star is removed. One star always remains no matter how many moves.
  }
}

function removeStar() { //This is the function to hide stars. It adds the class .hide which is styled in CSS.
  for (var i = 0; i < starsArray.length; i++) {
    if (moves === 10) {
      starsArray[2].classList.add("hide");
    } else {
      starsArray[1].classList.add("hide");
    }
  }
}

function startClock() { //This  is the timer
  time = 0;
  clockId = setInterval(() => {
    time++;
    console.log(time);
    displayTimer();
  }, 1000);
}


function displayTimer() {
  const timer = document.querySelector("#timer");
  timer.innerHTML = time;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    timer.innerHTML = `minutes ${minutes} seconds 0${seconds}`;
  } else {
    timer.innerHTML = `minutes ${minutes} seconds ${seconds}`;
  }
}

function stopTimer() { //This stops the clock
  clearInterval(clockId);
}

function toggleModal(){
  const modal = document.querySelector('.modal');
      modal.classList.toggle('hidden');

}

function getStars() {
//let starsList = document.querySelectorAll(".stars li");
//var starRating = document.querySelector(".stars").innerHTML;
  stars = document.querySelector('stars li');
  starCount = 0;
  for (var i = 0; i < starsArray.length; i++) {
          starCount++;
          console.log(starCount);
      }

return starCount
}


function writeModalStats() {
    const timeStat = document.querySelector('.time-stat');
    const clockTime = document.querySelector('#timer').innerHTML;
    const movesStat = document.querySelector('.moves-stat');
    const starsStat = document.querySelector('.stars-stat')
    //const starsStat = document.querySelector('.stars-stat');
    const stars = getStars();


    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

// MODAL: Buttons listener func
document.querySelector('.cancel').addEventListener('click', toggleModal);
/*document.querySelector('.modal_start').addEventListener('click', toggleStartModal);*/
document.querySelector('.replay').addEventListener('click', replayGame);
document.querySelector('.restart').addEventListener('click', resetGame);


function resetGame() {
    matchedcards = 0;
    resetClockAndTime();
    resetMoves();
    resetStars();
    resetCards();
    randomizeDeck();

}

//MODAL: Button "Reply" to reset the game func
function replayGame() {
  matchedcards = 0;
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
  randomizeDeck();
    toggleModal();


}

function resetCards(){
  for (var i = 0; i < cards.length; i++) {
    card[i].classList.remove("open");
    card[i].classList.remove("match");
    card[i].classList.remove("show");
  }
}

function resetStars() {
  starsArray[2].classList.remove("hide");
  starsArray[1].classList.remove("hide");

    }


function resetClockAndTime() {
    stopTimer();
    clockOff = true;
    time = 0;
    displayTimer();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}
