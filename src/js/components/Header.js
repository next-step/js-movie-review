export function Header(logo, searchBox) {
    const headerElement = document.createElement('header');
    headerElement.classList.add('header');

    headerElement.appendChild(logo);
    headerElement.appendChild(searchBox);

    return headerElement;
}
