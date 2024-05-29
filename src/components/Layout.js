import Header from './Header';
import Content from './Content';

const Layout = () => {
  const $el = new DocumentFragment();

  $el.appendChild(Header());
  $el.appendChild(Content());

  return $el;
};

export default Layout;
