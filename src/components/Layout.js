import Button from './Button';
import Logo from './logo';
import SearchBox from './SeachBox';
import Header from './Header';
import Input from './Input';
import Title from './Title';
import LogoImg from '../assets/logo.png';

export function Layout() {
    const fragment = document.createDocumentFragment();

    const headerElement = Header(
        Logo({ src: LogoImg, alt: '로고' }),
        SearchBox({
            input: Input({
                id: 'search-input',
                type: 'text',
                placeholder: '검색',
                value: ''
            }),
            button: Button({
                classNames: ['search-button'],
                name: '검색',
                type: 'text'
            })
        })
    );

    const mainElement = document.createElement('main');
    mainElement.id = 'main';

    const sectionElement = document.createElement('section');
    sectionElement.classList.add('item-view');
    sectionElement.appendChild(Title('지금 인기 있는 영화'));

    const ulElement = document.createElement('ul');
    ulElement.classList.add('item-list');
    sectionElement.appendChild(ulElement);

    sectionElement.appendChild(
        Button({
            classNames: ['btn', 'primary', 'full-width'],
            type: 'button',
            id: 'more-movies',
            name: '더 보기'
        })
    );

    mainElement.append(sectionElement);
    fragment.appendChild(headerElement);
    fragment.appendChild(mainElement);

    return fragment;
}
