let dealerPoint = 0;
let playerPoint = 0;

let dealerAceSum = 0;
let playerAceSum = 0; // to keep track of Aces as 1 pt or 11 pts

let hiddenCard;

let hitMe = true; // to stop hit if cards are > 21

let dealCard = true; // to stop dealing after start of game

let playerBust = true; // stop stand button when player busts

window.onload = function() {
  shuffleCards();
}


const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const newGame = document.getElementById("deal-button")
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const buildDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank.length == 3 ? 11 : rank.length > 2 ? 10 : rank === 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    buildDeck(rank, suit);
  }
}

// Shuffle deck

function shuffleCards() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);    // math.random gives a number between 0-1 to * by deck length (52). Math.floor gets rid of decimal
    let temp = deck[i]; // to swap
    deck[i] = deck [j];
    deck[j] = temp;
  }

  console.log(deck);
}

document.getElementById("deal-button").addEventListener("click", startGame); 

function startGame() {
  if (!dealCard) {
    return;
  }
  hiddenCard = deck.pop(); //remove a card from end of the array
  dealerPoint += getValue(hiddenCard);
  dealerAceSum += checkAce(hiddenCard);
  document.getElementById("hiddenCard").src = "extras/purple_back.jpg";
  for (let i = 0; i < 1; i++) {
    let cardImg = document.createElement("img");
      let card = deck.pop();
      cardImg.src = 'images/'+ card["rank"]+'_of_'+ card["suit"]+'.png';
      dealerPoint += getValue(card);
      dealerAceSum += checkAce(card);
      document.getElementById("dealer-hand").append(cardImg);
  }


for (let i = 0; i < 2; i++) {
  let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = 'images/'+ card["rank"]+'_of_'+ card["suit"]+'.png';
    playerPoint += getValue(card);
    playerAceSum += checkAce(card);
    document.getElementById("player-hand").append(cardImg);
    document.getElementById("player-points").innerText = playerPoint;
}

console.log(playerPoint);
dealCard = false
}

document.getElementById("hit-button").addEventListener("click", hit); 

function hit() {
  if (!hitMe) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = 'images/'+ card["rank"]+'_of_'+ card["suit"]+'.png';
  playerPoint += getValue(card);
  playerAceSum += checkAce(card);
  document.getElementById("player-hand").append(cardImg);
  document.getElementById("player-points").innerText = playerPoint;

  setTimeout(busted, 400);

  function busted() {
    if (playerPoint > 21) {
      hitMe = false;
      alert("Bust! Game will start over")
      location.reload()
    }
  }
}

document.getElementById("stand-button").addEventListener("click", stay);

function stay () {
  if (!playerBust) {
    return;
  }
  if (function() {
    hit(playerPoint) + startGame(playerPoint)
  }
    
    > 21) {
    playerBust = false;
  }

  while (dealerPoint < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = 'images/'+ card["rank"]+'_of_'+ card["suit"]+'.png';
    dealerPoint += getValue(card);
    dealerAceSum += checkAce(card);
    document.getElementById("dealer-hand").append(cardImg);
  }
  console.log(dealerPoint);
  dealerPoint = reduceAce(dealerPoint, dealerAceSum);
  playerPoint = reduceAce(playerPoint, playerAceSum);

  hitMe = false;
  document.getElementById("hiddenCard").src = 'images/'+ hiddenCard["rank"]+'_of_'+ hiddenCard["suit"]+'.png';
  
  let message = ""
  if (playerPoint > 21) {
    messsage = "You lose";
  }
  else if (dealerPoint > 21) {
    message = "You win";
  }
  else if (playerPoint == dealerPoint) {
    message = "Tie";
  }
  else if (playerPoint > dealerPoint) {
    message = "You win";
  }
  else if (playerPoint < dealerPoint) {
    message = "You lose";
  }
  
  document.getElementById("dealer-points").innerText = dealerPoint;
  document.getElementById("messages").innerText = message;

  setTimeout(endGame, 400);

  function endGame() {
      alert("Click to play again!")
      location.reload()
    }
  
}

function getValue(card) {
  return card["pointValue"];
}

function checkAce(card) {
  if (card["rank"] == "ace") {
      return 1;
  }
  return 0;
}

// if sum of points is greater than 21, Ace amount will change to 1 point

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10;
      playerAceCount -= 1;
  }
  return playerSum;
}
