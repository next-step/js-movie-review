import Input from './Input';
import Button from './Button';
import { handleSearch } from '../services/handleSeach';

function Header({ logoSrc, logoAlt, onSearch }) {
    const headerElement = document.createElement('header');

    headerElement.innerHTML = `
        <h1><img src="${logoSrc}" alt="${logoAlt}" loading="lazy"></h1>
        <div class="search-box"></div>
    `;

    let page = 1;

    const searchInput = Input({
        id: 'search-input',
        type: 'text',
        placeholder: '검색',
        onKeyDown: async (event) => {
            if (event.code === 'Enter') {
                document.getElementById('more-movies').remove();
                const sectionContainer = document.querySelector('.item-view');

                sectionContainer.appendChild(
                    Button({
                        classNames: ['btn', 'primary', 'full-width'],
                        type: 'button',
                        id: 'more-movies',
                        name: '더 보기',
                        onClick: () => {
                            page += 1;
                            handleSearch(searchInput.value, page);
                        }
                    })
                );

                await onSearch(event.target.value, page);
            }
        }
    });

    const searchButton = Button({
        classNames: ['search-button'],
        name: '검색',
        type: 'button',
        onClick: async () => {
            document.getElementById('more-movies').remove();
            const sectionContainer = document.querySelector('.item-view');

            sectionContainer.appendChild(
                Button({
                    classNames: ['btn', 'primary', 'full-width'],
                    type: 'button',
                    id: 'more-movies',
                    name: '더 보기',
                    onClick: () => {
                        page += 1;
                        handleSearch(searchInput.value, page);
                    }
                })
            );

            const inputValue = document.getElementById('search-input').value;
            await onSearch(inputValue, page);
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
