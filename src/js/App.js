import "../css/index.css";

import { Main } from "./components";
import { Header } from "./layout";

const App = async () => {
  const $header = Header();
  const $main = await Main();

  document.body.appendChild($header);
  document.body.appendChild($main);
};

export default App;
