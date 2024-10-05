export const bodyElement = document.body;

// Container for the game
export const divElementBody = document.createElement("div");
divElementBody.setAttribute("id", "game-container");
bodyElement.appendChild(divElementBody);

// Draw Card Button
export const drawButtonElementCard = document.createElement("button");
drawButtonElementCard.textContent = "Desk";
drawButtonElementCard.setAttribute("id", "draw-button");
divElementBody.appendChild(drawButtonElementCard);

// Restart Button
export const restartButtonElementCard = document.createElement("button");
restartButtonElementCard.textContent = "Restart Game";
restartButtonElementCard.setAttribute("id", "restart-button");
restartButtonElementCard.style.display = "none";
divElementBody.appendChild(restartButtonElementCard);

// Div to display cards
export const divElementCard = document.createElement("div");
divElementCard.setAttribute("id", "card-display");
divElementBody.appendChild(divElementCard);

// Constant cards values
export const MAX_NUM_BOMB_CARDS = 4;
export const MAX_NUM_DEFUSE_CARDS = 6;
export const MAX_NUM_SKIPTURN_CARDS = 10;
export const MAX_NUM_NOPE_CARDS = 5;
export const MAX_NUM_POINTS_CARDS = 35;
