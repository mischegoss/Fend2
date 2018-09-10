//Variables
let clockId;
let time = 0;
let clockOff = true;
const minutes = Math.floor(time / 60);
const seconds = time % 60;
let toggledXY = [];
let moves = 0;
const counter = document.querySelector(".moves");
const starsArray = document.querySelectorAll(".stars li");
let card = document.getElementsByClassName("card");
const cards = [...card];

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", () => {
    const targetX = event.target;
    if (
      targetX.classList.contains("card") &&
      toggledXY.length < 2 &&
      !toggledXY.includes(targetX)
    ) {
      if (clockOff) {
        startClock();
        clockOff = false;
      }
      cardToggle(targetX);
      cardOpen(targetX);
      if (toggledXY.length === 2) {
        moveCounts();
        matched();
      }
    }
  });
}

function matched() {
  if (
    toggledXY[0].firstElementChild.className ===
    toggledXY[1].firstElementChild.className
  ) {
    toggledXY[0].classList.add("match");
    toggledXY[1].classList.add("match");
    console.log("match");
    toggledXY = [];
  } else {
    setTimeout(unmatched, 1500);
  }
}

function unmatched() {
  cardToggle(toggledXY[0]);
  cardToggle(toggledXY[1]);
  toggledXY = [];
}

function cardToggle(targetX) {
  targetX.classList.toggle("open");
  targetX.classList.toggle("show");
}

function cardOpen(targetX) {
  toggledXY.push(targetX);
}

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

const cardDeck = document.querySelector(".deck");

function startGame() {
  var shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    shuffledCards.forEach.call(shuffledCards, function(item) {
      cardDeck.appendChild(item);
    });
  }
}

window.onload = startGame();

function moveCounts() {
  moves === 0;
  moves++;
  counter.innerHTML = moves;
  if (moves === 6 || moves === 12) {
    removeStar();
  }
}

function removeStar() {
  for (var i = 0; i < starsArray.length; i++) {
    if (moves === 6) {
      starsArray[2].classList.add("hide");
    } else {
      starsArray[1].classList.add("hide");
    }
  }
}

function startClock() {
  time = 0;
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

startClock();

function displayTime() {
  //function makes variables that calculates the minutes and seconds, and manipulates the DOM to display them.
  const timer = document.querySelector("#timer");
  timer.innerHTML = time;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    //if the seconds is less than 10 (2-digit numbers), then it will display the minutes and seconds (from 0-9)
    timer.innerHTML = `min ${minutes} sec 0${seconds}`;
  } else {
    // Or else it'll display the minutes and seconds (numbers > 9)
    timer.innerHTML = `min ${minutes} sec ${seconds}`;
  }
}

function stopClock() {
  clearInterval(clockId);
}
