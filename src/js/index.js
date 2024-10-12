import {
  BODY_ELEMENT,
  NUM_BOMB_CARDS,
  NUM_DEFUSE_CARDS,
  NUM_NOPE_CARDS,
  NUM_POINTS_CARDS,
  NUM_SKIPTURN_CARDS,
  MAX_RANDOM_POINTS,
  MIN_RANDOM_POINTS
} from './constants.js';
import { Card } from './card.js';

// Container for the screen
const divScreenElementBody = document.createElement("div");
divScreenElementBody.setAttribute("id", "screen-container");
BODY_ELEMENT.appendChild(divScreenElementBody);

// Container for the h1
const divH1ElementBody = document.createElement("div");
divH1ElementBody.setAttribute("id", "divh1-container");
divScreenElementBody.appendChild(divH1ElementBody);

// Container for the game title
const h1ElementBody = document.createElement("h1");
h1ElementBody.setAttribute("id", "game-title");
h1ElementBody.textContent = "Exploding Cards";
divH1ElementBody.appendChild(h1ElementBody);

// Container for the game
const divElementBody = document.createElement("div");
divElementBody.setAttribute("id", "game-container");
divScreenElementBody.appendChild(divElementBody);

// Container for the buttons
const divElementButtons = document.createElement("div");
divElementButtons.setAttribute("id", "buttons-container");
divElementBody.appendChild(divElementButtons);

// Container for the cards
const divElementCards = document.createElement("div");
divElementCards.setAttribute("id", "cards-container");
divElementBody.appendChild(divElementCards);

// Draw Card Button
const drawButtonElementCard = document.createElement("button");
drawButtonElementCard.textContent = "Draw Card";
drawButtonElementCard.setAttribute("id", "draw-button");
drawButtonElementCard.classList.add("button-78");
divElementButtons.appendChild(drawButtonElementCard);

// Restart Button
const restartButtonElementCard = document.createElement("button");
restartButtonElementCard.textContent = "Restart Game";
restartButtonElementCard.setAttribute("id", "restart-button");
restartButtonElementCard.classList.add("button-78");
restartButtonElementCard.style.display = "none";
divElementButtons.appendChild(restartButtonElementCard);

// Div to display cards
const divElementCard = document.createElement("div");
divElementCard.setAttribute("id", "card-display");
divElementCards.appendChild(divElementCard);

// Constants for audio files
const shuffleSound = new Audio('src/sounds/shuffleCards.mp3');
const drawCardSound = new Audio('src/sounds/drawCard.mp3');

// Generate deck
let deck = [];

function generateDeck() {
  deck = [];

  // Create Bomb (4)
  for (let i = 0; i < NUM_BOMB_CARDS; i++) {
    deck.push(new Card("Bomb"));
  }

  // Create Defuse (6)
  for (let i = 0; i < NUM_DEFUSE_CARDS; i++) {
    deck.push(new Card("Defuse"));
  }

  // Create Skip Turn (10)
  for (let i = 0; i < NUM_SKIPTURN_CARDS; i++) {
    deck.push(new Card("Skip Turn"));
  }

  // Create Nope (5)
  for (let i = 0; i < NUM_NOPE_CARDS; i++) {
    deck.push(new Card("Nope"));
  }

  // Create Points (35)
  for (let i = 0; i < NUM_POINTS_CARDS; i++) {
    let pointValue = Math.trunc(Math.random() * (MAX_RANDOM_POINTS - MIN_RANDOM_POINTS + 1)) + MIN_RANDOM_POINTS;
    deck.push(new Card("Points", pointValue));
  }

  divElementCards.classList.add("yellow");
  divElementCard.innerHTML = `<p class="centerText">Deck is ready! Press 'Draw Card' to start.</p>`;
}

// Function to randomize deck
function randomize(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.trunc(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Variable to keep track of the current card color
let currentCardColor = '';

// Function to draw cards from the deck
function drawCard() {
  if (deck.length > 0) {
    const card = deck.pop();

    console.log("Card draw:", card);

    divElementCards.classList.remove("yellow");

    if (currentCardColor) {
      divElementCards.classList.remove(currentCardColor);
    }

    divElementCards.classList.add(card.color);
    currentCardColor = card.color;

    // Update the card display with the new card information
    divElementCard.innerHTML = `<div class="card">
                                  <div class="card-info">
                                    <img class="mini-ico" src="${card.icon}">
                                    <div class="type-desc">
                                      <div class="card-text">
                                        <span>${card.type}</span>
                                        <span>${card.value || ''}</span>
                                      </div>
                                      <p class="card-desc">${card.description}</p>
                                    </div>
                                  </div>
                                  <div class="card-body">
                                    <img src="${card.icon}">
                                  </div>
                                  <div class="card-info-rever">
                                    <img class="mini-ico" src="${card.icon}">
                                    <div class="type-desc-rever">
                                      <p class="card-text-rever">${card.type}   ${card.value || ''}</p>
                                      <p class="card-desc-rever">${card.description}</p>
                                    </div>
                                  </div>
                                </div>`;

    console.log(deck);

    // Check if the deck is empty to end the game
    if (deck.length === 0) {
      drawButtonElementCard.style.display = "none";
      restartButtonElementCard.style.display = "block";

      divElementCards.classList.add("yellow");
      divElementCard.innerHTML = `<p class="centerText">Finish!!!!</p>`
    }
  }
}

// Restart the game
function restartGame() {
  generateDeck();
  randomize(deck);
  divElementCard.innerHTML = `<p class="centerText">Deck is ready! Press 'Draw Card' to start.</p>`;
  drawButtonElementCard.style.display = "block";
  restartButtonElementCard.style.display = "none";
}

// Function to play sound
function playSound(sound) {
  sound.play();
}

// Initial Setup
generateDeck();
randomize(deck);
console.log(deck);

// Add event listeners for the buttons
drawButtonElementCard.addEventListener("click", () => {
  drawCard();
  playSound(drawCardSound);
});

restartButtonElementCard.addEventListener("click", () => {
  restartGame();
  playSound(shuffleSound);
});
