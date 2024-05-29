import Logo from '../assets/logo.png';

const Header = () => {
  const $el = document.createElement('header');

  $el.insertAdjacentHTML(
    `afterbegin`,
    `
      <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
  `
  );

  return $el;
};

export default Header;
