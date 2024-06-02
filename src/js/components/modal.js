/**
 *  메세지를 담을 공간이 있어야한다.
 *  모달을 띄우거나, 사라지게 해야된다.(toggle)
 *
 *
 */

export class Modal {
    #visibility = false;
    #content = '';
    #modalContainer = document.createElement('div');

    toggle() {
        this.#visibility = !this.#visibility;

        console.log('this.#visibility', this.#visibility);
        this.#modalContainer.style.display = this.#visibility ? 'block' : 'none';
    }

    set content(message) {
        this.#content = message;
    }

    get rendered() {
        this.#modalContainer.classList.add('modal');
        this.toggle();
        this.#modalContainer.innerHTML = `
      <div class="modal-content">
        ${this.#content}
        <button class="close-button">close</button>
      </div>
    `;

        this.#modalContainer.querySelector('.close-button').addEventListener('click', () => {
            console.log('test');
            this.toggle();
        });

        return this.#modalContainer;
    }
}
