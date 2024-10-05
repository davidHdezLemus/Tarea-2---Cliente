import {
  drawButtonElementCard,
  restartButtonElementCard,
  divElementCard,
  MAX_NUM_BOMB_CARDS,
  MAX_NUM_DEFUSE_CARDS,
  MAX_NUM_NOPE_CARDS,
  MAX_NUM_POINTS_CARDS,
  MAX_NUM_SKIPTURN_CARDS
} from './constants.js';
import { Card } from './class.js';

// Generate deck
let deck = [];

function generateDeck() {
  deck = [];

  // Create Bomb (4)
  for (let i = 0; i < MAX_NUM_BOMB_CARDS; i++) {
    deck.push(new Card("Bomb"));
  }

  // Create Defuse (6)
  for (let i = 0; i < MAX_NUM_DEFUSE_CARDS; i++) {
    deck.push(new Card("Defuse"));
  }

  // Create Skip Turn (10)
  for (let i = 0; i < MAX_NUM_SKIPTURN_CARDS; i++) {
    deck.push(new Card("Skip Turn"));
  }

  // Create Nope (5)
  for (let i = 0; i < MAX_NUM_NOPE_CARDS; i++) {
    deck.push(new Card("Nope"));
  }

  // Create Points
  for (let i = 0; i < MAX_NUM_POINTS_CARDS; i++) {
    let pointValue = Math.trunc(Math.random() * 10) + 1;
    deck.push(new Card("Points", pointValue));
  }
}

// Function to randomize deck
function randomize(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.trunc(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to draw cards from the deck
function drawCard() {
  if (deck.length > 0) {
    const card = deck.pop();

    console.log("Card drawn:", card);

    divElementCard.innerHTML = `<br>${card.type}<br><br>${card.value || ''}`;
    if (deck.length === 0) {
      drawButtonElementCard.style.display = "none";
      restartButtonElementCard.style.display = "block";
    }
  }
}

// Restart the game
function restartGame() {
  generateDeck();
  randomize(deck);
  divElementCard.textContent = "Deck is ready! Press 'Draw Card' to start.";
  drawButtonElementCard.style.display = "block";
  restartButtonElementCard.style.display = "none";
}

// Initial Setup
generateDeck();
randomize(deck);
console.log(deck);

drawButtonElementCard.addEventListener("click", drawCard);
restartButtonElementCard.addEventListener("click", restartGame);
