import { $ } from "../../utils/querySelector";

class Button {
  #callback;

  constructor(element, callback) {
    this.element = element;
    this.#callback = callback;
    this.init();
  }

  init() {
    this.element.addEventListener("click", () => {
      this.#callback();
    });
  }

  render(target) {
    $(target).appendChild(this.element);
  }
}

export default Button;
