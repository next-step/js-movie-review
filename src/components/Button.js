
function Button({ classNames = [], type = 'button', id = '', name = '', onClick }) {

    const buttonElement = document.createElement('button');

    buttonElement.classList.add(...classNames);
    buttonElement.type = type;
    buttonElement.id = id;
    buttonElement.name = name;
    buttonElement.innerText = name;

    onClick && buttonElement.addEventListener('click', onClick);

    return buttonElement;
}

export default Button;
