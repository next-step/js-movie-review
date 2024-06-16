
function Input({ id, type, placeholder, value, onChange, onKeyDown }) {

    const inputElement = document.createElement('input');
    inputElement.id = id;
    inputElement.type = type;
    inputElement.placeholder = placeholder;
    inputElement.value = value || '';

    onChange && inputElement.addEventListener('input', onChange);

    onKeyDown && inputElement.addEventListener('keydown', onKeyDown);

    return inputElement;
}

export default Input;
