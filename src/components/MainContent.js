import handleMovie from '../services/handleMovie';
import Button from './Button';

function MainContent(initialPage) {
    let page = initialPage;
    const mainElement = document.createElement('main');
    mainElement.id = 'main';

    mainElement.innerHTML = `
        <section class="item-view">
            <h2>지금 인기 있는 영화</h2>
            <ul class="item-list"></ul>
        </section>
    `;

    const sectionElement = mainElement.querySelector('.item-view');
    sectionElement.appendChild(
        Button({
            classNames: ['btn', 'primary', 'full-width'],
            type: 'button',
            id: 'more-movies',
            name: '더 보기',
            onClick: () => {
                page += 1;
                handleMovie(page);
            }
        })
    );

    return mainElement;
}

export default MainContent;
