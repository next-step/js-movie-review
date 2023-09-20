export default class MoreButton {
	#element;

	constructor(rootElement, onClick) {
		this.#element = document.createElement('button');
		this.#element.classList.add('btn');
		this.#element.classList.add('primary');
		this.#element.classList.add('full-width');
		this.#element.classList.add('more-button');
		this.#element.classList.add('hide');
		this.#element.innerText = '더 보기';
		this.#element.setAttribute('type', 'button');

		this.#element.addEventListener('click', onClick);

		rootElement.appendChild(this.#element);
	}

	hideButton() {
		this.#element.classList.add('hide');
	}

	showButton() {
		this.#element.classList.remove('hide');
	}
}
