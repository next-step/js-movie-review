export const errorDialog = {
  render({ message, details = "" }) {
    const element = document.createElement("div");
    element.classList.add("error-dialog");
    element.insertAdjacentHTML(
      "afterbegin",
      /*html*/ `
            <div class="error-dialog-body">
                <h1>${message}</h1>
                <p>${details}</p>
                <button class="retry-button">확인</button>
          </div>
            `
    );

    element.querySelector(".retry-button").addEventListener("click", () => {
      this.close(element);
    });

    return element;
  },

  load(error) {
    const main = document.querySelector("main");
    const errorModal = this.render(error);
    main.appendChild(errorModal);
  },

  close(element) {
    element.remove();
  },
};
