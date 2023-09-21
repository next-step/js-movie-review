import "../css/index.css";

import { Main } from "./components";
import { Header } from "./layout";

import { $createElement } from "./utils/dom";

const App = async () => {
  const $container = $createElement("div");
  $container.id = "app";
  const $mainContainer = $createElement("section");
  $mainContainer.classList.add("item-view");

  const Fragment = new DocumentFragment();

  const $header = Header();
  const $main = await Main();

  $mainContainer.append($main);

  Fragment.appendChild($header);
  Fragment.appendChild($mainContainer);

  $container.appendChild(Fragment);

  document.body.append($container);
};

export default App;
