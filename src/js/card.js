export class Card {
  constructor(type, value = null, icon, description, color) {
    this.type = type;
    this.value = value;

    switch (this.type) {
      case 'Bomb':
        this.icon = "src/images/bomb.png";
        this.description = "If you draw one and don't have a Defuse card, you lose.";
        this.color = "black";
        break;
      case 'Defuse':
        this.icon = "src/images/defuse.png";
        this.description = "You can keep all the ones you draw in your hand.";
        this.color = "green";
        break;
      case 'Skip Turn':
        this.icon = "src/images/skip_turn.png";
        this.description = "They allow you to avoid drawing a card.";
        this.color = "blue";
        break;
      case 'Nope':
        this.icon = "src/images/nope.png";
        this.description = "If an opponent wants to skip a turn, you can cancel it using this card, both are discarded.";
        this.color = "red";
        break;
      case 'Points':
        this.icon = "src/images/point.png";
        this.description = "When generated, they can have a random value between 1 and 10. If the game ends and more than one player is alive, the one with the most points wins.";
        this.color = "white";
        break;
    }
  }

  // Method to get card's
  getCardDisplay() {
    if (this.type === "Points") {
      return `${this.value} Points`;
    }
    return `${this.type} Card`;
  }
}
