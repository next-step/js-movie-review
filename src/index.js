import "./styles/reset.css";
import "./styles/common.css";

import MovieItem from "./components/MovieItem";
import { getMovieData } from "./api/getMovieData";

async function requestMovieData() {
  const a = await getMovieData();
  console.log(a);
}

requestMovieData();

const $target = document.querySelector(".item-list");

MovieItem({ $target });
