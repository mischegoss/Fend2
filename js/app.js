let toggledXY = [];
let moves = 0;
const counter = document.querySelector('.moves');
const starsArray = document.querySelectorAll('.stars li');
let card = document.getElementsByClassName("card");
 const cards = [...card];


for (var i=0; i< cards.length; i++){
  cards[i].addEventListener ('click', () => {
    const targetX = event.target;
    if (targetX.classList.contains("card") && toggledXY.length < 2 && !toggledXY.includes(targetX)) {
      cardToggle(targetX);
      cardOpen(targetX);
    if (toggledXY.length === 2){
      moveCounts();
      matched();
    }
    }
  });
}


function matched() {
  if(toggledXY[0].firstElementChild.className === toggledXY[1].firstElementChild.className) {
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

function cardToggle (targetX) {
  targetX.classList.toggle('open');
  targetX.classList.toggle('show');

};

function cardOpen(targetX) {
  toggledXY.push(targetX);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
function startGame(){
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      shuffledCards.forEach.call(shuffledCards, function(item){
         cardDeck.appendChild(item);
      });
   }
}

window.onload = startGame();

function moveCounts() {
	moves === 0; moves++;
	counter.innerHTML = moves;
  if (moves === 6 || moves === 12) {
    removeStar();
  }
}

function removeStar() {
  for (var i=0; i< starsArray.length; i++){
  if (moves === 6 ) {
  starsArray[2].classList.add("hide");
} else {
  starsArray[1].classList.add("hide");
}}
}





























/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

*/
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
