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
drawButtonElementCard.style.display = "none"; // Initially hidden
divElementButtons.appendChild(drawButtonElementCard);

// Restart Button
const restartButtonElementCard = document.createElement("button");
restartButtonElementCard.textContent = "Restart Game";
restartButtonElementCard.setAttribute("id", "restart-button");
restartButtonElementCard.classList.add("button-78");
restartButtonElementCard.style.display = "none";
divElementButtons.appendChild(restartButtonElementCard);

// Start Game Button
const startButtonElement = document.createElement("button");
startButtonElement.textContent = "Start Game";
startButtonElement.setAttribute("id", "start-button");
startButtonElement.classList.add("button-78");
divElementButtons.appendChild(startButtonElement);

// Div to display cards
const divElementCard = document.createElement("div");
divElementCard.setAttribute("id", "card-display");
divElementCards.appendChild(divElementCard);

// Constants for audio files
const shuffleSound = new Audio('src/sounds/shuffleCards.mp3');
const drawCardSound = new Audio('src/sounds/drawCard.mp3');
const youLoseSound = new Audio('src/sounds/youLose.mp3');
const backgroundSound = new Audio('src/sounds/background.mp3');

// Set the volume and loop for the background sound
backgroundSound.volume = 0.2;
backgroundSound.loop = true;

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

    // Create card elements individually
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const miniIcon = document.createElement("img");
    miniIcon.classList.add("mini-ico");
    miniIcon.src = card.icon;

    const typeDesc = document.createElement("div");
    typeDesc.classList.add("type-desc");

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const typeSpan = document.createElement("span");
    typeSpan.textContent = card.type;

    const valueSpan = document.createElement("span");
    valueSpan.textContent = card.value || '';

    const cardDesc = document.createElement("p");
    cardDesc.classList.add("card-desc");
    cardDesc.textContent = card.description;

    // Append elements to their respective containers
    cardText.appendChild(typeSpan);
    cardText.appendChild(valueSpan);
    typeDesc.appendChild(cardText);
    typeDesc.appendChild(cardDesc);
    cardInfo.appendChild(miniIcon);
    cardInfo.appendChild(typeDesc);
    cardElement.appendChild(cardInfo);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const bodyImg = document.createElement("img");
    bodyImg.src = card.icon;
    cardBody.appendChild(bodyImg);
    cardElement.appendChild(cardBody);

    const cardInfoRever = document.createElement("div");
    cardInfoRever.classList.add("card-info-rever");

    const miniIconRever = document.createElement("img");
    miniIconRever.classList.add("mini-ico");
    miniIconRever.src = card.icon;

    const typeDescRever = document.createElement("div");
    typeDescRever.classList.add("type-desc-rever");

    const cardTextRever = document.createElement("p");
    cardTextRever.classList.add("card-text-rever");
    cardTextRever.textContent = `${card.type} ${card.value || ''}`;

    const cardDescRever = document.createElement("p");
    cardDescRever.classList.add("card-desc-rever");
    cardDescRever.textContent = card.description;

    // Append elements to their respective containers
    typeDescRever.appendChild(cardTextRever);
    typeDescRever.appendChild(cardDescRever);
    cardInfoRever.appendChild(miniIconRever);
    cardInfoRever.appendChild(typeDescRever);
    cardElement.appendChild(cardInfoRever);

    // Update the card container with the new content
    divElementCard.innerHTML = '';
    divElementCard.appendChild(cardElement);

    console.log(deck);

    // Check if the deck is empty to end the game
    if (deck.length === 0) {
      drawButtonElementCard.style.display = "none";
      restartButtonElementCard.style.display = "block";

      divElementCards.classList.add("yellow");
      divElementCard.innerHTML = `<p class="centerText">Finish!!!!</p>`;
      playSound(youLoseSound);
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

// Add event listeners for the buttons
drawButtonElementCard.addEventListener("click", () => {
  drawCard();
  playSound(drawCardSound);
});

restartButtonElementCard.addEventListener("click", () => {
  restartGame();
  playSound(shuffleSound);
});

// Add event listener for the start button
startButtonElement.addEventListener("click", () => {
  // Start the background music
  playSound(backgroundSound);

  // Hide the start button and show the draw button
  startButtonElement.style.display = "none";
  drawButtonElementCard.style.display = "block";

});

// Initial Setup
generateDeck();
randomize(deck);
console.log(deck);
