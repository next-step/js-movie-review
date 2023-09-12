import { MovieList } from "./MovieList";
import { MovieItem } from "./MovieItem.js";

import { MovieStore } from "../store";
import { SkeletonUI } from "../shared/SkeletonUI";
import { $createElement } from "../utils/dom";

import { LAST_PAGE, PAGE_ITEM } from "../../../utils/constants";

export const Main = async () => {
  const $mainElement = $createElement("main");
  const movieData = new MovieStore();

  $mainElement.innerHTML = `
      ${MovieList(movieData.movieListTitle)}
  `;

  const $movieItemListContainer = $mainElement.querySelector(".item-list");
  const $moreButton = $mainElement.querySelector("#moreButton");

  const updateMovieList = () => {
    movieData.movieList.forEach(list => {
      const movieItemElement = MovieItem(list);
      $movieItemListContainer.appendChild(movieItemElement);
    });
  };

  const hideSkeleton = () => {
    const $skeletonItem = document.querySelectorAll(".skeleton-container");
    $skeletonItem.forEach(element => {
      element.style.display = "none";
    });
  };

  const showSkeleton = isLoading => {
    const $skeletonUI = SkeletonUI(PAGE_ITEM);
    $movieItemListContainer.innerHTML += $skeletonUI;

    if (!isLoading) {
      setTimeout(() => {
        hideSkeleton();
        updateMovieList();
      }, 1000);
    }
  };

  const getMovieDataList = async () => {
    $moreButton.setAttribute("disabled", "true");

    try {
      if (movieData.currentPage > LAST_PAGE) {
        $moreButton.style.display = "none";

        return;
      }

      showSkeleton(false);
      await movieData.fetchPopularMovieData(showSkeleton);

      $moreButton.removeAttribute("disabled");
    } catch (error) {
      showSkeleton(true);
      console.error("error::", error);
    }
  };

  $moreButton.addEventListener("click", getMovieDataList);

  await getMovieDataList();

  return $mainElement;
};
