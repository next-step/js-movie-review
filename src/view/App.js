import Header from '../components/Header';
import MainContent from '../components/MainContent';
import handleMovie from '../services/handleMovie';
import { handleSearch } from '../services/handleSeach';
import Logo from '../assets/logo.png';

const INIT_PAGE = 1;

function App() {
    const app = document.getElementById('app');

    const headerElement = Header({
        logoSrc: Logo,
        logoAlt: 'MovieList 로고',
        onSearch: handleSearch
    });

    const mainElement = MainContent(INIT_PAGE);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(headerElement);
    fragment.appendChild(mainElement);
    app.appendChild(fragment);

    handleMovie(INIT_PAGE);
    return app;
}

export default App;
