import '../styles/reset.css';
import '../styles/common.css';

import { Modal } from './components/modal';

import getSearchedMovies from '../apis/getSearchEdMovies';
import renderTitle from './components/title';
import { Cinema } from './components/cinema';
import Title from './components/title';
import LogoImg from '../assets/logo.png';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Logo } from './components/logo';
import { Header } from './components/header';
import { SearchBox } from './components/seachBox';
import getMovieList from '../apis/getMovieList';

const moreMovies = document.getElementById('more-movies');
const appElement = document.querySelector('.app');

const cinema = new Cinema();

async function renderMovieItems(pages) {
    try {
        // cinema.showSkeleton(true);
        const itemList = await getMovieList(pages);
        console.log('itemList', itemList);
        cinema.showMovies(itemList);
    } catch (error) {
        const modal = new Modal();
        modal.content = error.message;
        document.querySelector('body').appendChild(modal.rendered);
        moreMovies.style.display = 'none';
    } finally {
        // cinema.showSkeleton(false);
    }
}

const handleSeacrhClick = async () => {
    try {
        if (searchInput.value) {
            const res = await getSearchedMovies(searchInput.value);
            const newMoveList = res.results.map((item) => new Movie(item));
            cinema.resetMovies();
            renderTitle(`"${searchInput.value}" 검색 결과`);
            cinema.showMovies(newMoveList);
        }
    } catch (error) {
        const modal = new Modal();
        modal.content = '';
        document.querySelector('body').appendChild(modal.rendered);
        moreMovies.style.display = 'none';
    }
};

addEventListener('DOMContentLoaded', () => {
    let value = '';

    const onChange = (event) => {
        event.preventDefault();
        value = event.target.value;
        console.log('Current search value:', value);
    };

    const itemVlews = document.querySelector('.item-view');
    const headerElement = Header(
        Logo({ src: LogoImg, alt: '로고' }),
        SearchBox({
            input: Input({
                id: 'search-input',
                type: 'text',
                placeholder: '검색',
                value: value,
                onChange: onChange
            }),
            button: Button({
                classNames: ['search-button'],
                name: '검색',
                type: 'text'
            })
        })
    );
    itemVlews.appendChild(Title('지금 인기 있는 영화'));
    itemVlews.appendChild(
        Button({
            classNames: ['btn', 'primary', 'full-width'],
            type: 'button',
            id: 'more-movies',
            name: '더 보기'
        })
    );
    document.body.insertBefore(headerElement, document.body.firstChild);
    renderMovieItems(cinema.page);

    // searchButton.addEventListener('click', async () => {
    //     try {
    //         if (searchInput.value) {
    //             const res = await getSearchedMovies(searchInput.value);
    //             const newMoveList = res.results.map((item) => new Movie(item));
    //             cinema.resetMovies();
    //             renderTitle(`"${searchInput.value}" 검색 결과`);
    //             cinema.showMovies(newMoveList);
    //         }
    //     } catch (error) {
    //         const modal = new Modal();
    //         modal.content = '';
    //         document.querySelector('body').appendChild(modal.rendered);
    //         moreMovies.style.display = 'none';
    //     }
    // });

    // searchInput.addEventListener('keydown', async ({ key }) => {
    //     if (key === 'Enter') {
    //         try {
    //             if (searchInput.value) {
    //                 const res = await getSearchedMovies(searchInput.value);
    //                 const newMoveList = res.results.map((item) => new Movie(item));
    //                 cinema.resetMovies();
    //                 renderTitle(`"${searchInput.value}" 검색 결과`);
    //                 cinema.showMovies(newMoveList);
    //             }
    //         } catch (error) {
    //             const modal = new Modal();
    //             modal.content = '';
    //             document.querySelector('body').appendChild(modal.rendered);
    //             moreMovies.style.display = 'none';
    //         }
    //     }
    // });
});

moreMovies.addEventListener('click', () => {
    cinema.page += 1;
    renderMovieItems(cinema.page);
});
