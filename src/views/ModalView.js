export class ModalView {
  constructor() {
    this.setup();
  }

  setup() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.innerHTML = `
      <div class="modal-content-wrapper">
        <span class="close">&times;</span>
        <p class="modal-message"></p>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.modalMessage = this.modal.querySelector(".modal-message");
    this.closeButton = this.modal.querySelector(".close");
    this.closeButton.addEventListener("click", () => {
      this.hide();
    });

    this.modal.style.display = "none";
  }

  show(message) {
    this.modalMessage.textContent = message;
    this.modal.style.display = "block";
  }

  hide() {
    this.modal.style.display = "none";
  }
}
