import { $ } from "../utils/querySelector";
import Header from "./header";
import MovieList from "./movieList";

const layout = () => {
  const body = $("body");

  const header = new Header().element;
  const main = document.createElement("main");
  const movieList = new MovieList().element;

  main.appendChild(movieList);
  const appDiv = document.createElement("div");

  appDiv.id = "app";

  appDiv.appendChild(header);

  appDiv.appendChild(main);
  body.appendChild(appDiv);
};

export default layout;
