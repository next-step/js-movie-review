import "./styles/reset.css";
import "./styles/common.css";

import { getMovieData } from "./api/getMovieData";

import MovieItem from "./components/MovieItem";
import ReqeustError from "./components/RequestError";

const $target = document.querySelector(".item-list");

async function requestMovieData() {
  const response = await getMovieData();

  if (response.success) {
    console.log(response);
  } else {
    ReqeustError({ $target }, response.error);
  }
}

requestMovieData();

// MovieItem({ $target });
