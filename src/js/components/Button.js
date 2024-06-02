export function Button({ classNames = [], type = 'text', id = '', name = '', onClick, onKeyDown }) {
    const buttonElement = document.createElement('button');

    buttonElement.classList.add(...classNames);
    buttonElement.type = type;
    buttonElement.id = id;
    buttonElement.name = name;
    buttonElement.innerText = name;

    onClick && buttonElement.addEventListener('click', onClick);
    onKeyDown && buttonElement.addEventListener('keydown', onKeyDown);
    return buttonElement;
}
