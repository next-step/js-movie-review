import { MovieItem } from "./MovieItem.js";

import { MovieGenre } from "./MovieGenre.js";

import { $createElement } from "../utils/dom";
import { LAST_PAGE, MovieStore, PAGE_ITEM } from "../store";

import SkeletonUI from "../shared/SkeletonUI";

export const Main = async () => {
  const $moreButton = $createElement("button");
  $moreButton.id = "moreButton";
  $moreButton.classList.add("btn", "primary");
  $moreButton.textContent = "더보기";

  const mainFragment = new DocumentFragment();

  const $mainElement = $createElement("main");
  const movieData = new MovieStore();
  const $itemViewList = $createElement("ul");
  $itemViewList.classList.add("item-list");

  const skeletonCards = new SkeletonUI(PAGE_ITEM);

  mainFragment.appendChild(MovieGenre(movieData.movieGenreTitle));

  const updateMovieList = () => {
    const fragment = new DocumentFragment();

    movieData.movieList.forEach(list => {
      const movieItemElement = MovieItem(list);
      fragment.appendChild(movieItemElement);
    });

    $itemViewList.appendChild(fragment);
  };

  const getMovieDataList = async () => {
    try {
      if (movieData.currentPage >= LAST_PAGE) {
        $moreButton.style.display = "none";
      }

      $moreButton.setAttribute("disabled", "true");
      skeletonCards.showSkeleton();

      await movieData.fetchMovieData();
      skeletonCards.hideSkeleton();

      updateMovieList();

      $moreButton.removeAttribute("disabled");
    } catch (error) {
      alert(error.message || "통신 오류가 발생했습니다.");
    } finally {
      skeletonCards.hideSkeleton();
    }
  };

  $mainElement.appendChild($itemViewList);
  $mainElement.appendChild(skeletonCards.$ul);
  mainFragment.appendChild($mainElement);

  $mainElement.appendChild($moreButton);

  $moreButton.addEventListener("click", getMovieDataList);

  await getMovieDataList();

  return mainFragment;
};
