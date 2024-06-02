class Error {
  #text;

  constructor(errorMessage) {
    this.#text = errorMessage;
    // this.#resetButton = new Button("새로고침", this.#reset);
  }

  element() {
    const h2 = document.createElement("h2");
    h2.textContent = this.#text;

    return h2;
  }
}

export default Error;
