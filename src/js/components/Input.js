export function Input({ id, type, placeholder, value, onChange }) {
    const inputElement = document.createElement('input');
    inputElement.id = id;
    inputElement.type = type;
    inputElement.placeholder = placeholder;
    inputElement.value = value;

    inputElement.addEventListener('input', onChange);
}
