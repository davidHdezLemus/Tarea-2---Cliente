export class Card {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }

  // Method to get card's
  getCardDisplay() {
    if (this.type === "Points") {
      return `${this.value} Points`;
    }
    return `${this.type} Card`;
  }
}
