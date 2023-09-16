import "./styles/reset.css";
import "./styles/common.css";

import { getMovieData } from "./api/getMovieData";

import MovieItem from "./components/MovieItem";
import ReqeustError from "./components/RequestError";

import LOGO from "./assets/images/logo.png";

let currentPage = 1;
let loadResult = 0;
let totalResult = 0;

const $section = document.querySelector("section");
const $target = document.querySelector(".item-list");
const $moreButton = document.querySelector("button.btn.primary");
const $logoImage = document.querySelector("header > h1 > img");

$logoImage.src = LOGO;
$logoImage.style.width = "132px";

function disabledMoreLoadButton(movieDataCount) {
  loadResult = currentPage * movieDataCount;

  if (loadResult === totalResult) {
    $moreButton.innerHTML = "더이상 조회할 영화가 없습니다.";
    $moreButton.disabled = true;
  }
}

function handleSuccessResponse(response) {
  const movieData = response.data.results;
  totalResult = response.data.total_results;

  movieData.forEach((movie) => {
    MovieItem({ $target }, movie);
  });

  disabledMoreLoadButton(movieData.length);
}

function handleErrorResponse(error) {
  ReqeustError({ $section }, error);

  const $retryButton = document.querySelector(".error-container > button");

  $retryButton.addEventListener("click", async () => {
    await requestMovieData(1);
  });
}

async function requestMovieData(page = 1) {
  const response = await getMovieData(page);

  if (response.success) {
    handleSuccessResponse(response);
  } else {
    handleErrorResponse(response.error);
  }
}

$moreButton.addEventListener("click", () => {
  currentPage += 1;
  requestMovieData(currentPage);
});

requestMovieData();
