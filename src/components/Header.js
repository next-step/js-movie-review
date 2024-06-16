import Input from './Input';
import Button from './Button';

function Header({ logoSrc, logoAlt, onSearch }) {
    const headerElement = document.createElement('header');

    headerElement.innerHTML = `
        <h1><img src="${logoSrc}" alt="${logoAlt}" loading="lazy"></h1>
        <div class="search-box"></div>
    `;

    const searchInput = Input({
        id: 'search-input',
        type: 'text',
        placeholder: '검색',
        onKeyDown: async (event) => {
            if (event.code === 'Enter') {
                await onSearch(event.target.value);
            }
        }
    });

    const searchButton = Button({
        classNames: ['search-button'],
        name: '검색',
        type: 'button',
        onClick: async () => {
            const inputValue = document.getElementById('search-input').value;
            await onSearch(inputValue);
        }
    });

    const searchBox = headerElement.querySelector('.search-box');

    searchBox.addEventListener('mouseenter', () => {
        const width = document.querySelector('body').getBoundingClientRect().width;

        if (width <= 390) {
            const input = document.getElementById('search-input');
            const logo = document.querySelector('header h1');

            searchBox.classList.add('search-box-toggle');
            input.classList.add('input-toggle');
            logo.classList.add('logo-toggle');
        }
    });

    searchBox.addEventListener('mouseleave', () => {
        const width = document.querySelector('body').getBoundingClientRect().width;

        if (width <= 390) {
            const input = document.getElementById('search-input');
            const logo = document.querySelector('header h1');

            searchBox.classList.remove('search-box-toggle');
            input.classList.remove('input-toggle');
            logo.classList.remove('logo-toggle');
        }
    });

    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchButton);

    return headerElement;
}

export default Header;
