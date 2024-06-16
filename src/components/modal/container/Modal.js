export class Modal {
    #visibility = false;
    #modalContainer = document.createElement('div');
    #parentElement = null;
    #modalElement = null;
    #opened = false;

    constructor(parmentElement, modalElement) {
        this.#parentElement = parmentElement;
        this.#modalElement = modalElement;

        this.render();
    }

    toggle() {
        this.#visibility = !this.#visibility;
        this.#modalContainer.style.display = this.#visibility ? 'block' : 'none';

        this.#opened = !this.#opened;

        if (!this.#visibility) {
            this.#parentElement.removeEventListener('keydown', this.handleKeyDown);
            this.#modalContainer.querySelector('.close-button').removeEventListener('click', this.handleClick);
            this.#modalContainer.removeEventListener('click', this.handleBackgroundClick);
        }
    }

    handleClick = () => {
        this.toggle();
    };

    handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            this.toggle();
        }
    };

    handleBackgroundClick = () => {
        this.toggle();
    };

    render() {
        this.#modalContainer.classList.add('modal-background');
        const modalElement = document.createElement('div');
        modalElement.classList.add('modal');

        this.toggle();

        this.#modalContainer.addEventListener('click', this.handleBackgroundClick);

        modalElement.innerHTML = this.#modalElement;
        modalElement.querySelector('.close-button').addEventListener('click', this.handleClick);
        this.#parentElement.addEventListener('keydown', this.handleKeyDown);
        this.#parentElement.appendChild(this.#modalContainer);
        this.#modalContainer.appendChild(modalElement);
    }
}
