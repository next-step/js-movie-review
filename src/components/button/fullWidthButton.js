class FullWidthButton {
  #text;

  constructor(text) {
    this.#text = text;
    this.element = this.element();
  }

  element() {
    const button = document.createElement("button");
    button.classList.add("btn", "primary", "full-width");
    button.textContent = this.#text;
    return button;
  }
}

export default FullWidthButton;
